import { create } from "zustand";

export type StreamMode = "IMAGE" | "VIDEO" | "LIVE";

interface StreamModeState {
  mode: StreamMode;
  setMode: (mode: StreamMode) => void;
}

export const useStreamModeStore = create<StreamModeState>((set) => ({
  mode: "VIDEO",
  setMode: (mode) => set({ mode }),
}));
