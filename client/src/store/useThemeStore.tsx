import { create } from "zustand";

type themeStore = {
  theme: string;
  setTheme: (e: string) => void;
};

export const useThemeStore = create<themeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",

  setTheme: (theme: string) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
