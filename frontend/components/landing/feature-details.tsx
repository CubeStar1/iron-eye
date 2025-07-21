import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const features = [
  {
    title: "Dual-Stream Data Ingestion",
    description: "Our system establishes a synchronized, real-time video feed from EO/IR cameras, capturing both RGB and IR modalities simultaneously for comprehensive data collection.",
    image: "/ironeye-dashboard.png",
    darkImage: "/ironeye-dashboard.png",
    alt: "Dual video stream processing with RGB and IR feeds",
  },
  {
    title: "Lightweight Edge-Enhanced Fusion",
    description: "We apply edge detection to the RGB stream and perform a lightweight fusion onto the IR feed. This enhances object contrast and detail, preparing the data for accurate classification with a single input.",
    image: "/images/ironeye-person.jpeg",
    darkImage: "/images/ironeye-person.jpeg",
    alt: "Visualization of edge detection and fusion process",
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "Monitor the entire system through a live dashboard. View dual video streams, object detection overlays, performance metrics, and classification results, all in one place.",
    image: "/images/ironeye-analytics.jpeg",
    darkImage: "/images/ironeye-analytics.jpeg",
    alt: "Dashboard displaying EO/IR analytics and performance metrics",
  },
  {
    title: "Real-time Chat with MCP Controlled Simulation Streaming",
    description: "Chat interface with MCP controlled simulation streaming.",
    image: "/images/ironeye-chat.jpeg",
  darkImage: "/images/ironeye-chat.jpeg",
    alt: "Chat interface with MCP controlled simulation streaming",
  },
]

export function FeatureDetails() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          How Our EO/IR System{" "}
          <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Works
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          From synchronized data ingestion to lightweight fusion and real-time analysis, see how our platform delivers superior object detection on edge devices.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-16 sm:gap-24">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col gap-8 lg:items-center ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <button className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Image */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80"
              >
                <div className="block dark:hidden">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={600}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
                  />
                </div>
                <div className="hidden dark:block">
                  <Image
                    src={feature.darkImage}
                    alt={feature.alt}
                    width={600}
                    height={400}
                    quality={100}
                    className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 