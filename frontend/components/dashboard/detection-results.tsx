"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Target, Zap, Shield, AlertTriangle, Loader2 } from "lucide-react";
import { useDetectionLogs } from "@/hooks/use-detection-logs";

interface Detection {
  id: string;
  type: "static" | "moving" | "thermal" | "hidden" | "environmental";
  object: string;
  confidence: number;
  timestamp: string;
  coordinates: { x: number; y: number };
}

export function DetectionResults() {
  const { logs: detectionLogs, error } = useDetectionLogs();
  
  // Map the detection logs to the expected format
  const detections = detectionLogs.slice(0, 10).map((log, index) => {
    // Map detection types based on label
    const typeMap = {
      person: 'moving',
      vehicle: 'moving',
      Tank: 'static',
      Smoke: 'environmental',
      Ship: 'moving',
      object: 'hidden'
    } as const;
    
    // Generate random coordinates for demonstration
    // In a real app, these would come from your detection data
    const coordinates = {
      x: Math.floor(Math.random() * 400),
      y: Math.floor(Math.random() * 300)
    };
    
    // Format the timestamp
    const date = new Date(log.created_at);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return {
      id: log.id || `detection-${index}`,
      type: typeMap[log.label] || 'static',
      object: log.label.charAt(0).toUpperCase() + log.label.slice(1),
      confidence: parseFloat(log.confidence.toFixed(1)),
      timestamp: `${hours}:${minutes}:${seconds}`,
      coordinates
    };
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "moving": return <Target className="w-4 h-4" />;
      case "static": return <Shield className="w-4 h-4" />;
      case "thermal": return <Zap className="w-4 h-4" />;
      case "hidden": return <Eye className="w-4 h-4" />;
      case "environmental": return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "moving": return "text-red-500 border-red-500/30";
      case "static": return "text-blue-500 border-blue-500/30";
      case "thermal": return "text-orange-500 border-orange-500/30";
      case "hidden": return "text-cyan-500 border-cyan-500/30";
      case "environmental": return "text-green-500 border-green-500/30";
      default: return "text-muted-foreground border-border";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-red-500">
          Error loading detection data: {error}
        </CardContent>
      </Card>
    );
  }

  if (detectionLogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <div className="flex flex-col items-center justify-center space-y-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <p>Loading detection data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          Detection Results
          <Badge variant="outline" className="text-blue-500 border-blue-500/30">
            {detectionLogs.length} Objects
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          <div className="space-y-3">
            {detections.map((detection) => (
              <div
                key={detection.id}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <div className={getTypeColor(detection.type).split(' ')[0]}>
                      {getTypeIcon(detection.type)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {detection.object}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Position: {detection.coordinates.x}, {detection.coordinates.y}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getConfidenceColor(detection.confidence)}`}>
                    {detection.confidence}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {detection.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Summary stats */}
        <div className="mt-2 pt-2 border-t border-border">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-bold text-green-500">
                {detections.filter(d => d.confidence >= 90).length}
              </div>
              <div className="text-xs text-muted-foreground">High</div>
            </div>
            <div>
              <div className="text-sm font-bold text-yellow-500">
                {detections.filter(d => d.confidence >= 75 && d.confidence < 90).length}
              </div>
              <div className="text-xs text-muted-foreground">Medium</div>
            </div>
            <div>
              <div className="text-sm font-bold text-red-500">
                {detections.filter(d => d.confidence < 75).length}
              </div>
              <div className="text-xs text-muted-foreground">Low</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
