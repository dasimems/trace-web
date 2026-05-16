import { deleteData, getData, patchData, postData } from "@/api";
import {
  PaymentRequestKind,
  PaymentRequestStatus,
  TransactionCategory,
} from "@/lib/enum";
import type { TTransaction } from "@/api/transactions";

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
  // Optional. The backend infers a category from the recipient when omitted
  // (e.g. Chowdeck → FOOD_AND_DINING) and falls back to TRANSFER.
  category?: TransactionCategory;
};

export const initiateTransfer = async (payload: TTransferPayload) => {
  const { data } = await postData<TTransferPayload, TTransaction>(
    "/wallet/transfer",
    payload,
  );
  return data.data;
};

export const requeryTransfer = async (reference: string) => {
  const { data } = await getData<TTransaction>(
    `/wallet/transfer/${encodeURIComponent(reference)}`,
  );
  return data.data;
};

// ─── Banks ─────────────────────────────────────────────────────────────────

export type TBank = {
  code: string;
  name: string;
};

export const getBanks = async () => {
  const { data } = await getData<TBank[]>("/wallet/banks");
  return data.data;
};

// ─── Fund (self top-up via Squad checkout) ─────────────────────────────────

export type TFundAccountPayload = {
  amount: number;
  callbackUrl?: string;
};

export type TFundAccountResponse = {
  checkoutUrl: string;
  reference: string;
  amount: number;
  currency: string;
};

export const initiateFundAccount = async (payload: TFundAccountPayload) => {
  const { data } = await postData<TFundAccountPayload, TFundAccountResponse>(
    "/wallet/fund",
    payload,
  );
  return data.data;
};

export const verifyFundAccount = async (reference: string) => {
  const { data } = await getData<TTransaction>(
    `/wallet/fund/${encodeURIComponent(reference)}`,
  );
  return data.data;
};

// ─── Payment requests (shareable FUND + REQUEST links) ─────────────────────

export type TPaymentRequest = {
  id: string;
  reference: string;
  gatewayRef?: string;
  kind: PaymentRequestKind;
  amount: number;
  currency: string;
  status: PaymentRequestStatus;
  description?: string;
  checkoutUrl: string;
  callbackUrl?: string;
  paymentType?: string;
  paidByEmail?: string;
  paidByName?: string;
  paidAt?: string;
  expiresAt?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
};

export type TCreatePaymentRequestPayload = {
  amount: number;
  description?: string;
  callbackUrl?: string;
  expiresAt?: string;
};

export const createPaymentRequest = async (
  payload: TCreatePaymentRequestPayload,
) => {
  const { data } = await postData<TCreatePaymentRequestPayload, TPaymentRequest>(
    "/wallet/payment-requests",
    payload,
  );
  return data.data;
};

export type TListPaymentRequestsQuery = {
  kind?: PaymentRequestKind;
  status?: PaymentRequestStatus;
  page?: number;
  limit?: number;
};

export const getPaymentRequests = async (query?: TListPaymentRequestsQuery) => {
  const { data } = await getData<TPaymentRequest[]>("/wallet/payment-requests", {
    params: query,
  });
  return { items: data.data, pagination: data.pagination };
};

export const getPaymentRequest = async (reference: string) => {
  const { data } = await getData<TPaymentRequest>(
    `/wallet/payment-requests/${encodeURIComponent(reference)}`,
  );
  return data.data;
};

export const reverifyPaymentRequest = async (reference: string) => {
  const { data } = await getData<TPaymentRequest>(
    `/wallet/payment-requests/${encodeURIComponent(reference)}/reverify`,
  );
  return data.data;
};

export const cancelPaymentRequest = async (reference: string) => {
  const { data } = await deleteData<TPaymentRequest>(
    `/wallet/payment-requests/${encodeURIComponent(reference)}`,
  );
  return data?.data;
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
