"use client";

import SummaryCard from './summary-card';
import AnalyticsLineChart from "./confidence-line-chart";
import { DetectionPieChart } from "./detection-pie-chart";
import { DistributionBarChart } from "./distribution-bar-chart";
import { useDetectionLogs } from '@/hooks/use-detection-logs';
import { useMemo } from 'react';
import { Eye, Users, Car, Package, AlertTriangle } from 'lucide-react';
import { unifiedChartConfig, dashboardCardStyles } from './chart-config';

export function AnalyticsDashboard() {
  const { logs, error } = useDetectionLogs();

  const stats = useMemo(() => {
    if (!logs.length) {
      return {
        totalDetections: 0,
        vehicleCount: 0,
        personCount: 0,
        objectCount: 0,
      };
    }

    return {
      totalDetections: logs.length,
      vehicleCount: logs.filter(log => log.label === 'vehicle').length,
      personCount: logs.filter(log => log.label === 'person').length,
      objectCount: logs.filter(log => log.label === 'object').length,
      tankCount: logs.filter(log => log.label === 'Tank').length,
      smokeCount: logs.filter(log => log.label === 'Smoke').length,
      navalCount: logs.filter(log => log.label === 'Ship').length,

    };
  }, [logs]);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center text-red-500">
        <AlertTriangle className="mr-2 h-6 w-6" />
        <p>Error loading analytics: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Detections" 
          value={stats.totalDetections.toString()} 
          description="Total objects detected in session" 
          icon={<Eye />} 
          cardClassName={dashboardCardStyles[0].bg}
        />
        <SummaryCard 
          title="Vehicles" 
          value={stats.vehicleCount.toString()} 
          description="Total vehicles detected" 
          icon={<Car />} 
          cardClassName={dashboardCardStyles[1].bg}
        />
        <SummaryCard 
          title="People" 
          value={stats.personCount.toString()} 
          description="Total people detected" 
          icon={<Users />} 
          cardClassName={dashboardCardStyles[2].bg}
        />
        <SummaryCard 
          title="Objects" 
          value={stats.objectCount.toString()} 
          description="Other miscellaneous objects" 
          icon={<Package />} 
          cardClassName={dashboardCardStyles[3].bg}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <AnalyticsLineChart data={logs} chartConfig={unifiedChartConfig} />
        </div>
        <div className="lg:col-span-1">
          <DetectionPieChart data={logs} chartConfig={unifiedChartConfig} />
        </div>
        <div className="lg:col-span-2">
          <DistributionBarChart data={logs} chartConfig={unifiedChartConfig} />
        </div>
      </div>
    </div>
  );
}
