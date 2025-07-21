"use client";

import { cn } from "@/lib/utils";

interface DetectionCardProps {
  label: string;
  percentage: number;
  confidence: string;
  color: string;
}

export function DetectionCard({ label, percentage, confidence, color }: DetectionCardProps) {
  const colorClasses = {
    red: {
      border: "border-red-200 dark:border-red-400/30",
      bg: "bg-red-50/50 dark:bg-red-500/10",
      text: "text-red-700 dark:text-red-300",
      percentText: "text-red-800 dark:text-red-200",
      progressBg: "bg-red-200 dark:bg-red-900/50",
      progressFill: "bg-red-500 dark:bg-red-400",
      confidenceText: "text-red-600 dark:text-red-300/70",
    },
    blue: {
      border: "border-blue-200 dark:border-blue-400/30",
      bg: "bg-blue-50/50 dark:bg-blue-500/10",
      text: "text-blue-700 dark:text-blue-300",
      percentText: "text-blue-800 dark:text-blue-200",
      progressBg: "bg-blue-200 dark:bg-blue-900/50",
      progressFill: "bg-blue-500 dark:bg-blue-400",
      confidenceText: "text-blue-600 dark:text-blue-300/70",
    },
    yellow: {
      border: "border-yellow-200 dark:border-yellow-400/30",
      bg: "bg-yellow-50/50 dark:bg-yellow-500/10",
      text: "text-yellow-700 dark:text-yellow-300",
      percentText: "text-yellow-800 dark:text-yellow-200",
      progressBg: "bg-yellow-200 dark:bg-yellow-900/50",
      progressFill: "bg-yellow-500 dark:bg-yellow-400",
      confidenceText: "text-yellow-600 dark:text-yellow-300/70",
    },
    green: {
      border: "border-green-200 dark:border-green-400/30",
      bg: "bg-green-50/50 dark:bg-green-500/10",
      text: "text-green-700 dark:text-green-300",
      percentText: "text-green-800 dark:text-green-200",
      progressBg: "bg-green-200 dark:bg-green-900/50",
      progressFill: "bg-green-500 dark:bg-green-400",
      confidenceText: "text-green-600 dark:text-green-300/70",
    },
  };

  const c = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className={cn("rounded-lg p-3 sm:p-4", c.border, c.bg)}>
      <span className={cn("text-xs font-semibold uppercase tracking-wider sm:text-sm", c.text)}>{label}</span>
      <div className="mt-2 flex items-center gap-2">
        <div className={cn("h-2 flex-1 rounded-full", c.progressBg)}>
          <div 
            className={cn("h-full rounded-full transition-all duration-500", c.progressFill)}
            style={{ width: label === 'FPS' ? '100%' : `${percentage}%` }}
          ></div>
        </div>
        <div className="w-12 text-right">
          <span className={cn("text-sm font-bold sm:text-base", c.percentText)}>
            {percentage}{label !== 'FPS' && '%'}
          </span>
        </div>
      </div>
      <div className={cn("mt-2 text-xs", c.confidenceText)}>{confidence}</div>
    </div>
  );
}
