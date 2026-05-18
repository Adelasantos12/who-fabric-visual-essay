# The Fabric of Global Health Funding

A visual data essay exploring the structural evolution of WHO financing (2016–2025).

## Author & Attribution
- **Author:** Adela Santos (adela.santos@graduateinstitute.ch)
- **Source Data:** WHO Financing Network Analysis.
- **Project Type:** Vercel-ready D3.js Visual Essay.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Deployment
This project is optimized for deployment on **Vercel**. Simply connect your repository to Vercel, and it will automatically detect the Vite configuration.

## Data Assumptions & Classification Fixes
During the migration, a data audit of `network_data.js` was performed with the following results:
- **US Entity Verification:** Only official government-related agencies (USAID, CDC, NIH, DTRA, USFDA, USDA, USDOS, State Dept, CDC Foundation) are marked as `is_us: true`.
- **Exclusion List:** Entities from Australia, Canada, Germany, Japan, and the EU were explicitly verified to ensure they are **not** marked as US.
- **Middle-Power Candidates:** Germany, EU, Canada, France, and Japan were identified as candidates based on volume and relative betweenness, not automated keyword matching.
- **US Exposure Analysis:** Reverted to the analytical findings of 1,530 ties, $525M in flow, and 4 recipient nodes with >=50% dependency (Poland, Czechia, Slovakia, Iraq).

## Methodological Cautions
- **Sample Size:** N = 5 biennia.
- **Scope:** Descriptive visual reading; no causal claims or predictive forecasting.
- **Theory:** Use of Scheffer’s vocabulary (resilience, perturbation) is conceptual, not a diagnosis of a mathematical tipping point.
- **Hierarchy:** The Binding Map is a final synthesis tool, not a proof of critical slowing down.

## Known Limitations
- Network metrics are calculated on the full dataset; visualizations are filtered for readability (Top-N).
- US-removal scenario is a "stress test" visualization and does not model secondary or tertiary feedback loops.

## Validation Checklist for Public Release
- [x] Verify responsive behavior on mobile (375px width).
- [x] Check all external links (DOI, Journal).
- [x] Confirm scroll trigger performance in Safari/Firefox.
- [x] Validate accessibility (Aria labels for buttons).
