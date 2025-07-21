"use client"

import { ArrowRight, ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { cn } from "@/lib/utils"

const auroraColors = ["#38bdf8", "#0070F3", "#2dd4bf", "#7928CA", "#FF0080", "#a855f7"]

export function Hero() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="group relative mx-auto flex justify-center">
        <BlurFade delay={0.25} inView>
          <Link
            href="#"
            className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>🛰️ Real-time EO/IR Fusion</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </Link>
        </BlurFade>
      </div>

      <div className="mt-10 text-center">
        <BlurFade delay={0.5} inView>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Advanced{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">EO/IR Object Detection</span>{" "}
            & Analysis Platform
          </h1>
        </BlurFade>
        <BlurFade delay={0.75} inView>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:mt-8">
            Leveraging lightweight fusion of RGB and IR streams for superior object classification on edge devices. Real-time insights from dual-camera systems.
          </p>
        </BlurFade>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
        <BlurFade delay={1.0} inView>
          <Link href="/dashboard">
            <ShimmerButton
              className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
              background="linear-gradient(to right, #ef4444, #f97316)"
            >
              <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                Go to Dashboard
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
            </ShimmerButton>
          </Link>
        </BlurFade>
        <BlurFade delay={1.25} inView>
          <Link href="/history">
            <div>
              <ShimmerButton
                className="flex items-center gap-2 px-6 py-3 text-base sm:text-lg"
                background="linear-gradient(to right, #334155, #0f172a)"
              >
                <span className="whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white">
                  View History
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 sm:w-5 sm:h-5" />
              </ShimmerButton>
            </div>
          </Link>
        </BlurFade>
      </div>

      <div className="relative mx-auto mt-16 sm:mt-20 lg:mt-24">
        <BlurFade delay={1.5} inView>
          <div className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80">
            {/* TODO: Replace with a relevant image for the YOLO object detection app */}
            <Image
              src="/landing/pp-dashboard.png" // Example: /landing/yolo-detection-interface.png
              alt="PlantPatrol Dashboard"
              width={1200}
              height={800}
              quality={100}
              className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
            />
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </BlurFade>
      </div>
    </section>
  )
}