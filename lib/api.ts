export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  material: string;
  collection: string;
  category: string;
  isNew: boolean;
  lowStock: boolean;
  sizes: string[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  showInFilters: boolean;
  productCount: number;
};

export type Size = { id: number; name: string };

export type Collection = {
  id: number;
  slug: string;
  name: string;
  image: string;
  pieceCount: number;
  startingPrice: number;
};

export type CheckoutItem = {
  productId: number;
  size: string;
  color: string;
  quantity: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getProducts = () => request<Product[]>("/products");
export const getCategories = () => request<Category[]>("/categories");
export const getSizes = () => request<Size[]>("/sizes");
export const getCollections = () => request<Collection[]>("/collections");

export const createCheckout = (items: CheckoutItem[]) =>
  request<{ orderId: number; paymentUrl: string }>("/payments/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
