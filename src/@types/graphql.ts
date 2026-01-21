import { User } from "./user";

export interface LoginResponse {
  signIn: {
    token: string;
    user: User;
  };
}

export interface EnterpriseInput {
  id: string;
  name: string;
  listingType: "RENT" | "SALE";
  price: number;
  gallery: string[];
  user: User;
}
export interface CreateEnterpriseInput {
  name: string;
  listingType: "RENT" | "SALE";
  price: number;
  gallery: string[];
}

export interface GetEnterprisesResponse {
  enterprises: EnterpriseInput[];
}
export interface GetEnterpriseResponse {
  enterprise: EnterpriseInput;
}

export interface EnterpriseFilter {
  listingType: "RENT" | "SALE";
  minPrice: number;
  maxPrice: number;
}
