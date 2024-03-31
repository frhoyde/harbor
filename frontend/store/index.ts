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
  setSelectedStorage: (storageID) => set({ selectedStorage: storageID }),
  removeSelectedStorage: () => set({ selectedStorage: null }),
  updateFilter: (filter) => set({ activeFilter: filter }),
}));
