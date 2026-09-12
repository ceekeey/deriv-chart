import { create } from 'zustand'

const useChartStore = create((set) => ({
  symbol: 'R_100', timeframe: '1m', drawings: [], indicators: [], chartSettings: {}, isDirty: false, syncStatus: 'synced',
  setSymbol: (symbol) => set({ symbol, isDirty: true }),
  setTimeframe: (timeframe) => set({ timeframe, isDirty: true }),
  addDrawing: (drawing) => set((state) => ({ drawings: [...state.drawings, drawing], isDirty: true })),
  updateDrawing: (id, updates) => set((state) => ({ drawings: state.drawings.map((item) => item.id === id ? { ...item, ...updates } : item), isDirty: true })),
  removeDrawing: (id) => set((state) => ({ drawings: state.drawings.filter((item) => item.id !== id), isDirty: true })),
  addIndicator: (indicator) => set((state) => ({ indicators: [...state.indicators, indicator], isDirty: true })),
  updateIndicator: (id, updates) => set((state) => ({ indicators: state.indicators.map((item) => item.id === id ? { ...item, ...updates } : item), isDirty: true })),
  removeIndicator: (id) => set((state) => ({ indicators: state.indicators.filter((item) => item.id !== id), isDirty: true })),
  markDirty: () => set({ isDirty: true, syncStatus: 'pending' }),
  markSynced: () => set({ isDirty: false, syncStatus: 'synced' }),
}))

export default useChartStore
