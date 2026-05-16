export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum UserGenders {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum UserCategories {
  TRADER = "TRADER",
  FREELANCER = "FREELANCER",
  EMPLOYEE = "EMPLOYEE",
  STUDENT = "STUDENT",
  SMALL_BUSINESS_OWNER = "SMALL_BUSINESS_OWNER"
}

export enum TransactionDirection {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT"
}

export enum TransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REVERSED = "REVERSED"
}

export enum TransactionCategory {
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
  FOOD_AND_DINING = "FOOD_AND_DINING",
  TRANSPORT = "TRANSPORT",
  BILLS_AND_UTILITIES = "BILLS_AND_UTILITIES",
  SHOPPING = "SHOPPING",
  ENTERTAINMENT = "ENTERTAINMENT",
  HEALTH = "HEALTH",
  EDUCATION = "EDUCATION",
  SAVINGS = "SAVINGS",
  INVESTMENT = "INVESTMENT",
  FEES = "FEES",
  OTHER = "OTHER"
}

export enum LoanTier {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM"
}

export enum LoanProductType {
  PERSONAL = "PERSONAL",
  SALARY_ADVANCE = "SALARY_ADVANCE",
  BUSINESS = "BUSINESS",
  EMERGENCY = "EMERGENCY"
}

export enum LoanApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  DISBURSED = "DISBURSED",
  REPAID = "REPAID",
  DEFAULTED = "DEFAULTED"
}

export enum LoanRepaymentStatus {
  PENDING = "PENDING",
  DUE = "DUE",
  PAID = "PAID"
}

export enum InvestmentProductType {
  MONEY_MARKET = "MONEY_MARKET",
  TREASURY_BILL = "TREASURY_BILL",
  BOND = "BOND",
  COOPERATIVE = "COOPERATIVE",
  ETF = "ETF",
  FIXED_DEPOSIT = "FIXED_DEPOSIT"
}

export enum RiskLevel {
  LOW = "LOW",
  LOW_MEDIUM = "LOW_MEDIUM",
  MEDIUM = "MEDIUM",
  MEDIUM_HIGH = "MEDIUM_HIGH",
  HIGH = "HIGH"
}

export enum InvestmentAllocationStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  WITHDRAWN = "WITHDRAWN"
}

export enum OpportunitySource {
  LOAN = "LOAN",
  INVESTMENT = "INVESTMENT",
  GRANT = "GRANT"
}

export enum CopilotRole {
  USER = "USER",
  ASSISTANT = "ASSISTANT"
}

export enum VirtualCardBrand {
  VISA = "VISA",
  VERVE = "VERVE",
  MASTERCARD = "MASTERCARD"
}

export enum VirtualCardStatus {
  ACTIVE = "ACTIVE",
  FROZEN = "FROZEN",
  TERMINATED = "TERMINATED"
}

export enum InvestmentDistributionType {
  DIVIDEND = "DIVIDEND",
  INTEREST = "INTEREST",
  CAPITAL_GAIN = "CAPITAL_GAIN"
}

export enum UploadedDocumentCategory {
  IDENTITY = "IDENTITY",
  BUSINESS = "BUSINESS",
  FINANCIAL = "FINANCIAL",
  COLLATERAL = "COLLATERAL",
  OTHER = "OTHER"
}
