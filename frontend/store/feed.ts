import { create } from "zustand";

export type FeedType = "RGB" | "IR" | "FUSED";

interface FeedState {
  feed: FeedType;
  setFeed: (feed: FeedType) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  feed: "FUSED",
  setFeed: (feed) => set({ feed }),
}));
