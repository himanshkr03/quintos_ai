// services/storage.ts

export const storageService = {
  set(key: string, value: unknown): boolean {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Failed to set storage key "${key}":`, error);
      return false;
    }
  },

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to get storage key "${key}":`, error);
      return null;
    }
  },

  remove(key: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove storage key "${key}":`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === "undefined") return false;
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error("Failed to clear storage:", error);
      return false;
    }
  },
};