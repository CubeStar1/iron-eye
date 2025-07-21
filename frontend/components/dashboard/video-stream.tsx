"use client";

import { useState, useEffect, useRef } from "react";
import { useStreamStore } from "@/store/stream";
import { useStreamModeStore } from "@/store/stream-mode";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Settings } from "lucide-react";

interface VideoStreamProps {
  title: string;
  streamType: "RGB" | "IR" | "FUSED";
  isRecording?: boolean;
  resolution?: string;
  fps?: number;
  className?: string;
}

export function VideoStream({
  title,
  streamType,
  isRecording = false,
  resolution = "1920x1080",
  fps = 30,
  className = "",
}: VideoStreamProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { isStreaming } = useStreamStore();
  const { mode } = useStreamModeStore();
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

  const streamUrl = `${baseUrl}/api/video/stream/${streamType}?mode=${mode.toLowerCase()}`;

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState("00:00");

  /* play / pause by swapping img src */
  useEffect(() => {
    if (!imgRef.current) return;
    if (isStreaming && isPlaying) {
      imgRef.current.src = streamUrl;
    } else {
      imgRef.current.removeAttribute("src");
    }
  }, [isStreaming, isPlaying, streamUrl]);

  /* record clock */
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.getMinutes().toString().padStart(2, "0")}:${now
          .getSeconds()
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const streamColor = {
    RGB: "bg-green-500",
    IR: "bg-red-500",
    FUSED: "bg-blue-500",
  }[streamType];

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* header */}
      <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`${streamColor} text-white`}>
            {streamType}
          </Badge>
          {isRecording && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-white">{currentTime}</span>
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* video area */}
      <div className="aspect-video bg-muted/50 relative overflow-hidden">
        {/* placeholder */}
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/50">
            Click START to stream
          </div>
        )}

        {/* unified MJPEG stream */}
        <img
          ref={imgRef}
          alt="stream"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* overlay info */}
        <div className="absolute bottom-12 left-4 text-white drop-shadow-lg">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-xs">
            {resolution} • {fps} FPS
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <Square className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Level: {streamType === "IR" ? "Auto" : "Manual"}
        </div>
      </div>
    </Card>
  );
}