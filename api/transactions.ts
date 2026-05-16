import { getData } from "@/api";
import {
  TransactionCategory,
  TransactionDirection,
  TransactionStatus,
} from "@/lib/enum";

export type TTransactionMetrics = {
  inflowThisMonth: number;
  outflowThisMonth: number;
  inflowSources: number;
  outflowCategories: number;
  pendingCount: number;
  failedCount: number;
};

export type TTransaction = {
  id: string;
  reference: string;
  providerReference?: string;
  direction: TransactionDirection;
  status: TransactionStatus;
  category: TransactionCategory;
  description?: string;
  amount: number;
  fee: number;
  principalAmount?: number;
  settledAmount?: number;
  currency: string;
  senderName?: string;
  senderAccountNumber?: string;
  senderBankCode?: string;
  senderBankName?: string;
  recipientName?: string;
  recipientAccountNumber?: string;
  recipientBankCode?: string;
  recipientBankName?: string;
  remark?: string;
  provider: string;
  accountId: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TListTransactionsQuery = {
  page?: number;
  limit?: number;
  direction?: TransactionDirection;
  status?: TransactionStatus;
  category?: TransactionCategory;
};

export const getTransactionMetrics = async () => {
  const { data } = await getData<TTransactionMetrics>("/transactions/metrics");
  return data.data;
};

export const getTransactions = async (query?: TListTransactionsQuery) => {
  const { data } = await getData<TTransaction[]>("/transactions", {
    params: query,
  });
  return { items: data.data, pagination: data.pagination };
};

export const getTransaction = async (id: string) => {
  const { data } = await getData<TTransaction>(`/transactions/${id}`);
  return data.data;
};
