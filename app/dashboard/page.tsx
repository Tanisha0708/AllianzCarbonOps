'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingUp, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    { label: 'Energy Used', value: '2,847', unit: 'kWh', icon: Zap },
    { label: 'CO₂ Emissions', value: '655', unit: 'kg CO₂', icon: TrendingUp },
    { label: 'Monthly Cost', value: '$19,200', unit: 'USD', icon: DollarSign },
  ];

  return (
    <main className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card
              key={idx}
              className="hover-lift animate-fade-in-up border-primary/20"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{metric.unit}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
