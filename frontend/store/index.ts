import { create } from "zustand";

interface IExploreStore {
  activeFilter: string;
  selectedStorage: number | null;
  setSelectedStorage: (storage: number | null) => void;
  removeSelectedStorage: () => void;
  updateFilter: (filter: string) => void;
}

export const useExploreStore = create<IExploreStore>((set) => ({
  activeFilter: "all",
  selectedStorage: null,
  setSelectedStorage: (storage) => set({ selectedStorage: storage }),
  removeSelectedStorage: () => set({ selectedStorage: null }),
  updateFilter: (filter) => set({ activeFilter: filter }),
}));
