import { create } from "zustand";

interface StreamState {
  isStreaming: boolean;
  toggleStreaming: () => void;
  stopStreaming: () => void;
}

export const useStreamStore = create<StreamState>((set) => ({
  isStreaming: false,
  toggleStreaming: () => set((s) => ({ isStreaming: !s.isStreaming })),
  stopStreaming: () => set({ isStreaming: false }),
}));
