import create from "zustand";

interface CurrentPage {
  currentPage: number;
  lastPage: number;
  inc: () => void;
  dev: () => void;
  setLastPage: (lastPage: number) => void;
  setCurrentPage: (currentPage: number) => void;
}

export const usePageNation = create<CurrentPage>((set) => ({
  lastPage: 1,
  currentPage: 1,
  inc: () => set(({ currentPage }) => ({ currentPage: currentPage + 1 })),
  dev: () => set(({ currentPage }) => ({ currentPage: currentPage - 1 })),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  setLastPage: (lastPage: number) => set({ lastPage }),
}));
