import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUserProfile() {
      try {
        const response = await axios.get("/api/user/profile");
        this.user = response.data;
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
    logout() {
      this.user = null;
      axios.post("/api/user/logout").then(() => {
        console.log("Çıkış yapıldı.");
      });
    },
  },
});
