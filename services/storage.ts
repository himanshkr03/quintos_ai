// services/storage.ts

export const storageService = {
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (!item) return null;

    return JSON.parse(item) as T;
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};