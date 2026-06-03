import { getData, postData } from "@/api";
import {
  InvestmentAllocationStatus,
  InvestmentProductType,
  RiskLevel,
} from "@/lib/enum";
import type { TPrice } from "@/lib/money";

export type TInvestmentProduct = {
  id: string;
  name: string;
  provider: string;
  type: InvestmentProductType;
  expectedReturnBps: number;
  riskLevel: RiskLevel;
  minAmount: TPrice;
  tenorDays?: number;
  description: string;
  aiRationale?: string;
  riskNarrative?: string;
};

export type TInvestmentAllocation = {
  id: string;
  productId: string;
  amount: TPrice;
  currentValue: TPrice;
  status: InvestmentAllocationStatus;
  allocatedAt?: string;
  withdrawnAt?: string;
  maturesAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type TInvestmentHolding = {
  type: InvestmentProductType;
  label: string;
  amount: TPrice;
  percent: number;
};

export type TPortfolio = {
  totalValue: TPrice;
  totalAllocated: TPrice;
  totalReturnBps: number;
  holdings: TInvestmentHolding[];
  allocations: TInvestmentAllocation[];
};

export type TSafeToInvest = {
  status: "ok" | "insufficient_data";
  suggested: TPrice;
  conservative: TPrice;
  aggressive: TPrice;
  rationale: string;
};

export type TAllocatePayload = {
  productId: string;
  amount: number;
};

export const getInvestmentProducts = async () => {
  const { data } = await getData<TInvestmentProduct[]>(
    "/investments/products",
  );
  return data.data;
};

export const getPortfolio = async () => {
  const { data } = await getData<TPortfolio>("/investments/portfolio");
  return data.data;
};

export const getSafeToInvest = async () => {
  const { data } = await getData<TSafeToInvest>(
    "/investments/safe-to-invest",
  );
  return data.data;
};

export const allocateInvestment = async (payload: TAllocatePayload) => {
  const { data } = await postData<TAllocatePayload, TInvestmentAllocation>(
    "/investments/allocations",
    payload,
  );
  return data.data;
};

export const getInvestmentAllocations = async (page = 1, limit = 20) => {
  const { data } = await getData<TInvestmentAllocation[]>(
    "/investments/allocations",
    { params: { page, limit } },
  );
  return { items: data.data, pagination: data.pagination };
};

export type TNavHistoryPoint = {
  date: string;
  navPerUnit: TPrice;
  returnBps: number;
};

export type TNavHistory = {
  points: TNavHistoryPoint[];
  totalReturnBps: number;
  cagrBps: number;
};

export type TNavSnapshot = {
  navPerUnit: TPrice;
  asOf: string;
  change24hBps: number;
  ytdReturnBps: number;
};

export type TSectorSlice = {
  sector: string;
  percent: number;
  amount: TPrice;
};

export type TSectorAllocation = {
  slices: TSectorSlice[];
};

export type TDistribution = {
  id: string;
  paidAt: string;
  amountPerUnit: TPrice;
  totalPaid: TPrice;
  type: "DIVIDEND" | "INTEREST" | "CAPITAL_GAIN";
};

export type TDistributions = {
  distributions: TDistribution[];
};

export const getNavHistory = async (
  productId: string,
  period: "1Y" | "3Y" | "YTD" = "1Y",
) => {
  const { data } = await getData<TNavHistory>(
    `/investments/products/${productId}/nav-history`,
    { params: { period } },
  );
  return data.data;
};

export const getNavSnapshot = async (productId: string) => {
  const { data } = await getData<TNavSnapshot>(
    `/investments/products/${productId}/nav`,
  );
  return data.data;
};

export const getSectorAllocation = async (productId: string) => {
  const { data } = await getData<TSectorAllocation>(
    `/investments/products/${productId}/sector-allocation`,
  );
  return data.data;
};

export const getDistributions = async (productId: string, limit = 12) => {
  const { data } = await getData<TDistributions>(
    `/investments/products/${productId}/distributions`,
    { params: { limit } },
  );
  return data.data;
};
