export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h2>P38 MAP Kinase — Overview</h2>

      <p>
        P38 MAP kinase (P38 MAPK) is a signaling enzyme involved in cellular responses to
        stress and inflammation; it plays a key role in pathways controlling cytokine
        production, cell differentiation and apoptosis. The demo shows the 3FLY crystal
        structure of P38 and related ligands analysed in the SILCS study.
      </p>

      <p>
        SILCS FragMaps are three-dimensional maps that capture favorable interaction regions
        for different physicochemical fragment types (e.g. hydrophobic, H-bond donors/acceptors).
        They help interpret why ligands bind where they do by highlighting hotspots and exclusion
        regions. Use the Interactive Viewer to explore the protein, switch ligands, toggle
        FragMaps, and adjust isovalue thresholds to inspect surface contours.
      </p>
    </div>
  );
}
