"use client";

import { useMemo } from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Detection } from '@/hooks/use-detection-logs';

interface AnalyticsChartProps {
  data: Detection[];
  chartConfig: ChartConfig;
}

const fallbackColors: Record<string, string> = {
  person: '#e11d48', // rose-600
  vehicle: '#2563eb', // blue-600
  tank: '#10b981',   // emerald-500
  smoke: '#f59e0b',  // amber-500
  naval: '#7c3aed',  // violet-600
  object: '#f43f5e', // pink-500
};

export const AnalyticsLineChart: React.FC<AnalyticsChartProps> = ({ data, chartConfig }) => {
  const chartData = useMemo(() => {
    const keys = Object.keys(chartConfig).filter(k => k !== 'count');
    return data.map(log => {
      const entry: any = {
        ...log,
        timestamp: new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      const labelNorm = log.label.toLowerCase();
      keys.forEach(k => {
        entry[k] = labelNorm === k.toLowerCase() ? log.confidence * 100 : null;
      });
      return entry;
    });

  }, [data, chartConfig]);

  return (
    <Card className="shadow-lg col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Real-time Detection Confidence</CardTitle>
      </CardHeader>
      <CardContent className=" w-full p-2">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend />
            {Object.entries(chartConfig).filter(([k])=>k!=='count').map(([key, cfg])=> (
              <Line key={key}
                dataKey={key}
                type="monotone"
                stroke={fallbackColors[key] ?? cfg.color ?? '#000'}
                strokeWidth={2}
                dot={false}
                name={cfg.label?.toString()}
                connectNulls
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsLineChart;
