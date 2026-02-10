export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h2>P38 MAP Kinase - Overview</h2>

      <p>
        P38 MAP kinase (P38 MAPK) is a serine/threonine kinase that mediates cellular
        responses to stress and inflammation, regulating cytokine production, cell
        differentiation and apoptosis. 
      </p>
      <p>  
        This demo displays the P38 3FLY crystal structure
        together with its crystallographic ligand and several SILCS-aligned ligand poses
        so you can inspect binding orientations.
      </p>

      <p>
        SILCS FragMaps are three-dimensional grids that indicate where different fragment
        types (e.g., apolar, H-bond donor/acceptor) favorably interact with the protein.
        FragMaps reveal binding hotspots and exclusion regions that help explain ligand
        placement. 
      </p>
      <p>  
        In the Interactive Viewer you can rotate/zoom the protein, swap ligands,
        toggle FragMaps, and change isovalue thresholds to explore interaction confidence
        levels and visualise the most relevant hotspots for ligand design.
      </p>
    </div>
  );
}
