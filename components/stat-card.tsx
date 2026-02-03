import { Card, CardContent } from '@/components/ui/card';
import { Type as type, LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  trendPositive?: boolean;
  bgColor: string;
  iconColor: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendPositive,
  bgColor,
  iconColor,
}: StatCardProps) {
  return (
    <Card className="hover:shadow-md hover:border-primary/30">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
            </div>
            {trend && (
              <p
                className={`text-xs mt-2 font-medium ${
                  trendPositive ? 'text-green-600' : 'text-orange-600'
                }`}
              >
                {trend}
              </p>
            )}
          </div>
          <div className={`${bgColor} p-3 rounded-lg shrink-0`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
