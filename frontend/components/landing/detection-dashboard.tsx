"use client";

import { DetectionCard } from "./detection-card";

export function DetectionDashboard() {
  return (
    <div className="w-full py-4">
      <div className="rounded-xl border border-border bg-card/50 p-4 shadow-lg backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
            <h3 className="text-lg font-semibold text-foreground">Live Detection Dashboard</h3>
            <span className="ml-auto rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600 dark:bg-green-500/20 dark:text-green-400">
              Active
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetectionCard label="VEHICLE" percentage={98.7} confidence="High confidence" color="red" />
            <DetectionCard label="PERSON" percentage={94.2} confidence="High confidence" color="blue" />
            <DetectionCard label="OBJECT" percentage={87.5} confidence="Good confidence" color="yellow" />
            <DetectionCard label="FPS" percentage={30.0} confidence="RGB + IR Fusion" color="green" />
          </div>
      </div>
    </div>
  );
}
