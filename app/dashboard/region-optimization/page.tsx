'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { regions } from '@/lib/carbon-data';
import { DatacenterMap } from '@/components/datacenter-map';

const regionData = [
  {
    region: 'Mumbai',
    intensity: 150,
    cost: 4200,
    latency: 35,
  },
  {
    region: 'Delhi',
    intensity: 175,
    cost: 4500,
    latency: 40,
  },
  {
    region: 'Bangalore',
    intensity: 145,
    cost: 4100,
    latency: 38,
  },
  {
    region: 'Singapore',
    intensity: 95,
    cost: 3200,
    latency: 60,
  },
  {
    region: 'Frankfurt',
    intensity: 95,
    cost: 3800,
    latency: 75,
  },
  {
    region: 'Oregon',
    intensity: 120,
    cost: 4200,
    latency: 45,
  },
];

const trendData = [
  { month: 'Jan', avgIntensity: 160, indianAvg: 170 },
  { month: 'Feb', avgIntensity: 155, indianAvg: 165 },
  { month: 'Mar', avgIntensity: 150, indianAvg: 158 },
  { month: 'Apr', avgIntensity: 145, indianAvg: 152 },
  { month: 'May', avgIntensity: 140, indianAvg: 147 },
  { month: 'Jun', avgIntensity: 135, indianAvg: 142 },
];

export default function RegionOptimizationPage() {
  const bestRegion = regionData.reduce((prev, current) =>
    prev.intensity < current.intensity ? prev : current
  );

  const indianRegions = regionData.filter(
    (r) => r.region === 'Mumbai' || r.region === 'Delhi' || r.region === 'Bangalore'
  );
  const indianAvg = Math.round(
    indianRegions.reduce((sum, r) => sum + r.intensity, 0) / indianRegions.length
  );

  return (
    <div className="space-y-6">
      {/* Best Region Recommendation */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardContent className="pt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Crown className="w-8 h-8 text-emerald-600" />
            <div>
              <p className="font-semibold text-foreground">Recommended Region</p>
              <p className="text-sm text-muted-foreground">
                {bestRegion.region} - Lowest carbon intensity at {bestRegion.intensity} kg CO₂/MWh
              </p>
            </div>
          </div>
          <Badge className="bg-emerald-600 text-white">Best Choice</Badge>
        </CardContent>
      </Card>

      {/* India vs Global Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">India Avg Intensity</p>
              <p className="text-3xl font-bold text-orange-600">{indianAvg}</p>
              <p className="text-xs text-muted-foreground mt-2">kg CO₂/MWh</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Global Best</p>
              <p className="text-3xl font-bold text-green-600">{bestRegion.intensity}</p>
              <p className="text-xs text-muted-foreground mt-2">kg CO₂/MWh</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Difference</p>
              <p className="text-3xl font-bold text-red-600">{indianAvg - bestRegion.intensity}</p>
              <p className="text-xs text-muted-foreground mt-2">Higher in India</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Datacenter Locations & Carbon Intensity</h3>
        <DatacenterMap />
      </div>

      {/* Region Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Region Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="intensity" fill="#ef4444" name="Carbon Intensity (kg/MWh)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Carbon Intensity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgIntensity"
                stroke="#2563eb"
                name="Global Average"
              />
              <Line type="monotone" dataKey="indianAvg" stroke="#f97316" name="India Average" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Region Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Region Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-semibold">Region</th>
                  <th className="text-left py-2 px-3 font-semibold">Intensity</th>
                  <th className="text-left py-2 px-3 font-semibold">Latency</th>
                  <th className="text-left py-2 px-3 font-semibold">Cost/Hour</th>
                  <th className="text-left py-2 px-3 font-semibold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {regionData.map((region, idx) => (
                  <tr key={idx} className="border-b hover:bg-secondary/30">
                    <td className="py-3 px-3 font-medium">{region.region}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          region.intensity < 120
                            ? 'bg-green-600'
                            : region.intensity < 150
                              ? 'bg-amber-600'
                              : 'bg-red-600'
                        }`}
                      >
                        {region.intensity} kg/MWh
                      </span>
                    </td>
                    <td className="py-3 px-3">{region.latency}ms</td>
                    <td className="py-3 px-3">${(region.cost / 100).toFixed(2)}/hr</td>
                    <td className="py-3 px-3">
                      {region.intensity === bestRegion.intensity ? (
                        <Badge className="bg-green-600">Best</Badge>
                      ) : (
                        <Badge variant="outline">
                          +{region.intensity - bestRegion.intensity}
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
