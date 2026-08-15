// services/auth.ts

export const authService = {
  async login(email: string, password: string) {
    console.log("Login:", email, password);
  },

  async register(data: unknown) {
    console.log("Register:", data);
  },

  async logout() {
    console.log("Logout");
  },
};