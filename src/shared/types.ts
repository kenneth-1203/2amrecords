export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export type ProductStock = {
    size: ProductSize;
    variant: string;
    quantity: number;
}