"use client";

import { FeedType, useFeedStore } from "@/store/feed";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const feeds: FeedType[] = ["RGB", "IR", "FUSED"];

export function FeedToggle() {
  const { feed, setFeed } = useFeedStore();

  return (
    <ToggleGroup
      type="single"
      value={feed}
      onValueChange={(val) => {
        if (val) setFeed(val as FeedType);
      }}
      className="flex gap-2"
    >
      {feeds.map((f) => (
        <ToggleGroupItem key={f} value={f} aria-label={f}>
          {f}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
