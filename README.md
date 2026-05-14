# The Fabric of Global Health Funding

A visual data essay mapping the structure of WHO financing from 2016 to 2025. This project uses Vite, vanilla JavaScript, and D3.js to visualize the network of financial flows between donors and recipient entities.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

To install dependencies:
npm install

### Running Locally

To start the development server:
npm run dev-server

### Building for Production

To create a production build in the dist/ directory:
npm run build

### Deployment on Vercel

This project is ready for zero-config deployment on Vercel. Simply connect your repository to Vercel, and it will automatically detect the Vite build settings.

## Data and Methodology

### Data Source
The visualization is based on public WHO Programme Budget data across five biennia (2016–2025).

### Key Data Assumptions & Fixes
- **US Entity Classification**: We have manually verified and enriched the dataset to ensure all US government-related entities (USAID, CDC, NIH, DTRA, USFDA, USDA, USDOS, USEPA, CDC Foundation) are correctly marked with is_us: true.
- **Middle-Power Candidates**: Actors such as Germany, the European Commission, Canada, France, and China are marked as is_mid: true to explore their potential role as structural bridges.
- **Top-N Filtering**: For visual clarity and performance, the network views show the top donors and recipients per biennium. Metrics shown in the metric strip reflect the complete network structure.

### Known Limitations
- The dataset consists of 5 aggregate observations (biennia), which is a small N for formal time-series or early-warning signal analysis.
- "Middle-power bridges" is a conceptual category based on volume and geographic reach; structural betweenness values remain low across the system.
- The US-removal scenario is a structural simulation, not a prediction of programmatic impact.

## Project Structure

- index.html: Narrative structure and SVG assets.
- src/main.js: Integration and orchestration of components.
- src/styles.css: Editorial and responsive styling.
- src/data/network_data.js: Enriched network data and metrics.
- src/components/: Modular D3.js visualization components.

## Public Release Checklist
- [ ] Verify data against latest WHO Q2 2025 releases if available.
- [ ] Conduct cross-browser testing for sticky layout and D3 performance.
- [ ] Validate participation coefficient for stronger middle-power brokerage claims.
- [ ] Accessibility review (screen readers for network descriptions).
- [ ] Peer review of the narrative scenes by domain experts.
