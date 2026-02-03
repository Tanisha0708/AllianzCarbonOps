'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingDown, Target, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ESGReportData {
  quarter: string;
  emissions: number;
  renewablePercentage: number;
  cost: number;
  efficiency: number;
}

export function ESGReport() {
  const reportData: ESGReportData[] = [
    { quarter: 'Q1 2024', emissions: 850, renewablePercentage: 45, cost: 32000, efficiency: 72 },
    { quarter: 'Q2 2024', emissions: 780, renewablePercentage: 52, cost: 29500, efficiency: 78 },
    { quarter: 'Q3 2024', emissions: 720, renewablePercentage: 58, cost: 27800, efficiency: 82 },
    { quarter: 'Q4 2024', emissions: 655, renewablePercentage: 64, cost: 25200, efficiency: 86 },
  ];

  const esgMetrics = [
    {
      title: 'Carbon Footprint',
      value: '655 kg CO₂',
      change: '-23%',
      target: '600 kg CO₂',
      status: 'on-track',
      icon: TrendingDown,
    },
    {
      title: 'Renewable Energy',
      value: '64%',
      change: '+19%',
      target: '75%',
      status: 'on-track',
      icon: Target,
    },
    {
      title: 'Energy Efficiency',
      value: '86/100',
      change: '+14pts',
      target: '95/100',
      status: 'on-track',
      icon: Award,
    },
    {
      title: 'Cost Savings',
      value: '$25.2K',
      change: '-21%',
      target: '$22K',
      status: 'exceeded',
      icon: TrendingDown,
    },
  ];

  const handleDownloadReport = () => {
    const reportContent = generateReportPDF();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', 'ESG_Report_2024.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateReportPDF = () => {
    return `
ALLIANZ CARBONOPS - ESG SUSTAINABILITY REPORT 2024
================================================

EXECUTIVE SUMMARY
-----------------
This comprehensive ESG report provides quarterly performance metrics for AI infrastructure carbon footprint management. 
Our commitment to sustainability resulted in a 23% reduction in CO2 emissions compared to Q1 2024.

KEY PERFORMANCE INDICATORS
---------------------------
Carbon Footprint: 655 kg CO₂ (Target: 600 kg CO₂)
Renewable Energy Usage: 64% (Target: 75%)
Energy Efficiency Score: 86/100 (Target: 95/100)
Quarterly Cost Savings: $25,200 (vs Q1: $32,000)

ENVIRONMENTAL METRICS
---------------------
Q1 2024: 850 kg CO₂ | 45% Renewable | 72 Efficiency | $32,000 Cost
Q2 2024: 780 kg CO₂ | 52% Renewable | 78 Efficiency | $29,500 Cost
Q3 2024: 720 kg CO₂ | 58% Renewable | 82 Efficiency | $27,800 Cost
Q4 2024: 655 kg CO₂ | 64% Renewable | 86 Efficiency | $25,200 Cost

INITIATIVES & ACHIEVEMENTS
---------------------------
1. Datacenter Optimization: Successfully optimized 8 Indian cloud datacenters
2. Model Selection: Implemented 12 low-carbon AI models with 15% efficiency gain
3. Region Optimization: Reduced emissions by switching to renewable-powered regions
4. Workload Distribution: Balanced inference and training loads across optimal periods
5. Carbon Offset: Partnered with verified environmental projects for 50 kg CO₂ offset

RECOMMENDATIONS
----------------
1. Target 75% renewable energy by Q1 2025
2. Implement predictive workload scheduling
3. Expand use of green-powered datacenters
4. Conduct quarterly carbon audits
5. Engage with suppliers for sustainability commitments

COMPLIANCE STATUS
------------------
ISO 14001: Compliant
GRI Standards: Partially Aligned (targeting full alignment Q1 2025)
TCFD Recommendations: In Progress
SBTi Commitment: Pending Approval

Report Generated: ${new Date().toLocaleDateString()}
Platform: AllianzCarbonOps v1.0
    `;
  };

  const pieData = [
    { name: 'Renewable', value: 64 },
    { name: 'Grid Power', value: 36 },
  ];

  const COLORS = ['#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {esgMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="border-primary/20 hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-semibold ${metric.change.startsWith('-') ? 'text-green-600' : 'text-blue-600'}`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-muted-foreground">vs Q1: {metric.target}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Trend */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">CO₂ Emissions Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="quarter" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#4287f5"
                  strokeWidth={3}
                  dot={{ fill: '#4287f5', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="CO₂ (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Renewable Energy */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Renewable Energy Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-300">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Efficiency Chart */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-base">Energy Efficiency Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="quarter" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="efficiency" fill="#10b981" radius={[8, 8, 0, 0]} name="Efficiency Score" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Report Summary */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Summary & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Key Achievements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 23% reduction in CO₂ emissions compared to Q1 2024</li>
                <li>• 19% increase in renewable energy utilization</li>
                <li>• 14-point improvement in energy efficiency score</li>
                <li>• 21% reduction in operational costs</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Recommendations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Target 75% renewable energy by Q1 2025</li>
                <li>• Implement predictive workload scheduling</li>
                <li>• Expand green-powered datacenter usage</li>
                <li>• Conduct quarterly carbon audits</li>
              </ul>
            </div>
          </div>

          <Button onClick={handleDownloadReport} className="w-full gap-2 bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4" />
            Download Full Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
