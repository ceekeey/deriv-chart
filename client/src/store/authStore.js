import { create } from "zustand";
import apiClient from "../api/axios";

const getErrorMessage = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong. Please try again.";

  return typeof message === "string" && message.trim().length > 0
    ? message
    : "Something went wrong. Please try again.";
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  clearError: () => set({ error: null }),

  initialize: async () => {
    const { fetchCurrentUser } = useAuthStore.getState();
    return fetchCurrentUser();
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await apiClient.get("/auth/me");
      const user = data?.data?.user ?? null;

      set({
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
        error: null,
      });

      return user;
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      return null;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await apiClient.post("/auth/login", credentials);
      const user = data?.data?.user ?? null;

      set({
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        isLoading: false,
        error: message,
        isAuthenticated: false,
        user: null,
      });
      const wrappedError = new Error(message);
      wrappedError.cause = error;
      throw wrappedError;
    }
  },

  register: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await apiClient.post("/auth/register", credentials);
      const user = data?.data?.user ?? null;

      set({
        user,
        isAuthenticated: Boolean(user),
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      const message = getErrorMessage(error);
      set({
        isLoading: false,
        error: message,
        isAuthenticated: false,
        user: null,
      });
      const wrappedError = new Error(message);
      wrappedError.cause = error;
      throw wrappedError;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });

    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
}));

export default useAuthStore;
