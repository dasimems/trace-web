import { getData } from "@/api";

export type TInsightTone = "good" | "lime" | "info" | "warn" | "bad";
export type TInsightStatus = "ok" | "insufficient_data";
export type TCachedInsightStatus = "fresh" | "pending";

export type TCachedInsight<T> = {
  status: TCachedInsightStatus;
  lastUpdated: string | null;
  value: T | null;
};

export type TWeeklyCashFlowPoint = {
  label: string;
  start: string;
  end: string;
  income: number;
  spend: number;
  forecast?: number;
};

export type TCashFlow = {
  weeks: TWeeklyCashFlowPoint[];
};

export type TWeeklyMoneyFlowPoint = {
  label: string;
  start: string;
  end: string;
  in: number;
  out: number;
};

export type TMoneyFlow = {
  weeks: TWeeklyMoneyFlowPoint[];
};

export type TSpendingBreakdownItem = {
  category: string;
  amount: number;
  percent: number;
};

export type TSpendingBreakdown = {
  items: TSpendingBreakdownItem[];
  total: number;
};

export type TSubScore = {
  label: string;
  score: number;
  tone: TInsightTone;
  reason: string;
};

export type THealthTag = {
  label: string;
  tone: TInsightTone;
};

export type THealthScore = {
  status: TInsightStatus;
  score: number;
  tone: TInsightTone;
  segment: string;
  subScores: TSubScore[];
  daysOfData: number;
  tags: THealthTag[];
};

export type TRiskStabilityItem = {
  label: string;
  score: number;
  tone: TInsightTone;
  reason: string;
};

export type TRiskStability = {
  status: TInsightStatus;
  items: TRiskStabilityItem[];
  daysOfData: number;
};

export type TSummaryBullet = {
  tone: TInsightTone;
  text: string;
};

export type TWeeklySummary = {
  status: TInsightStatus;
  bullets: TSummaryBullet[];
  aiGenerated: boolean;
};

export type TRecommendation = {
  tag: { label: string; tone: TInsightTone };
  title: string;
  detail: string;
  trigger: string;
};

export type TRecommendations = {
  recommendations: TRecommendation[];
  aiGenerated: boolean;
};

export const getCashFlow = async () => {
  const { data } = await getData<TCashFlow>("/analysis/cashflow");
  return data.data;
};

export const getMoneyFlow = async () => {
  const { data } = await getData<TMoneyFlow>("/analysis/money-flow");
  return data.data;
};

export type TRecurringPattern = {
  counterparty: string;
  direction: "CREDIT" | "DEBIT";
  averageAmount: number;
  cadence: "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "IRREGULAR";
  averageDaysBetween: number;
  occurrences: number;
  lastSeen: string;
  nextExpected?: string;
};

export type TRecurring = {
  patterns: TRecurringPattern[];
};

export type TAnomaly = {
  transactionId: string;
  reference: string;
  category: string;
  amount: number;
  expectedRange: { low: number; high: number };
  zScore: number;
  reason: string;
  flaggedAt: string;
};

export type TAnomalies = {
  anomalies: TAnomaly[];
};

export type TCategoryTrendItem = {
  category: string;
  current: number;
  average: number;
};

export type TCategoryTrend = {
  items: TCategoryTrendItem[];
};

export const getCategoryTrend = async () => {
  const { data } = await getData<TCategoryTrend>("/analysis/category-trend");
  return data.data;
};

export const getRecurring = async () => {
  const { data } = await getData<TCachedInsight<TRecurring>>(
    "/analysis/recurring",
  );
  return data.data;
};

export const getAnomalies = async () => {
  const { data } = await getData<TCachedInsight<TAnomalies>>(
    "/analysis/anomalies",
  );
  return data.data;
};

export type TSpendHeatmapCell = {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  hour: number;
  amount: number;
  txCount: number;
};

export type TSpendHeatmap = {
  cells: TSpendHeatmapCell[];
  rangeStart: string;
  rangeEnd: string;
  totalSpend: number;
  peakCell: { dayOfWeek: number; hour: number; amount: number } | null;
};

export const getSpendHeatmap = async (days = 30) => {
  const { data } = await getData<TSpendHeatmap>("/analysis/spend-heatmap", {
    params: { days },
  });
  return data.data;
};

export const getSpendingBreakdown = async () => {
  const { data } = await getData<TSpendingBreakdown>(
    "/analysis/spending-breakdown",
  );
  return data.data;
};

export const getHealthScore = async () => {
  const { data } = await getData<TCachedInsight<THealthScore>>(
    "/analysis/health",
  );
  return data.data;
};

export const getRiskStability = async () => {
  const { data } = await getData<TCachedInsight<TRiskStability>>(
    "/analysis/risk-stability",
  );
  return data.data;
};

export const getWeeklySummary = async () => {
  const { data } = await getData<TCachedInsight<TWeeklySummary>>(
    "/analysis/summary",
  );
  return data.data;
};

export const getRecommendations = async () => {
  const { data } = await getData<TCachedInsight<TRecommendations>>(
    "/analysis/recommendations",
  );
  return data.data;
};
