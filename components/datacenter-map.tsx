'use client';

import { useState } from 'react';
import { INDIAN_DATACENTERS } from '@/lib/carbon-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Datacenter {
  id: string;
  name: string;
  city: string;
  provider: string;
  region: string;
  lat: number;
  lng: number;
  carbonIntensity: number;
  powerSource: string[];
  status: 'active' | 'maintenance' | 'planned';
}

export function DatacenterMap() {
  const [selectedDatacenter, setSelectedDatacenter] = useState<Datacenter | null>(
    INDIAN_DATACENTERS[0]
  );
  const [hoveredDatacenter, setHoveredDatacenter] = useState<string | null>(null);

  // Calculate map bounds for India
  const mapMinLat = 8;
  const mapMaxLat = 35;
  const mapMinLng = 68;
  const mapMaxLng = 97;
  const mapWidth = 500;
  const mapHeight = 400;

  const getPixelCoords = (lat: number, lng: number) => {
    const x = ((lng - mapMinLng) / (mapMaxLng - mapMinLng)) * mapWidth;
    const y = ((mapMaxLat - lat) / (mapMaxLat - mapMinLat)) * mapHeight;
    return { x, y };
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 100) return '#10b981';
    if (intensity < 200) return '#3b82f6';
    if (intensity < 300) return '#f59e0b';
    return '#ef4444';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 100) return 'Low';
    if (intensity < 200) return 'Medium';
    if (intensity < 300) return 'High';
    return 'Very High';
  };

  const getPowerSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'solar':
        return '☀️';
      case 'wind':
        return '💨';
      case 'hydro':
        return '💧';
      case 'nuclear':
        return '⚛️';
      case 'grid':
        return '⚡';
      default:
        return '🔌';
    }
  };

  const getPowerSourceColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'solar':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'wind':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hydro':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'nuclear':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'grid':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateRenewablePercentage = (powerSources: string[]) => {
    const renewableSources = ['solar', 'wind', 'hydro'];
    const renewableCount = powerSources.filter(source => 
      renewableSources.includes(source.toLowerCase())
    ).length;
    return Math.round((renewableCount / powerSources.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <Card className="lg:col-span-2 overflow-hidden border-primary/20">
          <CardHeader>
            <CardTitle className="text-base">Indian Cloud Datacenters</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-auto bg-gradient-to-br from-blue-50 via-blue-100 to-green-50"
              style={{ minHeight: '400px' }}
            >
              {/* Map background grid */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                </pattern>

                {/* Gradient for markers */}
                <linearGradient id="markerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4287f5" stopOpacity="1" />
                  <stop offset="100%" stopColor="#2e5cb8" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Grid pattern */}
              <rect width={mapWidth} height={mapHeight} fill="url(#grid)" />

              {/* Render datacenters */}
              {INDIAN_DATACENTERS.map((dc: Datacenter) => {
                const { x, y } = getPixelCoords(dc.lat, dc.lng);
                const isSelected = selectedDatacenter?.id === dc.id;
                const isHovered = hoveredDatacenter === dc.id;
                const color = getIntensityColor(dc.carbonIntensity);
                const radius = isSelected || isHovered ? 16 : 12;
                const pulseRadius = radius + 6;

                return (
                  <g key={dc.id}>
                    {/* Pulse effect for selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={pulseRadius}
                        fill={color}
                        opacity="0.2"
                        className="animate-glow-pulse"
                      />
                    )}

                    {/* Main marker circle */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={color}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer transition-all hover:r-[18]"
                      onClick={() => setSelectedDatacenter(dc)}
                      onMouseEnter={() => setHoveredDatacenter(dc.id)}
                      onMouseLeave={() => setHoveredDatacenter(null)}
                      style={{
                        filter: `drop-shadow(0 2px 8px ${color}88)`,
                      }}
                    />

                    {/* Marker label */}
                    {(isSelected || isHovered) && (
                      <text
                        x={x}
                        y={y - radius - 20}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-foreground pointer-events-none"
                        style={{ fontSize: '11px' }}
                      >
                        {dc.city}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </CardContent>
        </Card>

        {/* Info Panel */}
        <Card className="border-primary/20 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-base">Datacenter Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDatacenter ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{selectedDatacenter.name}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{selectedDatacenter.city}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Provider</p>
                  <p className="font-semibold text-foreground">{selectedDatacenter.provider}</p>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Carbon Intensity</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getIntensityColor(selectedDatacenter.carbonIntensity) }}
                    />
                    <span className="font-bold text-foreground">
                      {selectedDatacenter.carbonIntensity} gCO₂/kWh
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rating: {getIntensityLabel(selectedDatacenter.carbonIntensity)}
                  </p>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-foreground">🌱 Renewable Energy Mix</p>
                    <span className="text-lg font-bold text-green-600">
                      {calculateRenewablePercentage(selectedDatacenter.powerSource || [])}%
                    </span>
                  </div>
                  
                  {/* Renewable Energy Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${calculateRenewablePercentage(selectedDatacenter.powerSource || [])}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Renewable energy percentage
                    </p>
                  </div>

                  {/* Power Sources with Icons */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Power Sources</p>
                    <div className="grid grid-cols-1 gap-2">
                      {(selectedDatacenter.powerSource || []).map((source) => (
                        <div 
                          key={source} 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getPowerSourceColor(source)}`}
                        >
                          <span className="text-lg">{getPowerSourceIcon(source)}</span>
                          <span className="text-sm font-medium">{source}</span>
                          {['solar', 'wind', 'hydro'].includes(source.toLowerCase()) && (
                            <span className="ml-auto text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                              Clean
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        selectedDatacenter.status === 'active'
                          ? 'bg-green-500'
                          : selectedDatacenter.status === 'maintenance'
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                    />
                    <span className="text-sm capitalize text-foreground">
                      {selectedDatacenter.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Select a datacenter to view details</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Intensity Legend */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm">Carbon Intensity Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Low Emissions', color: '#10b981', range: '< 100 gCO₂/kWh' },
                { label: 'Medium Emissions', color: '#3b82f6', range: '100-200 gCO₂/kWh' },
                { label: 'High Emissions', color: '#f59e0b', range: '200-300 gCO₂/kWh' },
                { label: 'Very High', color: '#ef4444', range: '> 300 gCO₂/kWh' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Renewable Energy Legend */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              🌱 Renewable Energy Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Solar Power', icon: '☀️', color: 'text-yellow-600' },
                { label: 'Wind Power', icon: '💨', color: 'text-blue-600' },
                { label: 'Hydro Power', icon: '💧', color: 'text-cyan-600' },
                { label: 'Grid Power', icon: '⚡', color: 'text-gray-600' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.label.includes('Grid') ? 'Traditional' : 'Clean Energy'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-100 rounded-lg">
              <p className="text-xs text-green-800 font-medium">
                💡 Higher renewable percentage = Lower carbon footprint
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
