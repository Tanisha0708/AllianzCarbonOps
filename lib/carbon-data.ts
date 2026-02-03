// AI Model Data with metadata
export const aiModels = [
  {
    id: 'bert',
    name: 'BERT',
    category: 'NLP',
    accuracy: 94,
    baseCO2: 120,
    costPerHour: 1200,
  },
  {
    id: 'gpt3',
    name: 'GPT-3',
    category: 'GenAI',
    accuracy: 97,
    baseCO2: 280,
    costPerHour: 2500,
  },
  {
    id: 'llama',
    name: 'LLaMA',
    category: 'GenAI',
    accuracy: 95,
    baseCO2: 150,
    costPerHour: 1800,
  },
  {
    id: 'resnet',
    name: 'ResNet-50',
    category: 'CV',
    accuracy: 92,
    baseCO2: 100,
    costPerHour: 1000,
  },
  {
    id: 'yolo',
    name: 'YOLOv8',
    category: 'CV',
    accuracy: 88,
    baseCO2: 85,
    costPerHour: 900,
  },
];

// Indian Cloud Datacenters with coordinates and carbon intensity
export const indianDatacenters = [
  {
    id: 'mumbai-1',
    name: 'AWS Mumbai (ap-south-1a)',
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0176,
    lng: 72.8479,
    carbonIntensity: 150, // kg CO2/MWh
    provider: 'AWS',
    region: 'ap-south-1',
    powerSource: ['Solar', 'Wind', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'mumbai-2',
    name: 'Azure West India (Mumbai)',
    city: 'Mumbai',
    state: 'Maharashtra',
    lat: 19.0144,
    lng: 72.8501,
    carbonIntensity: 155,
    provider: 'Azure',
    region: 'westindia',
    powerSource: ['Wind', 'Solar', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'delhi-1',
    name: 'Google Cloud Delhi (asia-south1-a)',
    city: 'Delhi',
    state: 'Delhi',
    lat: 28.5244,
    lng: 77.1855,
    carbonIntensity: 180,
    provider: 'Google Cloud',
    region: 'asia-south1',
    powerSource: ['Solar', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'delhi-2',
    name: 'AWS Delhi (ap-south-1b)',
    city: 'Delhi',
    state: 'Delhi',
    lat: 28.6139,
    lng: 77.209,
    carbonIntensity: 175,
    provider: 'AWS',
    region: 'ap-south-1',
    powerSource: ['Grid'],
    status: 'maintenance' as const,
  },
  {
    id: 'bangalore-1',
    name: 'AWS Bangalore (ap-south-1c)',
    city: 'Bangalore',
    state: 'Karnataka',
    lat: 12.9716,
    lng: 77.5946,
    carbonIntensity: 145,
    provider: 'AWS',
    region: 'ap-south-1',
    powerSource: ['Solar', 'Wind', 'Hydro', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'bangalore-2',
    name: 'Azure South India (Bangalore)',
    city: 'Bangalore',
    state: 'Karnataka',
    lat: 12.9352,
    lng: 77.6245,
    carbonIntensity: 148,
    provider: 'Azure',
    region: 'southindia',
    powerSource: ['Solar', 'Wind', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'pune-1',
    name: 'IBM Cloud Pune',
    city: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    carbonIntensity: 152,
    provider: 'IBM Cloud',
    region: 'in-pune',
    powerSource: ['Wind', 'Solar', 'Grid'],
    status: 'active' as const,
  },
  {
    id: 'hyderabad-1',
    name: 'AWS Hyderabad (planned)',
    city: 'Hyderabad',
    state: 'Telangana',
    lat: 17.3729,
    lng: 78.4742,
    carbonIntensity: 140,
    provider: 'AWS',
    region: 'ap-south-2',
    powerSource: ['Solar', 'Wind', 'Hydro'],
    status: 'planned' as const,
  },
];

// Regions with CO2 emissions data
export const regions = [
  {
    value: 'us-west',
    label: 'US-West (Oregon)',
    latency: 45,
    intensity: 120,
    costPerHour: 0.85,
    baseEmissions: 80,
  },
  {
    value: 'eu-central',
    label: 'EU-Central (Frankfurt)',
    latency: 75,
    intensity: 95,
    costPerHour: 0.95,
    baseEmissions: 65,
  },
  {
    value: 'asia-south-mumbai',
    label: 'Asia-South (Mumbai)',
    latency: 35,
    intensity: 150,
    costPerHour: 0.65,
    baseEmissions: 100,
  },
  {
    value: 'asia-south-delhi',
    label: 'Asia-South (Delhi)',
    latency: 40,
    intensity: 175,
    costPerHour: 0.65,
    baseEmissions: 115,
  },
  {
    value: 'asia-south-bangalore',
    label: 'Asia-South (Bangalore)',
    latency: 38,
    intensity: 145,
    costPerHour: 0.65,
    baseEmissions: 97,
  },
  {
    value: 'ap-southeast',
    label: 'AP-Southeast (Singapore)',
    latency: 60,
    intensity: 95,
    costPerHour: 0.75,
    baseEmissions: 65,
  },
  {
    value: 'us-east',
    label: 'US-East (N. Virginia)',
    latency: 50,
    intensity: 110,
    costPerHour: 0.80,
    baseEmissions: 75,
  },
];

// Workload types with configurations
export const workloadTypes = [
  {
    value: 'fraud',
    label: 'Fraud Detection',
    type: 'inference',
    inferenceRate: '1.2M',
    avgBatchSize: 64,
  },
  {
    value: 'nlp',
    label: 'NLP Processing',
    type: 'inference',
    inferenceRate: '850K',
    avgBatchSize: 32,
  },
  {
    value: 'vision',
    label: 'Vision Analysis',
    type: 'inference',
    inferenceRate: '450K',
    avgBatchSize: 16,
  },
  {
    value: 'training',
    label: 'Model Training',
    type: 'training',
    inferenceRate: 'N/A',
    avgBatchSize: 256,
  },
];

// Hardware configurations
export const hardwareTypes = [
  {
    value: 'cpu',
    label: 'CPU Only',
    cpuPower: 2.5,
    gpuPower: 0,
    utilization: 60,
  },
  {
    value: 'gpu',
    label: 'GPU (Single)',
    cpuPower: 1.5,
    gpuPower: 12.0,
    utilization: 70,
  },
  {
    value: 'gpu-multi',
    label: 'GPU (Multi)',
    cpuPower: 2.0,
    gpuPower: 24.0,
    utilization: 75,
  },
  {
    value: 'tpu',
    label: 'TPU',
    cpuPower: 1.0,
    gpuPower: 0,
    utilization: 85,
  },
];

// CO2 Calculation Function
export function calculateCO2(params: {
  modelEmissions: number;
  regionIntensity: number;
  runtime: number;
  cpuPower: number;
  gpuPower: number;
  utilization: number;
}): number {
  const {
    modelEmissions,
    regionIntensity,
    runtime,
    cpuPower,
    gpuPower,
    utilization,
  } = params;

  // Total power consumption in kW
  const totalPower = (cpuPower + gpuPower) * (utilization / 100);

  // Energy in kWh
  const energyKwh = totalPower * runtime;

  // CO2 from region intensity (kg CO2/kWh based on grid intensity)
  const regionCO2 = (energyKwh * regionIntensity) / 1000;

  // Base model emissions + region impact
  const totalCO2 = modelEmissions + regionCO2;

  return Math.round(totalCO2);
}

// Cost Calculation Function
export function calculateCost(params: {
  costPerHour: number;
  runtime: number;
  cpuPower: number;
  gpuPower: number;
  utilization: number;
}): number {
  const { costPerHour, runtime, cpuPower, gpuPower, utilization } = params;

  // Energy consumption
  const totalPower = (cpuPower + gpuPower) * (utilization / 100);
  const energyKwh = totalPower * runtime;

  // Rough cost calculation (varies by provider)
  const cost = costPerHour * runtime * (energyKwh / (2.5 * runtime)); // Normalize

  return Math.round(cost * 100) / 100;
}

// Export alias for uppercase convention
export const INDIAN_DATACENTERS = indianDatacenters;
