import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      profile: {
        name: "",
        phone: "",
        note: "",
      },

      setProfile: (profile) =>
        set({
          profile,
        }),

      favorites: [],

      toggleFavorite: (doctor) =>
        set((state) => {
          const isFavorite = state.favorites.some(
            (item) => item.id === doctor.id,
          );

          return {
            favorites: isFavorite
              ? state.favorites.filter((item) => item.id !== doctor.id)
              : [...state.favorites, doctor],
          };
        }),

      darkMode: false,

      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
    }),
    {
      name: "medicare-storage",
    },
  ),
);

export default useAppStore;
