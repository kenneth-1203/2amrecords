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
  id: number;
  name: string;
  description: string;
  variant: string;
  sizes: Size[];
  stock: Stock[];
  totalQuantity: number;
  discountedPrice: number;
  originalPrice: number;
  category: Category[];
}

export interface ICategoryData {
  id: string;
  name: string;
  title: string;
  description: string;
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

export interface IUserDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  postcode: string;
  photoURL: string;
  items: IProductData[];
  provider: "google" | null;
  lastSignedIn: Date;
  createdAt: Date;
}
