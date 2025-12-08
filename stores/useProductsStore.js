// stores/useProductsStore.js
import { create } from "zustand"; // ✅ named import
import api from "../lib/api";

export const useProductsStore = create((set, get) => ({
  products: [],
  total: 0,
  categories: [],
  loading: false,
  error: null,
  cache: {},

  fetchCategories: async () => {
    try {
      const res = await api.get("/products/categories");
      set({ categories: res.data });
    } catch (err) {
      set({ error: err.message });
    }
  },

  fetchProducts: async ({
    limit = 10,
    skip = 0,
    q = "",
    category = "",
  } = {}) => {
    const key = `${limit}_${skip}_${q}_${category}`;
    const cached = get().cache[key];
    if (cached) {
      set({ products: cached.products, total: cached.total });
      return;
    }
    set({ loading: true, error: null });
    try {
      let url;
      if (q) url = `/products/search?q=${encodeURIComponent(q)}`;
      else if (category)
        url = `/products/category/${encodeURIComponent(
          category
        )}?limit=${limit}&skip=${skip}`;
      else url = `/products?limit=${limit}&skip=${skip}`;

      const res = await api.get(url);
      const products = res.data.products || res.data;
      const total = res.data.total || products.length;
      set((state) => ({
        products,
        total,
        loading: false,
        cache: { ...state.cache, [key]: { products, total } },
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/products/${id}`);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
