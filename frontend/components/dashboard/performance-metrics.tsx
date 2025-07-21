"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Zap, Database } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  unit: string;
  target: number;
  icon: React.ReactNode;
  status: "good" | "warning" | "critical";
}

export function PerformanceMetrics() {
  const metrics: Metric[] = [
    {
      label: "Inference Speed",
      value: 28.5,
      unit: "ms",
      target: 30,
      icon: <Zap className="w-4 h-4" />,
      status: "good"
    },
    {
      label: "Data Throughput",
      value: 45.2,
      unit: "MB/s",
      target: 50,
      icon: <Activity className="w-4 h-4" />,
      status: "warning"
    },
    {
      label: "Processing Latency",
      value: 12.8,
      unit: "ms",
      target: 15,
      icon: <Clock className="w-4 h-4" />,
      status: "good"
    },
    {
      label: "Database Write Speed",
      value: 156,
      unit: "ops/s",
      target: 200,
      icon: <Database className="w-4 h-4" />,
      status: "warning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const calculatePercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          Performance
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            Optimal
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-1">
                <div className={getStatusColor(metric.status)}>
                  {metric.icon}
                </div>
                <span className="text-xs text-muted-foreground truncate">{metric.label}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">
                    {metric.value}{metric.unit}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(calculatePercentage(metric.value, metric.target))}%
                  </span>
                </div>
                <Progress 
                  value={calculatePercentage(metric.value, metric.target)} 
                  className="h-1"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Overall system performance */}
        <div className="pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <div>
              <div className="text-2xl font-bold text-green-500">92%</div>
              <div className="text-xs text-muted-foreground">Overall Performance</div>
            </div>
            <Progress value={92} className="h-2" />
            
            {/* Performance summary */}
            <div className="flex justify-between text-xs pt-2">
              <div className="text-center">
                <div className="text-muted-foreground">Avg Time</div>
                <div className="text-green-500 font-medium">18.2ms</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Success</div>
                <div className="text-green-500 font-medium">99.7%</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
