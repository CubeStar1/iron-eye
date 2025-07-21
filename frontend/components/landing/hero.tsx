"use client";

import Spline from "@splinetool/react-spline";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { DetectionDashboard } from "./detection-dashboard";

export function Hero() {
  return (
    <>
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="container mx-auto flex min-h-screen items-center px-4 lg:px-8">
        {/* Left side - Text content */}
        <div className="z-10 flex w-full flex-col justify-center lg:w-1/2">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
              🛰️ Real-time EO/IR Fusion
            </span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Advanced{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              EO/IR Detection
            </span>{" "}
            Platform
          </h1>
          
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Leveraging lightweight fusion of RGB and IR streams for superior object classification on edge devices. Real-time insights from dual-camera systems.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/dashboard">
              <ShimmerButton
                className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
                background="linear-gradient(to right, #ef4444, #f97316)"
              >
                <span className="font-medium text-white">Go to Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </ShimmerButton>
            </Link>
            <Link 
              href="/chat" 
            >
              <ShimmerButton
                className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
                background="linear-gradient(to right, #f59e0b, #eab308)"
              >
                <span className="font-medium text-white">View Chat</span>
                <ArrowRight className="h-5 w-5" />
              </ShimmerButton>
            </Link>
          </div>
        </div>

        {/* Right side - Spline 3D scene and Dashboard */}
        {/* Right side - Spline 3D scene and Dashboard */}
        <div className="relative flex w-full flex-col items-center justify-center lg:w-1/2">
          {/* Second drone in the background - top left */}
          <div className="absolute -z-10 -top-20 -left-20 h-full w-full">
            {/* <Spline 
              scene="https://prod.spline.design/mWc4YHJf0DeRdG-O/scene.splinecode"
              style={{ 
                transform: 'scale(0.5) translate(-20%, -20%)',
                transformOrigin: 'top left'
              }}
            /> */}
          </div>
          
          {/* Main drone in the foreground */}
          <div className="relative z-0 h-auto w-full">
            <Spline scene="https://prod.spline.design/qUzwrPQb1zrgiUse/scene.splinecode" />
          </div>
          
          <div className="relative z-10 w-full max-w-3xl px-4 lg:px-0">
            <DetectionDashboard />
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent lg:hidden" />
      
      {/* Floating bounding boxes for visual effect */}
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[20%] top-[25%] h-16 w-20 animate-pulse border-2 border-red-400/60 bg-red-500/5">
          <div className="absolute -top-6 left-0 rounded bg-red-500 px-2 py-1 text-xs text-white">Vehicle 98%</div>
        </div>
        <div className="absolute right-[35%] top-[45%] h-12 w-8 animate-pulse border-2 border-blue-400/60 bg-blue-500/5 delay-300">
          <div className="absolute -top-6 left-0 rounded bg-blue-500 px-2 py-1 text-xs text-white">Person 94%</div>
        </div>
        <div className="absolute right-[15%] top-[60%] h-8 w-12 animate-pulse border-2 border-yellow-400/60 bg-yellow-500/5 delay-700">
          <div className="absolute -top-6 left-0 rounded bg-yellow-500 px-2 py-1 text-xs text-white">Object 87%</div>
        </div>
      </div> */}
    </section>
    </>
  );
}
