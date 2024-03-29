import { Timestamp } from "firebase/firestore";

export type Collections = "Products" | "Users" | "Categories" | "Orders";

export type Size = "S" | "M" | "L" | "XL";

export type Stock = {
  size: Size;
  quantity: number;
};

export type Category = {
  id: string;
  name: string;
};

export interface IProductData {
  id: string;
  name: string;
  description: string;
  variant: string;
  sizes: Size[];
  stock: Stock[];
  releaseDate: string;
  totalQuantity: number;
  discountedPrice: number | null;
  discountExpiry: string | null;
  originalPrice: number;
  category: Category[];
  active: boolean;
  createdAt: Date;
  trend: string[];
}

export interface ICategoryData {
  id: string;
  name: string;
  sort: number;
}

export interface ISignUpForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  postcode: string;
}

export interface IOrderHistory {
  id: string;
  status: "paid" | "canceled" | "pending";
  items: IBagItem[];
  date: Timestamp;
}

export interface IUserDetails extends IShippingInfo {
  id: string;
  fullName: string;
  email: string;
  photoURL: string;
  items: IBagItem[];
  orderHistory: IOrderHistory[];
  provider: "google" | null;
  lastSignedIn: Date;
  createdAt: Date;
}

export interface IBagItem extends IProductData {
  id: string;
  name: string;
  variant: string;
  description: string;
  originalPrice: number;
  discountedPrice: number | null;
  discountExpiry: string;
  size: string;
  imageURL: string;
}

export interface IOrderDetails {
  id?: string;
  authenticated?: boolean;
  items?: IBagItem[];
  customer?: {
    fullName: string;
  };
}
