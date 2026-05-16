import { getData, postData } from "@/api";
import {
  LoanApplicationStatus,
  LoanProductType,
  LoanRepaymentStatus,
  LoanTier,
} from "@/lib/enum";

export type TLoanProduct = {
  id: string;
  name: string;
  provider: string;
  type: LoanProductType;
  interestRateBps: number;
  minAmount: number;
  maxAmount: number;
  minTenorDays: number;
  maxTenorDays: number;
  requiredTier: LoanTier;
  description: string;
  eligible: boolean;
  aiRationale?: string;
};

export type TLoanTier = {
  status: "ok" | "insufficient_data";
  tier: LoanTier;
  healthScore: number;
  maxExposure: number;
  reasons: string[];
};

export type TLoanAffordability = {
  principal: number;
  totalInterest: number;
  totalRepayment: number;
  dailyPayment: number;
  weeklyPayment: number;
  tenorDays: number;
  isAffordable: boolean;
};

export type TLoanApplication = {
  id: string;
  productId: string;
  requestedAmount: number;
  approvedAmount?: number;
  tenorDays: number;
  status: LoanApplicationStatus;
  rejectionReason?: string;
  decisionedAt?: string;
  disbursedAt?: string;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TLoanRepayment = {
  id: string;
  sequence: number;
  dueAt: string;
  principalAmount: number;
  interestAmount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: LoanRepaymentStatus;
  paidAt?: string;
};

export type TLoanSchedule = {
  applicationId: string;
  status: LoanApplicationStatus;
  principal: number;
  totalInterest: number;
  totalRepayment: number;
  totalPaid: number;
  totalOutstanding: number;
  disbursedAt?: string;
  finalDueAt?: string;
  repaidAt?: string;
  installments: TLoanRepayment[];
};

export type TApplyForLoanPayload = {
  productId: string;
  requestedAmount: number;
  tenorDays: number;
};

export type TAffordabilityQuery = {
  productId: string;
  amount: number;
  tenorDays: number;
};

export const getLoanTier = async () => {
  const { data } = await getData<TLoanTier>("/loans/tier");
  return data.data;
};

export const getLoanProducts = async () => {
  const { data } = await getData<TLoanProduct[]>("/loans/products");
  return data.data;
};

export const getLoanAffordability = async (query: TAffordabilityQuery) => {
  const { data } = await getData<TLoanAffordability>("/loans/affordability", {
    params: query,
  });
  return data.data;
};

export const applyForLoan = async (payload: TApplyForLoanPayload) => {
  const { data } = await postData<TApplyForLoanPayload, TLoanApplication>(
    "/loans/applications",
    payload,
  );
  return data.data;
};

export const getLoanApplications = async (page = 1, limit = 20) => {
  const { data } = await getData<TLoanApplication[]>("/loans/applications", {
    params: { page, limit },
  });
  return { items: data.data, pagination: data.pagination };
};

export const getLoanApplication = async (id: string) => {
  const { data } = await getData<TLoanApplication>(
    `/loans/applications/${id}`,
  );
  return data.data;
};

export const getLoanSchedule = async (id: string) => {
  const { data } = await getData<TLoanSchedule>(
    `/loans/applications/${id}/schedule`,
  );
  return data.data;
};
