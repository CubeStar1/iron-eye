"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { useStreamStore } from "@/store/stream";
import { 
  Play, 
  Pause, 
  Square, 
  UploadCloud,
  Settings, 
  Camera, 
  Crosshair,
  Compass
} from "lucide-react";

export function ControlPanel() {
  const { isStreaming, toggleStreaming, stopStreaming } = useStreamStore();
  
  const [autoDetection, setAutoDetection] = useState(true);
  const [sensitivity, setSensitivity] = useState([75]);
  const [zoom, setZoom] = useState([100]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL!
    try {
      await fetch(`${url}/api/video/upload-image`, {
        method: "POST",
        body: formData,
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const controlButtons = [
    { 
      icon: isStreaming ? Pause : Play,
      label: isStreaming ? "Pause" : "Start",
      variant: (isStreaming ? "destructive" : "default") as "destructive" | "default",
      onClick: toggleStreaming
    },
    { 
      icon: Square,
      label: "Stop",
      variant: "outline" as "outline",
      onClick: stopStreaming
    },
    {
      icon: UploadCloud,
      label: "Upload",
      variant: "outline" as "outline",
      onClick: () => fileInputRef.current?.click(),
    },
    { 
      icon: Camera, 
      label: "Capture", 
      variant: "outline" as "outline",
      onClick: () => {}
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          Control Panel
          <Badge variant="outline" className={isStreaming ? "text-green-500 border-green-500/30" : "text-muted-foreground border-border"}>
            {isStreaming ? "Running" : "Standby"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main control buttons */}
        <div className="grid grid-cols-2 gap-2">
          {controlButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              onClick={button.onClick}
              className="flex items-center gap-2"
            >
              <button.icon className="w-4 h-4" />
              {button.label}
            </Button>
          ))}
        </div>

        {/* hidden file input for upload */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* System toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Auto Detection</label>
            <Switch
              checked={autoDetection}
              onCheckedChange={setAutoDetection}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Edge Enhancement</label>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">Thermal Overlay</label>
            <Switch defaultChecked />
          </div>
        </div>

        {/* Sensitivity control */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Detection Sensitivity</label>
            <span className="text-xs text-foreground">{sensitivity[0]}%</span>
          </div>
          <Slider
            value={sensitivity}
            onValueChange={setSensitivity}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Zoom control */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Zoom Level</label>
            <span className="text-xs text-foreground">{zoom[0]}%</span>
          </div>
          <Slider
            value={zoom}
            onValueChange={setZoom}
            min={50}
            max={500}
            step={10}
            className="w-full"
          />
        </div>

        {/* Quick actions */}
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2">Quick Actions</div>
          <div className="grid grid-cols-3 gap-1">
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-1">
              <Crosshair className="w-3 h-3" />
              <span className="text-xs">Center</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-1">
              <Compass className="w-3 h-3" />
              <span className="text-xs">Track</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-1">
              <Settings className="w-3 h-3" />
              <span className="text-xs">Config</span>
            </Button>
          </div>
        </div>

        {/* Status indicators */}
        <div className="pt-2 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <div className="text-muted-foreground">Frame Rate</div>
              <div className="text-foreground font-medium">30 FPS</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Resolution</div>
              <div className="text-foreground font-medium">4K</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
