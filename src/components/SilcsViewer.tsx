import 'molstar/build/viewer/molstar.css';

import { useEffect, useRef, useState } from 'react';
import { SILCS_3FLY } from '../data/silcs3fly';
import {
  createMolstarPlugin,
  loadProteinPdb,
  loadLigandSdf,
  createIsosurface,
  setIsoValue,
  setVisibility,
  removeFragmap,
  removeLigand,
  type FragMapHandle,
} from '../lib/molstar-utils';

export default function SilcsViewer() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const pluginRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const [activeLigandId, setActiveLigandId] = useState(SILCS_3FLY.ligands[0]?.id ?? '');
  const [activeFragIdx, setActiveFragIdx] = useState(2); // default hbacc in our list above
  const activeFrag = SILCS_3FLY.fragmaps[activeFragIdx];

  const [iso, setIso] = useState(Math.abs(activeFrag.defaultIso));
  const [fragVisible, setFragVisible] = useState(true);

  const ligandState = useRef<{ structure?: any } | null>(null);
  const fragHandleRef = useRef<FragMapHandle | null>(null);

  // init viewer
  useEffect(() => {
    let disposed = false;

    (async () => {
      if (!hostRef.current || initializedRef.current) return;
      
      try {
        // Only initialize once
        initializedRef.current = true;
        
        console.log('[SilcsViewer] Creating molstar plugin...');
        const plugin = await createMolstarPlugin(hostRef.current);
        if (disposed) return;
        pluginRef.current = plugin;
        console.log('[SilcsViewer] Plugin created successfully');

        console.log('[SilcsViewer] Loading protein PDB...');
        await loadProteinPdb(plugin, SILCS_3FLY.proteinPdbUrl);
        console.log('[SilcsViewer] Protein loaded');

        // initial ligand
        const lig = SILCS_3FLY.ligands.find((l) => l.id === activeLigandId);
        if (lig) {
          console.log('[SilcsViewer] Loading ligand:', lig.name);
          const { structure } = await loadLigandSdf(plugin, lig.sdfUrl);
          ligandState.current = { structure };
          console.log('[SilcsViewer] Ligand loaded');
        }

        // initial fragmap isosurface
        console.log('[SilcsViewer] Loading initial fragmap:', activeFrag.label);
        fragHandleRef.current = await createIsosurface(plugin, activeFrag.url, iso);
        console.log('[SilcsViewer] Fragmap loaded');
        
        await setVisibility(plugin, fragHandleRef.current, fragVisible);
        console.log('[SilcsViewer] Initialization complete');
      } catch (error) {
        console.error('[SilcsViewer] Initialization error:', error);
        initializedRef.current = false;
      }
    })();

    return () => {
      disposed = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ligand swap
  useEffect(() => {
    (async () => {
      const plugin = pluginRef.current;
      if (!plugin) return;

      try {
        console.log('[SilcsViewer] Swapping ligand to:', activeLigandId);
        
        // Remove prior ligand structure
        if (ligandState.current?.structure) {
          console.log('[SilcsViewer] Removing previous ligand');
          await removeLigand(plugin, ligandState.current.structure);
        }

        const lig = SILCS_3FLY.ligands.find((l) => l.id === activeLigandId);
        if (!lig) return;

        console.log('[SilcsViewer] Loading ligand:', lig.name);
        const { structure } = await loadLigandSdf(plugin, lig.sdfUrl);
        ligandState.current = { structure };
        console.log('[SilcsViewer] Ligand swap complete');
      } catch (error) {
        console.error('[SilcsViewer] Error swapping ligand:', error);
      }
    })();
  }, [activeLigandId]);

  // fragmap swap
  useEffect(() => {
    (async () => {
      const plugin = pluginRef.current;
      if (!plugin) return;

      try {
        const next = SILCS_3FLY.fragmaps[activeFragIdx];
        const nextIso = Math.abs(next.defaultIso);
        setIso(nextIso);

        console.log('[SilcsViewer] Swapping fragmap to:', next.label);
        
        // Remove old fragmap representation and volume
        if (fragHandleRef.current) {
          console.log('[SilcsViewer] Removing previous fragmap');
          await removeFragmap(plugin, fragHandleRef.current);
        }

        // Load new fragmap
        fragHandleRef.current = await createIsosurface(plugin, next.url, nextIso);
        await setVisibility(plugin, fragHandleRef.current, fragVisible);
        
        console.log('[SilcsViewer] Fragmap swap complete');
      } catch (error) {
        console.error('[SilcsViewer] Error swapping fragmap:', error);
      }
    })();
  }, [activeFragIdx]);

  // iso update
  useEffect(() => {
    (async () => {
      const plugin = pluginRef.current;
      const handle = fragHandleRef.current;
      if (!plugin || !handle) return;
      await setIsoValue(plugin, handle, iso);
    })().catch(console.error);
  }, [iso]);

  // visibility update
  useEffect(() => {
    (async () => {
      const plugin = pluginRef.current;
      const handle = fragHandleRef.current;
      if (!plugin || !handle) return;
      await setVisibility(plugin, handle, fragVisible);
    })().catch(console.error);
  }, [fragVisible]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100vh' }}>
      <div style={{ padding: 12, borderRight: '1px solid #ddd', fontFamily: 'system-ui' }}>
        <h3 style={{ marginTop: 0 }}>P38 MAPK (3FLY) — SILCS FragMaps</h3>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Ligand</div>
          <select value={activeLigandId} onChange={(e) => setActiveLigandId(e.target.value)} style={{ width: '100%', padding: 8 }}>
            {SILCS_3FLY.ligands.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>FragMap</div>
          <select value={String(activeFragIdx)} onChange={(e) => setActiveFragIdx(Number(e.target.value))} style={{ width: '100%', padding: 8 }}>
            {SILCS_3FLY.fragmaps.map((fm, idx) => (
              <option key={fm.key} value={idx}>
                {fm.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={fragVisible} onChange={(e) => setFragVisible(e.target.checked)} />
            Show FragMap surface
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Iso-value (absolute)</div>
          <input type="range" min={0} max={10} step={0.05} value={iso} onChange={(e) => setIso(Number(e.target.value))} style={{ width: '100%' }} />
          <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{iso.toFixed(2)}</div>
        </div>

        <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>
          Tip: Start around iso=0.5–2.0 if the surface is too large or too small.
        </div>
      </div>

      <div ref={hostRef} style={{ position: 'relative' }} />
    </div>
  );
}
