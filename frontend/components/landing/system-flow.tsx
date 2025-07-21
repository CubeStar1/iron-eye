import { motion } from "framer-motion"
import { Video, Cpu, ScanSearch, MousePointer, BarChartHorizontal, BellRing, DatabaseZap } from "lucide-react"
import Image from "next/image"

const flowSteps = [
  {
    title: "Video Input & Preprocessing",
    description: "Connect live video streams or upload video files. Frames are captured and preprocessed for optimal model performance.",
    icon: Video,
    gradient: "from-sky-500 via-cyan-500 to-blue-500",
    shadowColor: "shadow-sky-500/25",
  },
  {
    title: "YOLO Model Inference",
    description: "The selected YOLO model processes each frame, performing rapid inference to locate and classify objects.",
    icon: Cpu,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    shadowColor: "shadow-blue-500/25",
  },
  {
    title: "Object Detection & Classification",
    description: "Bounding boxes are drawn around detected objects, and each is classified with a confidence score.",
    icon: ScanSearch,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    shadowColor: "shadow-green-500/25",
  },
  {
    title: "Tracking & Data Association",
    description: "Objects are tracked across frames, maintaining unique IDs for continuous monitoring and analysis.",
    icon: MousePointer,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Analytics & Visualization",
    description: "Detection data is aggregated and displayed on dashboards, showing object counts, trends, and performance metrics.",
    icon: BarChartHorizontal,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    shadowColor: "shadow-orange-500/25",
  },
  {
    title: "Logging & Alerts",
    description: "All detection events are logged for auditing and review. Customizable alerts notify users of critical detections.",
    icon: DatabaseZap, // Or BellRing if focus is more on alerts
    gradient: "from-red-500 via-rose-500 to-pink-500",
    shadowColor: "shadow-red-500/25",
  },
]

export function SystemFlow() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Our Detection Process{" "}
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Explained
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Follow the journey of your data from input to actionable insights through our streamlined YOLO detection pipeline.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {flowSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
          >
            <div 
              className={`
                h-full rounded-2xl p-1 transition-all duration-300 
                bg-gradient-to-br ${step.gradient} opacity-75 hover:opacity-100
                hover:scale-[1.02] hover:-translate-y-1
              `}
            >
              <div className="h-full rounded-xl bg-background/90 p-6 backdrop-blur-xl">
                <div className={`
                  size-14 rounded-lg bg-gradient-to-br ${step.gradient}
                  flex items-center justify-center ${step.shadowColor}
                  shadow-lg transition-shadow duration-300 group-hover:shadow-xl
                `}>
                  <step.icon className="size-7 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative mx-auto mt-16 sm:mt-20 lg:mt-24"
      >
        <div className="relative rounded-2xl bg-gradient-to-b from-muted/50 to-muted p-2 ring-1 ring-foreground/10 backdrop-blur-3xl dark:from-muted/30 dark:to-background/80">
          {/* TODO: Replace with an image illustrating the YOLO detection system architecture */}
          <Image
            src="/ironeye-dashboard.png"
            alt="PlantPatrol Real-time Pest Detection System Architecture"
            width={1200}
            height={800}
            quality={100}
            className="rounded-xl shadow-2xl ring-1 ring-foreground/10 transition-all duration-300"
          />
        </div>
      </motion.div>
    </section>
  )
}