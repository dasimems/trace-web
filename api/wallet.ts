import { deleteData, getData, patchData, postData } from "@/api";

export type TWalletBalance = {
  available: number;
  ledger: number;
  pending: number;
  todayInflow: number;
  todayOutflow: number;
};

export type TWalletAccount = {
  id: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  customerIdentifier: string;
  beneficiaryAccount?: string | null;
  provider: string;
  balance: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TWalletSnapshot = {
  account: TWalletAccount;
  balance: TWalletBalance;
};

export type TWalletPocketType = "SPEND" | "SAVE" | "GOAL";

export type TWalletPocket = {
  id: string;
  name: string;
  type: TWalletPocketType;
  balance: number;
  targetAmount?: number;
  isDefault: boolean;
  accountId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TRecentRecipient = {
  name: string;
  accountNumber: string;
  bankCode?: string;
  bankName?: string;
  lastUsedAt: string;
};

export const getWallet = async () => {
  const { data } = await getData<TWalletSnapshot>("/wallet");
  return data.data;
};

export const getPockets = async () => {
  const { data } = await getData<TWalletPocket[]>("/wallet/pockets");
  return data.data;
};

export const getRecentRecipients = async () => {
  const { data } = await getData<TRecentRecipient[]>("/wallet/recipients");
  return data.data;
};

export type TCreatePocketPayload = {
  name: string;
  type: TWalletPocketType;
  targetAmount?: number;
};

export const createPocket = async (payload: TCreatePocketPayload) => {
  const { data } = await postData<TCreatePocketPayload, TWalletPocket>(
    "/wallet/pockets",
    payload,
  );
  return data.data;
};

export type TUpdatePocketPayload = Partial<{
  name: string;
  targetAmount: number | null;
}>;

export const updatePocket = async (id: string, payload: TUpdatePocketPayload) => {
  const { data } = await patchData<TUpdatePocketPayload, TWalletPocket>(
    `/wallet/pockets/${id}`,
    payload,
  );
  return data.data;
};

export const deletePocket = (id: string) =>
  deleteData<void>(`/wallet/pockets/${id}`);

export type TLookupRecipientPayload = {
  bankCode: string;
  accountNumber: string;
};

export type TLookupRecipient = {
  accountNumber: string;
  accountName: string;
  bankCode: string;
};

export const lookupRecipient = async (payload: TLookupRecipientPayload) => {
  const { data } = await postData<TLookupRecipientPayload, TLookupRecipient>(
    "/wallet/transfer/lookup",
    payload,
  );
  return data.data;
};

export type TTransferPayload = {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  remark?: string;
};

export const initiateTransfer = async (payload: TTransferPayload) => {
  const { data } = await postData<TTransferPayload, unknown>(
    "/wallet/transfer",
    payload,
  );
  return data.data;
};

export type TVirtualCard = {
  id: string;
  last4: string;
  brand: "VISA" | "VERVE" | "MASTERCARD";
  expMonth: number;
  expYear: number;
  status: "ACTIVE" | "FROZEN" | "TERMINATED";
  spendLimitMonthly: number;
  spentThisMonth: number;
  createdAt: string;
};

export const getVirtualCards = async () => {
  const { data } = await getData<TVirtualCard[]>("/wallet/cards");
  return data.data;
};

export const createVirtualCard = async () => {
  const { data } = await postData<undefined, TVirtualCard>(
    "/wallet/cards",
    undefined,
  );
  return data.data;
};

export const freezeVirtualCard = async (id: string) => {
  const { data } = await patchData<undefined, TVirtualCard>(
    `/wallet/cards/${id}/freeze`,
    undefined,
  );
  return data.data;
};

export const terminateVirtualCard = (id: string) =>
  deleteData<void>(`/wallet/cards/${id}`);
