import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'

import { Asset } from 'molstar/lib/mol-util/assets';
import { StateObjectSelector } from 'molstar/lib/mol-state';
import { PluginStateObject } from 'molstar/lib/mol-plugin-state/objects';
import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms';

import { createVolumeRepresentationParams } from 'molstar/lib/mol-plugin-state/helpers/volume-representation-params';
import { Volume } from 'molstar/lib/mol-model/volume/volume';

// ---- Create plugin ----
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'

export async function createMolstarPlugin(target: HTMLElement): Promise<PluginUIContext> {
  const spec = DefaultPluginUISpec()

  console.log('[Molstar] Initializing plugin with target:', target);
  const plugin = await createPluginUI({
    target,
    spec,
    render: renderReact18,
  })
  console.log('[Molstar] Plugin UI created');

  return plugin
}

// ---- Load protein ----
export async function loadProteinPdb(plugin: PluginUIContext, url: string) {
  const data = await plugin.builders.data.download({ url: Asset.Url(url) }, { state: { isGhost: true } });
  const trajectory = await plugin.builders.structure.parseTrajectory(data, 'pdb');
  const model = await plugin.builders.structure.createModel(trajectory);
  const structure = await plugin.builders.structure.createStructure(model);

  await plugin.builders.structure.representation.addRepresentation(structure, {
    type: 'cartoon',
    color: 'chain-id',
  });

  return structure;
}

// ---- Load ligand SDF (as separate structure) ----
export async function loadLigandSdf(plugin: PluginUIContext, url: string) {
  const data = await plugin.builders.data.download({ url: Asset.Url(url) }, { state: { isGhost: true } });
  const trajectory = await plugin.builders.structure.parseTrajectory(data, 'sdf');
  const model = await plugin.builders.structure.createModel(trajectory);
  const structure = await plugin.builders.structure.createStructure(model);

  await plugin.builders.structure.representation.addRepresentation(structure, {
    type: 'ball-and-stick',
    color: 'element-symbol',
    size: 'physical',
  });

  return { structure };
}

// ---- Volume loading: DX -> Volume.Data ----
export async function loadDxVolume(
  plugin: PluginUIContext,
  url: string,
): Promise<StateObjectSelector<PluginStateObject.Volume.Data>> {
  // Download the DX file
  const data = await plugin.builders.data.download({ url: Asset.Url(url) });
  
  // Parse it as DX format
  const parsed = await plugin.state.data.build().to(data).apply(StateTransforms.Data.ParseDx).commit() as any;
  
  // Convert DX to Volume
  const volume = await plugin.state.data.build().to(parsed).apply(StateTransforms.Volume.VolumeFromDx).commit() as any;
  
  console.log('[Molstar] Volume loaded from', url, ':', volume);
  return volume;
}

export type FragMapHandle = {
  volume: StateObjectSelector<PluginStateObject.Volume.Data>;
  repr: StateObjectSelector<PluginStateObject.Volume.Representation3D>;
};

export async function createIsosurface(
  plugin: PluginUIContext,
  volumeUrl: string,
  isoAbsValue: number,
): Promise<FragMapHandle> {
  try {
    console.log('[Molstar] Creating isosurface from:', volumeUrl, 'with iso value:', isoAbsValue);
    
    // Download the DX file
    const data = await plugin.builders.data.download({ url: Asset.Url(volumeUrl) });
    
    // Parse it as DX format
    const parsed = await plugin.state.data.build().to(data).apply(StateTransforms.Data.ParseDx).commit() as any;
    
    // Convert DX to Volume
    const volume = await plugin.state.data.build().to(parsed).apply(StateTransforms.Volume.VolumeFromDx).commit() as any;
    
    console.log('[Molstar] Volume created:', volume);

    if (!volume?.data) {
      console.warn('[Molstar] Warning: volume.data is undefined');
      return {
        volume,
        repr: {} as any,
      };
    }

    // Create an isosurface representation
    console.log('[Molstar] Creating VolumeRepresentation3D...');
    const repr = await plugin.state.data.build()
      .to(volume)
      .apply(
        StateTransforms.Representation.VolumeRepresentation3D,
        createVolumeRepresentationParams(plugin, volume.data, {
          type: 'isosurface',
          typeParams: {
            isoValue: Volume.IsoValue.absolute(isoAbsValue),
          },
        }),
      )
      .commit() as any;

    console.log('[Molstar] Isosurface created successfully:', repr);
    return {
      volume,
      repr,
    };
  } catch (error) {
    console.error('[Molstar] Error creating isosurface:', error);
    throw error;
  }
}

export async function setIsoValue(
  plugin: PluginUIContext,
  handle: FragMapHandle,
  isoAbsValue: number,
) {
  if (!handle.volume?.data || !handle.repr) return;

  const params = createVolumeRepresentationParams(plugin, handle.volume.data, {
    type: 'isosurface',
    typeParams: { isoValue: Volume.IsoValue.absolute(isoAbsValue) },
  });

  await plugin.build().to(handle.repr).update(params).commit();
}

export async function setVisibility(
  plugin: PluginUIContext,
  handle: FragMapHandle,
  visible: boolean,
) {
  if (!handle.repr?.cell?.transform.ref) return;
  await plugin.state.data.updateCellState(handle.repr.cell.transform.ref, { isHidden: !visible });
}

export async function removeFragmap(
  plugin: PluginUIContext,
  handle: FragMapHandle | null,
) {
  if (!handle?.volume?.cell) return;
  
  try {
    console.log('[Molstar] Removing fragmap representation and volume');
    // Remove the entire volume subtree, which includes the representation
    await plugin.state.data.build().delete(handle.volume.cell.transform.ref).commit();
  } catch (error) {
    console.warn('[Molstar] Error removing fragmap:', error);
    // If removal fails, just hide it instead
    if (handle.repr?.cell?.transform.ref) {
      await plugin.state.data.updateCellState(handle.repr.cell.transform.ref, { isHidden: true });
    }
  }
}

export async function removeLigand(
  plugin: PluginUIContext,
  structure: any,
) {
  if (!structure?.cell) return;
  
  try {
    console.log('[Molstar] Removing ligand structure');
    // Remove the entire structure subtree, which includes the representation
    await plugin.state.data.build().delete(structure.cell.transform.ref).commit();
  } catch (error) {
    console.warn('[Molstar] Error removing ligand:', error);
  }
}
