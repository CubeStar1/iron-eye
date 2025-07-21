import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactElement<{ className?: string }>;
  cardClassName?: string; // For gradient background
}

const SummaryCard: React.FC<StatsCardProps> = ({ title, value, icon, description, cardClassName }) => {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-[1.02] border-0", cardClassName)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-white">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-white/20">
          {React.cloneElement(icon, {
            className: cn(icon.props.className, "h-5 w-5", "text-white/90")
          })}
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-3xl font-bold text-white">{value}</div>
        {description && <p className="text-xs text-white/80 pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
