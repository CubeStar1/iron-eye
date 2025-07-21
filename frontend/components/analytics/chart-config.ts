"use client";

import { ChartConfig } from '@/components/ui/chart';

export const unifiedChartConfig = {
  person: { label: 'Person', color: 'hsl(var(--chart-1))' },
  vehicle: { label: 'Vehicle', color: 'hsl(var(--chart-2))' },
  tank:   { label: 'Tank',   color: 'hsl(var(--chart-3))' },
  smoke:  { label: 'Smoke',  color: 'hsl(var(--chart-4))' },
  naval:  { label: 'Naval',  color: 'hsl(var(--chart-5))' },
  object: { label: 'Object', color: 'hsl(var(--chart-6))' },
  count:  { label: 'Detections' },
} satisfies ChartConfig;

export const dashboardCardStyles = [
  { bg: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" },
  { bg: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" },
  { bg: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" },
  { bg: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" },
];
