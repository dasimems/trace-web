import { deleteData, getData, postData } from "@/api";
import { OpportunitySource } from "@/lib/enum";

export type TOpportunityProvider = {
  name: string;
  initials: string;
  verified: boolean;
};

export type TOpportunityStats = {
  return?: string;
  risk?: string;
  min?: string;
  tenor?: string;
};

export type TOpportunity = {
  id: string;
  source: OpportunitySource;
  type: string;
  title: string;
  description: string;
  provider: TOpportunityProvider;
  stats: TOpportunityStats;
  matchPercent: number;
  isSaved: boolean;
  aiRationale?: string;
};

export type TOpportunityFilters = {
  source?: OpportunitySource;
  minMatch?: number;
  q?: string;
};

export const getOpportunities = async (filters?: TOpportunityFilters) => {
  const { data } = await getData<TOpportunity[]>("/opportunities", {
    params: filters,
  });
  return data.data;
};

const opportunityPath = (source: OpportunitySource, id: string) =>
  `/opportunities/${source}/${id}`;

export const getOpportunity = async (
  source: OpportunitySource,
  id: string,
) => {
  const { data } = await getData<TOpportunity>(opportunityPath(source, id));
  return data.data;
};

export const saveOpportunity = (source: OpportunitySource, id: string) =>
  postData<undefined, void>(`${opportunityPath(source, id)}/save`, undefined);

export const unsaveOpportunity = (source: OpportunitySource, id: string) =>
  deleteData<void>(`${opportunityPath(source, id)}/save`);

export type TOpportunitySimulation = {
  inputAmount: number;
  inputTenorDays: number;
  totalRepayment?: number;
  totalInterest?: number;
  weeklyPayment?: number;
  dailyPayment?: number;
  isAffordable?: boolean;
  projectedValue?: number;
  projectedReturnBps?: number;
  eligibilityScore?: number;
};

export type TOpportunityPersonalized = {
  estimatedNetReceived?: number;
  estimatedMonthlyCost?: number;
  weeklyBufferPercent?: number;
  approvalConfidencePercent: number;
  oneLiner: string;
};

export type TCostBreakdownItem = {
  label: string;
  amount: number;
  recurring: boolean;
};

export type TCostBreakdown = {
  items: TCostBreakdownItem[];
  totalUpfront: number;
  totalRecurring: number;
  cycle?: "WEEKLY" | "MONTHLY" | "DAILY";
};

export type TRequiredDocument = {
  id: string;
  label: string;
  description: string;
  required: boolean;
  category: "IDENTITY" | "BUSINESS" | "FINANCIAL" | "COLLATERAL" | "OTHER";
  uploaded: boolean;
};

export type TOpportunityDocuments = {
  documents: TRequiredDocument[];
};

export type TFaqEntry = {
  question: string;
  answer: string;
};

export type TOpportunityFaq = {
  entries: TFaqEntry[];
};

export const simulateOpportunity = async (
  source: OpportunitySource,
  id: string,
  amount: number,
  tenorDays: number,
) => {
  const { data } = await getData<TOpportunitySimulation>(
    `${opportunityPath(source, id)}/simulate`,
    { params: { amount, tenorDays } },
  );
  return data.data;
};

export const getOpportunityPersonalized = async (
  source: OpportunitySource,
  id: string,
) => {
  const { data } = await getData<TOpportunityPersonalized>(
    `${opportunityPath(source, id)}/personalized`,
  );
  return data.data;
};

export const getOpportunityCostBreakdown = async (
  source: OpportunitySource,
  id: string,
) => {
  const { data } = await getData<TCostBreakdown>(
    `${opportunityPath(source, id)}/cost-breakdown`,
  );
  return data.data;
};

export const getOpportunityDocuments = async (
  source: OpportunitySource,
  id: string,
) => {
  const { data } = await getData<TOpportunityDocuments>(
    `${opportunityPath(source, id)}/documents`,
  );
  return data.data;
};

export const getOpportunityFaq = async (
  source: OpportunitySource,
  id: string,
) => {
  const { data } = await getData<TOpportunityFaq>(
    `${opportunityPath(source, id)}/faq`,
  );
  return data.data;
};
