import { getData } from "@/api";
import { constructErrorMessage } from "@/api/functions";
import { UserGenders, UserRoles } from "@/lib/enum";
import type { TPrice } from "@/lib/money";
import useWalletStore from "@/stores/wallet-store";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

export type TBankAccount = {
  id: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  customerIdentifier: string;
  beneficiaryAccount?: string | null;
  provider: string;
  balance: TPrice;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TUserDetails = {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  bvn?: string;
  nin?: string;
  address?: string;
  gender?: UserGenders;
  category?: string;
  role?: UserRoles;
  dateOfBirth?: Date;
  isEmailVerified?: boolean;
  isPhoneNumberVerified?: boolean;
  isAccountCreationCompleted?: boolean;
  createdAt?: Date;
  bankAccounts?: TBankAccount[];
};

type TStoreState = {
  userDetails: TUserDetails | null;
  accessToken: string | null;
  isLoading: boolean;
  fetchingUserDetailsError: string | null;
  hasFetched: boolean;
};

type TStoreActions = {
  setUserDetails: (userDetails: TUserDetails) => void;
  setAuth: (args: { accessToken: string; userDetails: TUserDetails }) => void;
  clearStore: () => void;
  setIsLoading: (isLoading: boolean) => void;
  getUserDetails: () => Promise<void>;
  bootstrap: () => Promise<void>;
};

type TUserStoreType = TStoreState & TStoreActions;

const initialValue: TStoreState = {
  userDetails: null,
  accessToken: null,
  isLoading: false,
  fetchingUserDetailsError: null,
  hasFetched: false,
};

const useUserStore = create(
  persist(
    subscribeWithSelector<TUserStoreType>((set, get) => ({
      ...initialValue,
      setUserDetails: (userDetails) => set({ userDetails }),
      setAuth: ({ accessToken, userDetails }) => {
        set({ accessToken, userDetails });
      },
      clearStore: () => {
        useWalletStore.getState().clearStore();
        set({ ...initialValue });
      },
      setIsLoading: (isLoading) => set({ isLoading }),
      getUserDetails: async () => {
        const state = get();
        if (!state.accessToken) {
          set({ isLoading: false, hasFetched: true });
          return;
        }
        if (state.isLoading) return;

        set({
          isLoading: true,
          fetchingUserDetailsError: null,
          hasFetched: true,
        });

        try {
          const { data } = await getData<TUserDetails>("/auth/me");
          const userDetails = data?.data ?? null;
          set({
            userDetails,
            isLoading: false,
            fetchingUserDetailsError: userDetails ? null : "No user data received",
          });
        } catch (error) {
          const errorContent = error as TApiErrorResponseType;
          const status = errorContent?.response?.status;

          if (status === 401 || status === 403) {
            set({
              userDetails: null,
              accessToken: null,
              isLoading: false,
              fetchingUserDetailsError: "Unauthorized!",
            });
            return;
          }

          set({
            isLoading: false,
            fetchingUserDetailsError: constructErrorMessage(
              errorContent,
              "Couldn't fetch user details. Try refreshing.",
            ),
          });
        }
      },
      // Called once from the root client layout on initial page load. If both
      // the token and userDetails were rehydrated from localStorage, revalidate
      // against /auth/me. Otherwise wipe whatever partial state remains so the
      // user lands on the sign-in screen instead of a half-authenticated UI.
      bootstrap: async () => {
        const { accessToken, userDetails, getUserDetails, clearStore } = get();
        if (accessToken && userDetails) {
          await getUserDetails();
          return;
        }
        if (accessToken || userDetails) {
          clearStore();
        }
      },
    })),
    {
      name: "user-store",
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
      partialize: (state) => ({
        userDetails: state.userDetails,
        accessToken: state.accessToken,
      }),
    },
  ),
);

export default useUserStore;
