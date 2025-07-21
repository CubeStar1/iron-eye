"use client";

import { VideoStream } from "@/components/dashboard/video-stream";

import { StreamModeToggle } from "@/components/dashboard/stream-mode-toggle";

import { SystemStatus } from "@/components/dashboard/system-status";
import { DetectionResults } from "@/components/dashboard/detection-results";
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics";
import { EdgeDetectionVisualization } from "@/components/dashboard/edge-detection-viz";
import { ControlPanel } from "@/components/dashboard/control-panel";
import { OnlineIndicator } from "@/components/dashboard/online-indicator";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EO/IR Camera System</h1>
          <p className="text-muted-foreground mt-1">Real-time Object Detection & Classification Dashboard</p>
        </div>
        <StreamModeToggle />
        
        <OnlineIndicator />
      </div>

      {/* Main layout - Improved organization */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left side - Main video feed */}
        <div className="xl:col-span-8 space-y-6">
          {/* Main video feed */}
          {/* Main video feed */}
          <VideoStream 
            title="Primary Stream"
            streamType="FUSED"
            isRecording={true}
            resolution="1920x1080"
            fps={30}
            className="aspect-video"
          />
          
          {/* Bottom row - Detection and Edge Detection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <DetectionResults />
              <PerformanceMetrics />
            </div>
            <EdgeDetectionVisualization />
          </div>
        </div>

        {/* Right side - Compact panels */}
        <div className="xl:col-span-4 space-y-6">
          {/* RGB and IR feeds */}
          <div className="space-y-4">
            <VideoStream 
              title="IR Camera Feed"
              streamType="RGB"
              isRecording={true}
              resolution="1920x1080"
              fps={30}
              className="aspect-video"
            />
            <VideoStream 
              title="IR Camera Edge Detection"
              streamType="IR"
              isRecording={true}
              resolution="1280x720"
              fps={30}
              className="aspect-video"
            />
          </div>
          
          {/* Control Panel */}
          <ControlPanel />
        </div>
      </div>
    </div>
  );
}
