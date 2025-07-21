"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cpu, HardDrive, Wifi, Battery, Thermometer } from "lucide-react";

interface SystemMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: "good" | "warning" | "critical";
  icon: React.ReactNode;
}

export function SystemStatus() {
  const metrics: SystemMetric[] = [
    {
      label: "CPU Usage",
      value: 45,
      unit: "%",
      status: "good",
      icon: <Cpu className="w-4 h-4" />
    },
    {
      label: "Memory",
      value: 68,
      unit: "%",
      status: "warning",
      icon: <HardDrive className="w-4 h-4" />
    },
    {
      label: "Network",
      value: "Connected",
      status: "good",
      icon: <Wifi className="w-4 h-4" />
    },
    {
      label: "Battery",
      value: 90,
      unit: "%",
      status: "good",
      icon: <Battery className="w-4 h-4" />
    },
    {
      label: "Temperature",
      value: 42,
      unit: "°C",
      status: "good",
      icon: <Thermometer className="w-4 h-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          System Status
          <Badge variant="outline" className="text-green-500 border-green-500/30">
            Online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1">
                <div className={getStatusColor(metric.status)}>
                  {metric.icon}
                </div>
                <span className="text-xs text-muted-foreground truncate">{metric.label}</span>
              </div>
              {typeof metric.value === "number" && metric.unit === "%" ? (
                <div className="space-y-1">
                  <Progress 
                    value={metric.value} 
                    className="h-1" 
                  />
                  <span className="text-xs text-foreground font-medium">
                    {metric.value}{metric.unit}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-foreground font-medium">
                  {metric.value}{metric.unit || ""}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Additional system info */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between text-xs">
            <div className="text-center">
              <div className="text-muted-foreground">Uptime</div>
              <div className="text-foreground font-medium">2h 34m</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Model</div>
              <div className="text-foreground font-medium">EO/IR-3200</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
