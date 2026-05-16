import { UserCategories } from "@/lib/enum";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

export type TBankStepValues = {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  category: UserCategories | null;
};

type TStoreState = {
  bankStep: TBankStepValues | null;
};

type TStoreActions = {
  setBankStep: (values: TBankStepValues) => void;
  clearBuffer: () => void;
};

type TSignUpBufferStore = TStoreState & TStoreActions;

const initialValue: TStoreState = {
  bankStep: null,
};

const useSignUpBufferStore = create(
  persist(
    subscribeWithSelector<TSignUpBufferStore>((set) => ({
      ...initialValue,
      setBankStep: (values) => set({ bankStep: values }),
      clearBuffer: () => set({ ...initialValue }),
    })),
    {
      name: "sign-up-buffer-store",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({ bankStep: state.bankStep }),
    }
  )
);

export default useSignUpBufferStore;
