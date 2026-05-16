import { deleteData, getData, patchData, postData } from "@/api";
import { CopilotRole } from "@/lib/enum";

export type TCopilotMessage = {
  id: string;
  role: CopilotRole;
  content: string;
  createdAt: string;
};

export type TCopilotChat = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
};

export type TSendCopilotMessagePayload = {
  content: string;
};

export type TSendCopilotMessageResponse = {
  chatId: string;
  message: TCopilotMessage;
  reply: TCopilotMessage;
};

export type TCreateCopilotChatPayload = {
  title?: string;
};

export type TRenameCopilotChatPayload = {
  title: string;
};

// ─── Chats ─────────────────────────────────────────────────────────────────

export const getCopilotChats = async () => {
  const { data } = await getData<TCopilotChat[]>("/copilot/chats");
  return data.data;
};

export const createCopilotChat = async (
  payload: TCreateCopilotChatPayload = {},
) => {
  const { data } = await postData<TCreateCopilotChatPayload, TCopilotChat>(
    "/copilot/chats",
    payload,
  );
  return data.data;
};

export const renameCopilotChat = async (
  chatId: string,
  payload: TRenameCopilotChatPayload,
) => {
  const { data } = await patchData<TRenameCopilotChatPayload, TCopilotChat>(
    `/copilot/chats/${chatId}`,
    payload,
  );
  return data.data;
};

export const deleteCopilotChat = (chatId: string) =>
  deleteData<{ deleted: boolean }>(`/copilot/chats/${chatId}`);

// ─── Messages in a specific chat ───────────────────────────────────────────

export const getCopilotChatMessages = async (
  chatId: string,
  page = 1,
  limit = 50,
) => {
  const { data } = await getData<TCopilotMessage[]>(
    `/copilot/chats/${chatId}/messages`,
    { params: { page, limit } },
  );
  return { items: data.data, pagination: data.pagination };
};

export const sendCopilotChatMessage = async (
  chatId: string,
  payload: TSendCopilotMessagePayload,
) => {
  const { data } = await postData<
    TSendCopilotMessagePayload,
    TSendCopilotMessageResponse
  >(`/copilot/chats/${chatId}/messages`, payload);
  return data.data;
};

export const clearCopilotChatMessages = (chatId: string) =>
  deleteData<{ deleted: number }>(`/copilot/chats/${chatId}/messages`);

// ─── Default-chat fallback (most-recent chat, auto-creates on send) ────────

export const getCopilotMessages = async (page = 1, limit = 50) => {
  const { data } = await getData<TCopilotMessage[]>("/copilot/messages", {
    params: { page, limit },
  });
  return { items: data.data, pagination: data.pagination };
};

export const sendCopilotMessage = async (
  payload: TSendCopilotMessagePayload,
) => {
  const { data } = await postData<
    TSendCopilotMessagePayload,
    TSendCopilotMessageResponse
  >("/copilot/messages", payload);
  return data.data;
};

// Wipes ALL chats and messages for the user. Per-chat clearing lives in
// clearCopilotChatMessages — that one keeps the chat row.
export const clearCopilotMessages = () =>
  deleteData<{ deleted: number }>("/copilot/messages");

// ─── Context ───────────────────────────────────────────────────────────────

export type TCopilotContextTone = "good" | "lime" | "info" | "warn" | "bad";

export type TCopilotContextRecommendation = {
  title: string;
  detail: string;
  tag: { label: string; tone: TCopilotContextTone };
};

export type TCopilotContextObligation = {
  label: string;
  amount: number;
  dueAt: string;
};

export type TCopilotContext = {
  healthScore: number;
  healthTone: TCopilotContextTone;
  weeklySummaryHeadline: string;
  topRecommendation: TCopilotContextRecommendation | null;
  upcomingObligations: TCopilotContextObligation[];
  liveBufferPercent: number;
};

export const getCopilotContext = async () => {
  const { data } = await getData<TCopilotContext>("/copilot/context");
  return data.data;
};
