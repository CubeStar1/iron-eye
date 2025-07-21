"use client";

import { useStreamStore } from "@/store/stream";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi } from "lucide-react";

export function OnlineIndicator() {
  const { isStreaming } = useStreamStore();
  return (
    <div className="flex items-center gap-2 select-none">
      {isStreaming ? (
        <>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute" />
          <div className="w-3 h-3 rounded-full bg-green-500 relative" />
          <span className="text-sm text-green-500 font-medium flex items-center gap-1">
            <Wifi className="w-4 h-4" /> Online
          </span>
        </>
      ) : (
        <>
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-sm text-gray-400 font-medium flex items-center gap-1">
            <WifiOff className="w-4 h-4" /> Offline
          </span>
        </>
      )}
      <Badge variant="outline" className="ml-2 text-xs px-2 py-0.5">
        {isStreaming ? "Streaming" : "Idle"}
      </Badge>
    </div>
  );
}
