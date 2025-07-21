"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Settings, Eye, EyeOff } from "lucide-react";

export function EdgeDetectionVisualization() {
  const [threshold, setThreshold] = useState([50]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [edgeMethod, setEdgeMethod] = useState("canny");

  const edgeMethods = [
    { id: "canny", name: "Canny", active: true },
    { id: "sobel", name: "Sobel", active: false },
    { id: "gradient", name: "Gradient", active: false }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          Edge Detection
          <Badge variant="outline" className="text-blue-500 border-blue-500/30">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Edge detection preview */}
        <div className="aspect-video bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg relative overflow-hidden border border-border">
          {/* Simulated edge detection overlay */}
          <div className="absolute inset-0 opacity-70">
            <svg className="w-full h-full" viewBox="0 0 400 225">
              {/* Simulated edge lines with consistent colors */}
              <path
                d="M50,50 L150,50 L150,100 L250,100 L250,150 L350,150"
                stroke="hsl(var(--color-3))"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M100,75 L200,75 L200,125 L300,125"
                stroke="hsl(var(--color-4))"
                strokeWidth="1.5"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M75,175 L175,175 L175,200 L275,200"
                stroke="hsl(var(--color-5))"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>
          
          {/* Center indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">Processing</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">RGB → IR Fusion</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Edge detection method */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Detection Method</label>
            <div className="flex gap-2">
              {edgeMethods.map((method) => (
                <Button
                  key={method.id}
                  variant={edgeMethod === method.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEdgeMethod(method.id)}
                  className={
                    edgeMethod === method.id
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }
                >
                  {method.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Threshold control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-foreground">Edge Threshold</label>
              <span className="text-sm font-medium text-blue-500">{threshold[0]}%</span>
            </div>
            <Slider
              value={threshold}
              onValueChange={setThreshold}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Overlay toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-sm text-foreground">Show Overlay</label>
              {showOverlay ? (
                <Eye className="w-4 h-4 text-blue-500" />
              ) : (
                <EyeOff className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <Switch
              checked={showOverlay}
              onCheckedChange={setShowOverlay}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-muted/30 border border-border">
              <div className="text-2xl font-bold text-blue-500">1,247</div>
              <div className="text-xs text-muted-foreground mt-1">Edges Detected</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30 border border-border">
              <div className="text-2xl font-bold text-green-500">8.3ms</div>
              <div className="text-xs text-muted-foreground mt-1">Processing Time</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
