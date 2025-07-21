"use client";

import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from 'react';
import { Detection } from '@/hooks/use-detection-logs';

interface DetectionPieChartProps {
  data: Detection[];
  chartConfig: ChartConfig;
}

const fallbackColors: Record<string, string> = {
  person: '#e11d48',
  vehicle: '#2563eb',
  tank: '#10b981',
  smoke: '#f59e0b',
  naval: '#7c3aed',
  ship: '#7c3aed',
  object: '#f43f5e',
};

export const DetectionPieChart: React.FC<DetectionPieChartProps> = ({ data, chartConfig }) => {
  const chartData = useMemo(() => {
    const counts = data.reduce((acc, log) => {
      const labelKey = log.label.toLowerCase();
      acc[labelKey] = (acc[labelKey] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      count: value,
      fill: fallbackColors[name] ?? (chartConfig[name]?.color ?? '#000')
    }));
  }, [data]);

  const totalDetections = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Detection Distribution</CardTitle>
        <CardDescription>Distribution of detected objects.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="name" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalDetections.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Detections
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
