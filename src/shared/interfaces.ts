export type Size = "S" | "M" | "L" | "XL";

export type Stock = {
  size: Size;
  quantity: number;
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
