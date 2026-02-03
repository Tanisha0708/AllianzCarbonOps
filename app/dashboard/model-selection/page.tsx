'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Cpu, Plus, Zap, DollarSign, Trash2 } from 'lucide-react';
import {
  aiModels,
  regions,
  workloadTypes,
  hardwareTypes,
  calculateCO2,
  calculateCost,
} from '@/lib/carbon-data';

interface CustomModel {
  id: string;
  name: string;
  category: string;
  accuracy: number;
  baseCO2: number;
  costPerHour: number;
}

interface CustomTask {
  id: string;
  name: string;
  type: 'training' | 'inference' | 'custom';
  batchSize: number;
}

export default function ModelSelectionPage() {
  const [customModels, setCustomModels] = useState<CustomModel[]>([]);
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([]);
  const [selectedModel, setSelectedModel] = useState('bert');
  const [selectedRegion, setSelectedRegion] = useState('asia-south-mumbai');
  const [selectedWorkload, setSelectedWorkload] = useState('fraud');
  const [selectedHardware, setSelectedHardware] = useState('gpu');
  const [runtime, setRuntime] = useState(24);

  // Dialog states for adding new model
  const [newModelName, setNewModelName] = useState('');
  const [newModelCategory, setNewModelCategory] = useState('NLP');
  const [newModelAccuracy, setNewModelAccuracy] = useState(90);
  const [newModelCO2, setNewModelCO2] = useState(120);
  const [newModelCost, setNewModelCost] = useState(1200);

  // Dialog states for adding custom task
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskType, setNewTaskType] = useState<'training' | 'inference' | 'custom'>('inference');
  const [newTaskBatchSize, setNewTaskBatchSize] = useState(64);

  const allModels = [...aiModels, ...customModels];
  const allWorkloads = [
    ...workloadTypes,
    ...customTasks.map((t) => ({
      value: t.id,
      label: t.name,
      type: t.type,
      inferenceRate: 'N/A',
      avgBatchSize: t.batchSize,
    })),
  ];

  const currentModel = allModels.find((m) => m.id === selectedModel);
  const currentRegion = regions.find((r) => r.value === selectedRegion);
  const currentWorkload = allWorkloads.find((w) => w.value === selectedWorkload);
  const currentHardware = hardwareTypes.find((h) => h.value === selectedHardware);

  const co2Emissions =
    currentModel && currentRegion && currentHardware
      ? calculateCO2({
          modelEmissions: currentModel.baseCO2,
          regionIntensity: currentRegion.intensity,
          runtime,
          cpuPower: currentHardware.cpuPower,
          gpuPower: currentHardware.gpuPower,
          utilization: currentHardware.utilization,
        })
      : 0;

  const cost =
    currentRegion && currentHardware
      ? calculateCost({
          costPerHour: currentRegion.costPerHour,
          runtime,
          cpuPower: currentHardware.cpuPower,
          gpuPower: currentHardware.gpuPower,
          utilization: currentHardware.utilization,
        })
      : 0;

  const handleAddModel = () => {
    if (newModelName) {
      const newModel: CustomModel = {
        id: `custom-${Date.now()}`,
        name: newModelName,
        category: newModelCategory,
        accuracy: newModelAccuracy,
        baseCO2: newModelCO2,
        costPerHour: newModelCost,
      };
      setCustomModels([...customModels, newModel]);
      setSelectedModel(newModel.id);
      setNewModelName('');
      setNewModelAccuracy(90);
      setNewModelCO2(120);
      setNewModelCost(1200);
    }
  };

  const handleAddTask = () => {
    if (newTaskName) {
      const newTask: CustomTask = {
        id: `task-${Date.now()}`,
        name: newTaskName,
        type: newTaskType,
        batchSize: newTaskBatchSize,
      };
      setCustomTasks([...customTasks, newTask]);
      setSelectedWorkload(newTask.id);
      setNewTaskName('');
      setNewTaskBatchSize(64);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setCustomTasks(customTasks.filter((t) => t.id !== taskId));
    if (selectedWorkload === taskId) {
      setSelectedWorkload('fraud');
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AI Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Select AI Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom AI Model</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Model Name</Label>
                      <Input
                        value={newModelName}
                        onChange={(e) => setNewModelName(e.target.value)}
                        placeholder="e.g., CustomFraudModel_v1"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={newModelCategory} onValueChange={setNewModelCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NLP">NLP</SelectItem>
                          <SelectItem value="CV">Computer Vision</SelectItem>
                          <SelectItem value="GenAI">Generative AI</SelectItem>
                          <SelectItem value="TS">Time Series</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Expected Accuracy (%)</Label>
                      <Input
                        type="number"
                        value={newModelAccuracy}
                        onChange={(e) => setNewModelAccuracy(Number(e.target.value))}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label>Base CO2 Emissions (kg)</Label>
                      <Input
                        type="number"
                        value={newModelCO2}
                        onChange={(e) => setNewModelCO2(Number(e.target.value))}
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <Label>Cost per Hour (₹)</Label>
                      <Input
                        type="number"
                        value={newModelCost}
                        onChange={(e) => setNewModelCost(Number(e.target.value))}
                        placeholder="1200"
                      />
                    </div>
                    <Button onClick={handleAddModel} className="w-full">
                      Add Model
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {currentModel && (
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold">{currentModel.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-semibold">{currentModel.accuracy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base CO₂</span>
                  <span className="font-semibold">{currentModel.baseCO2} kg</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Region Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentRegion && (
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latency</span>
                  <span className="font-semibold">{currentRegion.latency}ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Carbon Intensity</span>
                  <span className="font-semibold">{currentRegion.intensity} kg/MWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cost/Hour</span>
                  <span className="font-semibold">${currentRegion.costPerHour}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workload Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              Workload Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Select value={selectedWorkload} onValueChange={setSelectedWorkload}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {allWorkloads.map((workload) => (
                    <SelectItem key={workload.value} value={workload.value}>
                      {workload.label} ({workload.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Task Name</Label>
                      <Input
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="e.g., Monthly Report Generation"
                      />
                    </div>
                    <div>
                      <Label>Task Type</Label>
                      <Select
                        value={newTaskType}
                        onValueChange={(value: any) => setNewTaskType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="inference">Inference</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Batch Size</Label>
                      <Input
                        type="number"
                        value={newTaskBatchSize}
                        onChange={(e) => setNewTaskBatchSize(Number(e.target.value))}
                        min="1"
                        placeholder="64"
                      />
                    </div>
                    <Button onClick={handleAddTask} className="w-full">
                      Add Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {currentWorkload && (
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-semibold capitalize">{currentWorkload.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Batch Size</span>
                  <span className="font-semibold">{currentWorkload.avgBatchSize}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hardware Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hardware</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Select value={selectedHardware} onValueChange={setSelectedHardware}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hardwareTypes.map((hw) => (
                    <SelectItem key={hw.value} value={hw.value}>
                      {hw.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <Label className="text-xs">Runtime (hours)</Label>
                <Input
                  type="number"
                  value={runtime}
                  onChange={(e) => setRuntime(Number(e.target.value))}
                  min="1"
                  max="720"
                />
              </div>
            </div>
            {currentHardware && (
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Power</span>
                  <span className="font-semibold">{currentHardware.cpuPower}kW</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GPU Power</span>
                  <span className="font-semibold">{currentHardware.gpuPower}kW</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="font-semibold">{currentHardware.utilization}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total CO₂ Emissions</p>
                <p className="text-3xl font-bold">{co2Emissions}</p>
                <p className="text-xs text-muted-foreground mt-2">kg CO₂</p>
              </div>
              <Zap className="w-5 h-5 text-emerald-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Estimated Cost</p>
                <p className="text-3xl font-bold">₹{cost}</p>
                <p className="text-xs text-muted-foreground mt-2">For {runtime}h</p>
              </div>
              <DollarSign className="w-5 h-5 text-blue-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Efficiency Score</p>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {currentModel ? Math.round((currentModel.accuracy / 100) * 100) : 0}/100
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                    style={{ width: `${currentModel ? currentModel.accuracy : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Models & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customModels.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Custom AI Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {customModels.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{model.accuracy}% accuracy</p>
                      <p className="text-xs text-muted-foreground">{model.baseCO2}kg CO₂</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {customTasks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Custom Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {customTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{task.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{task.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{task.batchSize}</p>
                        <p className="text-xs text-muted-foreground">batch size</p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
