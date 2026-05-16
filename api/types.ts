import { TUserDetails } from "@/stores/user-store";
import { AxiosError, AxiosResponse } from "axios";

declare global {
  export type TPaginationType = {
    presentPage: number;
    total: number;
    limit: number;
    previousPage: number | null;
    nextPage: number | null;
    totalPage: number;
  };
  export type TMetaType = {
    nextLink: string | null;
    previousLink: string | null;
    presentLink: string | null;
  };

  export type TResultPaginationType = {
    meta: TMetaType;
    pagination: TPaginationType;
  };

  export type TCategoryType = {
    name: string;
    id: string;
    createdAt?: Date;
    creator?: TUserDetails;
    totalServices?: number;
    totalSubCategories?: number;
    totalSkills?: number;
    image?: string;
  };
  export type TSkillType = {
    id: string;
    name: string;
    description?: string;
    createdAt?: Date;
    creator?: TUserDetails;
    totalCategories?: number;
    totalSubCategories?: number;
  };
  export type TSubCategoryType = {
    id: string;
    createdAt?: Date;
    skill?: TSkillType;
    name: string;
    creator?: TUserDetails;
    category?: TCategoryType;
    description?: string;
  };

  export type TMoneyType = {
    amount: number;
    currency?: {
      code: string;
      symbol: string;
      name: string;
    };
    formatted?: {
      withCurrency: string;
      withoutCurrency: string;
    };
    parts?: {
      whole: number;
      subUnit: number;
      smallestUnit: number;
    };
  };

  export type TServiceType = {
    id: string;
    address?: string;
    budget?: TMoneyType;
    acceptedBudget?: TMoneyType;
    description?: string;
    latitude?: string;
    longitude?: string;
    subCategory?: string;
    createdAt?: string;
    status?: "PENDING" | "ACCEPTED" | "COMPLETED" | "CANCELLED";
    user?: TUserDetails;
    assignedArtisan?: TUserDetails;
    acceptedAt?: string;
    payment?: {
      status?: string;
      amount?: TMoneyType;
      description?: string;
    };
    serviceFiles?: { fileType: string; url: string }[];
  };

  export type TVerificationUserType = {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    mobileNumber?: string;
    isMobileNumberVerified?: boolean;
    isEmailVerified?: boolean;
    role?: string;
    createdAt?: string;
    avatar?: string | null;
    bio?: string;
    skill?: Record<string, unknown>;
    geographicalLocations?: Record<string, unknown>;
    verificationStatus?: "PENDING" | "VERIFIED" | "DECLINED";
    totalDocuments?: number;
  };

  export type TVerificationDocumentType = {
    id: string;
    verificationType?: string;
    status?: "PENDING" | "VERIFIED" | "DECLINED";
    content?: string;
    createdAt?: string;
    declinedReason?: string | null;
    image?: string;
  };

  export type TUserVerificationDetailsType = {
    user: TVerificationUserType;
    verificationStatus: "PENDING" | "VERIFIED" | "DECLINED";
    verificationDocuments: TVerificationDocumentType[];
  };

  export type TTransactionType = {
    id: string;
    type?: "DEBIT" | "CREDIT";
    amount?: TMoneyType;
    status?: string;
    description?: string;
    createdAt?: string;
    reference?: string;
  };

  export type TWalletType = {
    balance?: TMoneyType;
  };

  export type TApiCallResponseType<T> = { data: T } & TResultPaginationType;

  export type TErrorResponseType = {
    message?: string;
    errors?: {
      [name: string]: string | string[];
    };
  };

  export type TApiRequestResponseType<T> = Promise<
    AxiosResponse<TApiCallResponseType<T>>
  >;

  export type TApiErrorResponseType = AxiosError<TErrorResponseType>;
}

export {};
