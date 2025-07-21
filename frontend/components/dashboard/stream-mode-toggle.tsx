"use client";

import { useStreamModeStore, StreamMode } from "@/store/stream-mode";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const modes: { label: string; value: StreamMode }[] = [
  { label: "Image", value: "IMAGE" },
  { label: "Video", value: "VIDEO" },
  { label: "Live", value: "LIVE" },
];

export function StreamModeToggle() {
  const { mode, setMode } = useStreamModeStore();

  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(val) => val && setMode(val as StreamMode)}
      className="flex gap-2"
    >
      {modes.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          {label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
