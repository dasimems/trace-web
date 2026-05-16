import {
  getPockets,
  getWallet,
  type TWalletPocket,
  type TWalletSnapshot,
} from "@/api/wallet";
import { constructErrorMessage } from "@/api/functions";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type TStoreState = {
  snapshot: TWalletSnapshot | null;
  pockets: TWalletPocket[];
  isLoading: boolean;
  isLoadingPockets: boolean;
  fetchError: string | null;
  pocketsError: string | null;
  hasFetched: boolean;
  hasFetchedPockets: boolean;
};

type TStoreActions = {
  fetchWallet: () => Promise<void>;
  fetchPockets: () => Promise<void>;
  clearStore: () => void;
};

type TWalletStore = TStoreState & TStoreActions;

const initialValue: TStoreState = {
  snapshot: null,
  pockets: [],
  isLoading: false,
  isLoadingPockets: false,
  fetchError: null,
  pocketsError: null,
  hasFetched: false,
  hasFetchedPockets: false,
};

let walletInflight: Promise<void> | null = null;
let pocketsInflight: Promise<void> | null = null;

const useWalletStore = create<TWalletStore>()(
  subscribeWithSelector((set) => ({
    ...initialValue,
    fetchWallet: () => {
      if (walletInflight) return walletInflight;
      set({ isLoading: true, fetchError: null, hasFetched: true });
      walletInflight = (async () => {
        try {
          const snapshot = await getWallet();
          set({ snapshot, isLoading: false });
        } catch (error) {
          const message = constructErrorMessage(
            error as TApiErrorResponseType,
            "Couldn't load wallet.",
          );
          set({ isLoading: false, fetchError: message });
        } finally {
          walletInflight = null;
        }
      })();
      return walletInflight;
    },
    fetchPockets: () => {
      if (pocketsInflight) return pocketsInflight;
      set({
        isLoadingPockets: true,
        pocketsError: null,
        hasFetchedPockets: true,
      });
      pocketsInflight = (async () => {
        try {
          const pockets = await getPockets();
          set({ pockets, isLoadingPockets: false });
        } catch (error) {
          const message = constructErrorMessage(
            error as TApiErrorResponseType,
            "Couldn't load pockets.",
          );
          set({ isLoadingPockets: false, pocketsError: message });
        } finally {
          pocketsInflight = null;
        }
      })();
      return pocketsInflight;
    },
    clearStore: () => {
      walletInflight = null;
      pocketsInflight = null;
      set({ ...initialValue });
    },
  })),
);

export default useWalletStore;
