import { postData } from "@/api";
import { UserCategories, UserGenders } from "@/lib/enum";
import useSignUpBufferStore from "@/stores/sign-up-buffer-store";
import useUserStore, { type TUserDetails } from "@/stores/user-store";

export type TSignUpPayload = {
  email: string;
  password: string;
};

export type TSignInPayload = {
  email: string;
  password: string;
};

export type TLoginResponseData = {
  accessToken?: string;
  user: TUserDetails;
};

export type TCreateAccountPayload = {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: UserGenders;
  address: string;
  bvn: string;
  nin?: string;
  category: UserCategories;
};

export const signUp = async (payload: TSignUpPayload) => {
  const { data } = await postData<TSignUpPayload, TLoginResponseData>(
    "/auth/sign-up",
    payload
  );
  const { accessToken, user } = data.data;
  if (accessToken) {
    useUserStore.getState().setAuth({ accessToken, userDetails: user });
  }
  return data.data;
};

export const signIn = async (payload: TSignInPayload) => {
  const { data } = await postData<TSignInPayload, TLoginResponseData>(
    "/auth/sign-in",
    payload
  );
  const { accessToken, user } = data.data;
  if (accessToken) {
    useUserStore.getState().setAuth({ accessToken, userDetails: user });
  }
  return data.data;
};

export const createAccount = async (payload: TCreateAccountPayload) => {
  const { data } = await postData<TCreateAccountPayload, TUserDetails>(
    "/auth/account",
    payload
  );
  const user = data.data;
  useUserStore.getState().setUserDetails(user);
  useSignUpBufferStore.getState().clearBuffer();
  return user;
};
