import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Real-time Analytics</h1>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
