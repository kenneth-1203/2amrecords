import { ProductSize, ProductStock } from "./types";

export interface IProductData {
  id: number;
  name: string;
  description: string;
  variants: Array<string>;
  sizes: Array<ProductSize>;
  stock: Array<ProductStock>;
  totalQuantity: number;
  price: number;
  category: Array<string>;
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
