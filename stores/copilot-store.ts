import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import {
  clearCopilotMessages,
  getCopilotMessages,
  sendCopilotMessage,
  type TCopilotMessage,
} from "@/api/copilot";
import { constructErrorMessage } from "@/api/functions";

type TStoreState = {
  messages: TCopilotMessage[];
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  hasFetched: boolean;
};

type TStoreActions = {
  fetchMessages: () => Promise<void>;
  sendMessage: (content: string) => Promise<TCopilotMessage | null>;
  clearMessages: () => Promise<void>;
  resetStore: () => void;
};

const USER_ROLE = "USER" as TCopilotMessage["role"];

type TCopilotStore = TStoreState & TStoreActions;

const initialValue: TStoreState = {
  messages: [],
  isLoading: false,
  isSending: false,
  error: null,
  hasFetched: false,
};

let fetchInflight: Promise<void> | null = null;

const useCopilotStore = create<TCopilotStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialValue,
    fetchMessages: () => {
      if (fetchInflight) return fetchInflight;
      set({ isLoading: true, error: null, hasFetched: true });
      fetchInflight = (async () => {
        try {
          const { items } = await getCopilotMessages(1, 100);
          set({ messages: items, isLoading: false });
        } catch (error) {
          const message = constructErrorMessage(
            error as TApiErrorResponseType,
            "Couldn't load copilot history.",
          );
          set({ isLoading: false, error: message });
        } finally {
          fetchInflight = null;
        }
      })();
      return fetchInflight;
    },
    sendMessage: async (content) => {
      const trimmed = content.trim();
      if (!trimmed) return null;

      const optimisticId = `pending-${Date.now()}`;
      const optimistic: TCopilotMessage = {
        id: optimisticId,
        role: USER_ROLE,
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      set({
        messages: [...get().messages, optimistic],
        isSending: true,
        error: null,
      });

      try {
        const { message, reply } = await sendCopilotMessage({
          content: trimmed,
        });
        set((state) => ({
          messages: [
            ...state.messages.filter((m) => m.id !== optimisticId),
            message,
            reply,
          ],
          isSending: false,
        }));
        return reply;
      } catch (error) {
        const errorMessage = constructErrorMessage(
          error as TApiErrorResponseType,
          "Copilot couldn't reply just yet.",
        );
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== optimisticId),
          isSending: false,
          error: errorMessage,
        }));
        return null;
      }
    },
    clearMessages: async () => {
      try {
        await clearCopilotMessages();
        set({ messages: [], error: null });
      } catch (error) {
        const message = constructErrorMessage(
          error as TApiErrorResponseType,
          "Couldn't clear chat history.",
        );
        set({ error: message });
      }
    },
    resetStore: () => set({ ...initialValue }),
  })),
);

export default useCopilotStore;
