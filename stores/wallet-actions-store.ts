import { create } from "zustand";

import type { TRecentRecipient } from "@/api/wallet";

export type TWalletActionMode = "fund" | "send" | "request";

type TStoreState = {
  mode: TWalletActionMode | null;
  prefillRecipient: TRecentRecipient | null;
};

type TStoreActions = {
  openFund: () => void;
  openSend: (recipient?: TRecentRecipient) => void;
  openRequest: () => void;
  close: () => void;
};

const initialValue: TStoreState = {
  mode: null,
  prefillRecipient: null,
};

const useWalletActionsStore = create<TStoreState & TStoreActions>((set) => ({
  ...initialValue,
  openFund: () => set({ mode: "fund", prefillRecipient: null }),
  openSend: (recipient) =>
    set({ mode: "send", prefillRecipient: recipient ?? null }),
  openRequest: () => set({ mode: "request", prefillRecipient: null }),
  close: () => set(initialValue),
}));

export default useWalletActionsStore;
