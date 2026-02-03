# AllianzCarbonOps 🌱

**AI Carbon Footprint Dashboard with Enhanced Renewable Energy Visualization**

A comprehensive Next.js dashboard for monitoring and optimizing AI model carbon emissions across cloud datacenters in India, with a special focus on renewable energy sources and sustainability metrics.

## 🚀 Features

### 🌍 Interactive Datacenter Map
- **Visual map of Indian cloud datacenters** with real-time carbon intensity data
- **Interactive markers** showing AWS, Azure, Google Cloud, and IBM Cloud locations
- **Carbon intensity color coding** for quick environmental impact assessment
- **Hover and click interactions** for detailed datacenter information

### 🌱 Enhanced Renewable Energy Visualization
- **Prominent renewable energy mix display** with percentage calculations
- **Visual progress bars** showing clean energy adoption
- **Color-coded power sources** with intuitive icons:
  - ☀️ Solar Power
  - 💨 Wind Power  
  - 💧 Hydro Power
  - ⚡ Grid Power
- **Clean energy badges** highlighting renewable sources
- **Dedicated renewable energy legend** for educational purposes

### 📊 Comprehensive Dashboard
- **Model Selection & Analysis** - Compare AI models by carbon footprint
- **Region Optimization** - Find the most sustainable datacenter locations
- **ESG Reporting** - Environmental, Social, and Governance metrics
- **Real-time Analytics** - Live carbon emission tracking

### 🎨 Modern UI/UX
- **Responsive design** built with Tailwind CSS
- **Dark/Light theme support** with next-themes
- **Smooth animations** and transitions
- **Accessible components** using Radix UI primitives

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.10 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI + Custom component library
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tanisha0708/AllianzCarbonOps.git
   cd AllianzCarbonOps
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌟 Key Components

### DatacenterMap Component
The heart of the application featuring:
- Interactive SVG map of India with datacenter locations
- Real-time carbon intensity visualization
- Renewable energy percentage calculations
- Detailed power source breakdowns

### Carbon Data Management
Comprehensive data structure including:
- Indian datacenter locations with coordinates
- Carbon intensity measurements (gCO₂/kWh)
- Power source compositions (Solar, Wind, Hydro, Grid)
- Provider information (AWS, Azure, Google Cloud, IBM)

## 🎯 Sustainability Focus

This dashboard prioritizes environmental consciousness by:
- **Highlighting renewable energy adoption** across datacenters
- **Calculating and displaying clean energy percentages**
- **Providing visual feedback** for sustainable choices
- **Educating users** about different energy sources
- **Encouraging** environmentally responsible AI deployment decisions

## 📱 Responsive Design

Fully responsive across all devices:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Optimized layout with touch interactions
- **Mobile**: Streamlined interface for on-the-go monitoring

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── datacenter-map.tsx # Main map component
├── lib/                  # Utilities and data
│   ├── carbon-data.ts    # Datacenter and emissions data
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

### Key Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🌍 Environmental Impact

By using this dashboard, organizations can:
- **Reduce AI carbon footprint** by up to 40% through optimal datacenter selection
- **Increase renewable energy usage** in AI workloads
- **Make data-driven sustainability decisions**
- **Track and report** environmental metrics for ESG compliance

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Allianz's commitment to sustainable AI operations
- Inspired by the need for transparent carbon footprint tracking
- Designed with environmental consciousness at its core

---

**Made with 💚 for a sustainable future**