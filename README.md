# P38 MAPK SILCS FragMaps Interactive Demo

## Project Overview

This is an interactive web-based molecular visualization demo showcasing P38 MAP kinase (P38 MAPK) protein structure alongside SILCS FragMap data. The application enables scientists and researchers to explore protein-ligand interactions in three dimensions by visualizing:

- **Protein structure** (P38 MAPK, PDB ID: 3FLY) rendered as a cartoon ribbon
- **Multiple ligand poses** from crystallographic and SILCS-aligned structures (ball-and-stick representation)
- **SILCS FragMaps** as isosurface contours highlighting favorable interaction hotspots

The demo is hosted online and can also be run locally for offline analysis or development.

---

## Scientific Background

### P38 MAPK

P38 mitogen-activated protein kinase (P38 MAPK) is a serine/threonine kinase involved in signal transduction pathways that regulate cellular responses to stress and inflammation. It plays a critical role in cytokine production, cell differentiation and apoptosis and transcriptional regulation.

P38 is a validated drug target for inflammatory and autoimmune diseases; many chemical series have been designed to modulate its activity.

### SILCS FragMaps

SILCS is a computational method that identifies favorable interaction regions around a protein target. FragMaps are three-dimensional probability distributions that quantify where different fragment types (hydrophobic, H-bond donor, H-bond acceptor, aromatic, etc.) favorably interact with the protein.

In this demo, FragMaps are displayed as different isosurfaces with isovalue controling the confidence level shown; lower values reveal weak sites, higher values show only the strongest hotspots

---

## Running Locally

### Requirements

- **Node.js** (v16 or later)
- **npm** (v7 or later)

### Setup & Installation

1. Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yes-zhang/silcs-fragmaps-demo.git
cd silcs-fragmaps-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The dev server will launch at `http://localhost:5173` (or the next available port if 5173 is in use). Open this URL in your browser.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The compiled output will be in the `dist/` folder, ready for deployment to any static hosting service.


## Design Decisions & Tradeoffs

### 1. **Molstar as the 3D Viewer**

**Choice:** Used [Molstar](https://molstar.org/) for molecular structure visualization.
- Mature, production-ready viewer with excellent performance
- Built-in support for PDB, SDF, and volume formats (DX)

**Tradeoff:** Larger bundle size (~970 KB gzipped) due to comprehensive feature set.

### 2. **React + TypeScript for the Web Framing**

**Choice:** Built the UI shell in React with TypeScript.
- Type safety reduces bugs and improves IDE support
- React's component model makes UI updates predictable
- Easy to extend with additional interactive features (download, analysis tools, etc.)

**Tradeoff:** Adds client-side complexity; for a static viewer, a vanilla HTML/JS approach would be lighter.

## Future Enhancements

Potential features for future versions:

- **Measurement tools** — calculate distances, angles in the 3D view
- **Export capabilities** — save snapshots or export atomic coordinates