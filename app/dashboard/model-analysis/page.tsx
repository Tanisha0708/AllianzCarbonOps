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
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

const modelComparisons = [
  {
    model: 'BERT',
    accuracy: 94,
    emissions: 120,
    cost: 3200,
    rank: 3,
    efficiency: 78,
  },
  {
    model: 'GPT-3',
    accuracy: 97,
    emissions: 280,
    cost: 5100,
    rank: 2,
    efficiency: 62,
  },
  {
    model: 'LLaMA',
    accuracy: 95,
    emissions: 150,
    cost: 3800,
    rank: 1,
    efficiency: 85,
  },
  {
    model: 'ResNet-50',
    accuracy: 92,
    emissions: 100,
    cost: 3000,
    rank: 4,
    efficiency: 88,
  },
];

// Regional CO2 emissions comparison
const regionalCO2Data = [
  {
    region: 'Mumbai',
    bert: 220,
    gpt3: 380,
    llama: 250,
    resnet: 200,
  },
  {
    region: 'Delhi',
    bert: 240,
    gpt3: 410,
    llama: 270,
    resnet: 220,
  },
  {
    region: 'Bangalore',
    bert: 215,
    gpt3: 370,
    llama: 245,
    resnet: 195,
  },
  {
    region: 'Singapore',
    bert: 200,
    gpt3: 350,
    llama: 230,
    resnet: 180,
  },
  {
    region: 'Frankfurt',
    bert: 190,
    gpt3: 330,
    llama: 220,
    resnet: 170,
  },
  {
    region: 'Oregon',
    bert: 210,
    gpt3: 360,
    llama: 240,
    resnet: 190,
  },
];

// Model efficiency comparison
const efficiencyData = modelComparisons.map((m) => ({
  model: m.model,
  accuracy: m.accuracy,
  efficiency: m.efficiency,
  emissions: m.emissions,
  cost: m.cost,
}));

const bestModel = modelComparisons.find((m) => m.rank === 1);

export default function ModelAnalysisPage() {
  return (
    <div className="space-y-6">
      {/* Best Model Recommendation */}
      {bestModel && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Best Model Recommendation</p>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{bestModel.model}</h2>
                  <p className="text-sm text-muted-foreground">
                    Optimal balance of accuracy, efficiency, and carbon footprint
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white px-3 py-1">BEST CHOICE</Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-lg font-bold text-foreground">{bestModel.accuracy}%</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">CO₂ Emissions</p>
                <p className="text-lg font-bold text-foreground">{bestModel.emissions} kg</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Monthly Cost</p>
                <p className="text-lg font-bold text-foreground">₹{bestModel.cost.toLocaleString()}</p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Efficiency</p>
                <p className="text-lg font-bold text-foreground">{bestModel.efficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Model Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Model Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Model Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Efficiency Score Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Efficiency vs Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={efficiencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#10b981" name="Efficiency Score" />
                <Bar dataKey="cost" fill="#f59e0b" name="Cost (₹100s)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional CO2 Emissions Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Regional CO₂ Emissions Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={regionalCO2Data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" fontSize={12} />
              <YAxis fontSize={12} label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bert" fill="#3b82f6" name="BERT" />
              <Bar dataKey="gpt3" fill="#8b5cf6" name="GPT-3" />
              <Bar dataKey="llama" fill="#ec4899" name="LLaMA" />
              <Bar dataKey="resnet" fill="#10b981" name="ResNet-50" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Trend Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Model CO₂ Emissions by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={regionalCO2Data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bert" stroke="#3b82f6" strokeWidth={2} name="BERT" />
              <Line type="monotone" dataKey="gpt3" stroke="#8b5cf6" strokeWidth={2} name="GPT-3" />
              <Line type="monotone" dataKey="llama" stroke="#ec4899" strokeWidth={2} name="LLaMA" />
              <Line
                type="monotone"
                dataKey="resnet"
                stroke="#10b981"
                strokeWidth={2}
                name="ResNet-50"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Efficiency Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Model Efficiency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={efficiencyData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Accuracy"
                dataKey="accuracy"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
              <Radar
                name="Efficiency"
                dataKey="efficiency"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.5}
              />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Model Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detailed Model Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-3 font-semibold">Model</th>
                  <th className="text-left py-3 px-3 font-semibold">Accuracy</th>
                  <th className="text-left py-3 px-3 font-semibold">Base CO₂</th>
                  <th className="text-left py-3 px-3 font-semibold">Monthly Cost</th>
                  <th className="text-left py-3 px-3 font-semibold">Efficiency</th>
                  <th className="text-left py-3 px-3 font-semibold">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {modelComparisons.map((model, idx) => (
                  <tr key={idx} className="border-b hover:bg-secondary/30">
                    <td className="py-3 px-3 font-semibold">{model.model}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${model.accuracy}%` }}
                          />
                        </div>
                        <span>{model.accuracy}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-700 font-semibold">{model.emissions} kg</span>
                    </td>
                    <td className="py-3 px-3">₹{model.cost.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={model.efficiency > 80 ? 'text-green-600' : 'text-amber-600'}>
                        {model.efficiency}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {model.rank === 1 ? (
                        <Badge className="bg-green-600">Best</Badge>
                      ) : (
                        <Badge variant="outline">Rank #{model.rank}</Badge>
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
