import { Product } from "../types/types";

export const fetchData = async (
  url: string,
  limit: number
): Promise<{ data: Product[]; loading: boolean }> => {
  let loading = true;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const products: Product[] = data.products.slice(0, limit);
    loading = false;

    return { data: products, loading };
  } catch (error) {
    console.error("Error fetching data:", error);
    loading = false;
    return { data: [], loading };
  }
};
