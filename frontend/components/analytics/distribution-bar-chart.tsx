"use client";

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from 'react';
import { Detection } from '@/hooks/use-detection-logs';

interface DistributionBarChartProps {
  data: Detection[];
  chartConfig: ChartConfig;
}



export const DistributionBarChart: React.FC<DistributionBarChartProps> = ({ data, chartConfig }) => {
  const chartData = useMemo(() => {
    const counts = data.reduce((acc, log) => {
      acc[log.label] = (acc[log.label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      count: value,
      fill: `var(--color-${name})`
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Frequency</CardTitle>
        <CardDescription>Count of each object type detected.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const config = chartConfig[value as keyof typeof chartConfig];
                if (config && typeof config.label === 'string') {
                  return config.label;
                }
                return value;
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
