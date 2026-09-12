import { create } from 'zustand'

const useWatchlistStore = create((set) => ({
  watchlists: [], activeWatchlist: null,
  setWatchlists: (watchlists) => set({ watchlists }),
  setActiveWatchlist: (activeWatchlist) => set({ activeWatchlist }),
  addWatchlist: (watchlist) => set((state) => ({ watchlists: [...state.watchlists, watchlist] })),
}))

export default useWatchlistStore
