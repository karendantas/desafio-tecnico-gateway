import { User } from "./user";

export interface LoginResponse {
  signIn: {
    token: string;
    user: User;
  };
}

export interface EnterpriseInput {
  id: String;
  name: String;
  listingType: "RENT" | "SALE";
  price: number;
  gallery: String[];
}

export interface GetEnterprisesResponse {
  enterprises: EnterpriseInput[];
}

export interface EnterpriseFilter {
  listingType: "RENT" | "SALE";
  minPrice: number;
  maxPrice: number;
}
