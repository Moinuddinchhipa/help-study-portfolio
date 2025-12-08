// stores/useUsersStore.js
import { create } from "zustand";
import api from "../lib/api"; // your API helper

export const useUsersStore = create((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},

  fetchUsers: async ({ limit = 10, skip = 0, q = "" } = {}) => {
    const key = `${limit}_${skip}_${q}`;
    const cached = get().cache[key];
    if (cached) {
      set({ users: cached.users, total: cached.total });
      return;
    }
    set({ loading: true, error: null });
    try {
      const url = q
        ? `/users/search?q=${encodeURIComponent(q)}`
        : `/users?limit=${limit}&skip=${skip}`;
      const res = await api.get(url);
      const users = res.data.users || res.data;
      const total = res.data.total || users.length;
      set((state) => ({
        users,
        total,
        loading: false,
        cache: { ...state.cache, [key]: { users, total } },
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchUserById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/users/${id}`);
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
