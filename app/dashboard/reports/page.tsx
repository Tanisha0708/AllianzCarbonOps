'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Download, Zap, Leaf, TrendingDown } from 'lucide-react';
import { ESGReport } from '@/components/esg-report';

const esgScore = 78;
const esgTrend = '+12%';

const emissionsByModel = [
  { model: 'BERT', emissions: 120 },
  { model: 'GPT-3', emissions: 280 },
  { model: 'LLaMA', emissions: 150 },
  { model: 'Vision', emissions: 200 },
];

const esgMetrics = [
  {
    category: 'Environmental',
    score: 85,
    items: [
      { label: 'Carbon Footprint', value: '655 kg CO₂' },
      { label: 'Energy Efficiency', value: '92%' },
      { label: 'Renewable Energy', value: '65%' },
    ],
  },
  {
    category: 'Social',
    score: 72,
    items: [
      { label: 'Data Privacy', value: 'Compliant' },
      { label: 'Fair AI Practices', value: '88%' },
      { label: 'Community Impact', value: 'Positive' },
    ],
  },
  {
    category: 'Governance',
    score: 75,
    items: [
      { label: 'Transparency', value: '79%' },
      { label: 'Compliance', value: 'GDPR, ISO 14001' },
      { label: 'Audits', value: '2 completed' },
    ],
  },
];

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ESG Score Card */}
      <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">ESG Composite Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{esgScore}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                {esgTrend} from Q2 2024
              </p>
            </div>
            <Leaf className="w-16 h-16 text-accent opacity-20" />
          </div>
        </CardContent>
      </Card>

      {/* ESG Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {esgMetrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                {metric.category}
                <Badge className="bg-primary text-white">{metric.score}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={metric.score} className="h-2" />
                <div className="space-y-2">
                  {metric.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emissions by Model */}
      <Card>
        <CardHeader>
          <CardTitle>Emissions Trend by Model</CardTitle>
          <CardDescription>CO₂ emissions comparison across deployed models</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={emissionsByModel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="model" fontSize={12} stroke="#6b7280" />
              <YAxis fontSize={12} stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="emissions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compliance Reports</CardTitle>
            <CardDescription>Download your latest sustainability reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Q2 2024 ESG Report', date: 'Jun 15, 2024', format: 'PDF' },
              { name: 'GDPR Compliance Audit', date: 'Jun 10, 2024', format: 'PDF' },
              { name: 'ISO 14001 Certification', date: 'May 30, 2024', format: 'PDF' },
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/30 transition">
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <p className="text-xs text-muted-foreground">{report.date}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generate New Report</CardTitle>
            <CardDescription>Create a custom ESG report for your deployment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Scope</span>
                <span className="font-semibold">All Deployments</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Period</span>
                <span className="font-semibold">Q3 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Report Type</span>
                <span className="font-semibold">Comprehensive</span>
              </div>
            </div>
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate ESG Report'}
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Export as PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ESG Detailed Report */}
      <div className="pt-6 border-t border-border">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sustainability Report</h2>
          <p className="text-muted-foreground">Comprehensive ESG metrics and performance tracking</p>
        </div>
        <ESGReport />
      </div>
    </div>
  );
}
