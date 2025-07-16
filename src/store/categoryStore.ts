import { create } from "zustand";

type CategoryState = {
  selectedCategory: string;
  setCategory: (category: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: "",
  setCategory: (category) => set({ selectedCategory: category }),
}));
