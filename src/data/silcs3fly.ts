export type FragMapKey =
  | 'acec'
  | 'apolar'
  | 'hbacc'
  | 'hbdon'
  | 'mamn'
  | 'meoo'
  | 'tipo'
  | 'excl';

export type LigandOption = { id: string; name: string; sdfUrl: string };
export type FragMapOption = { key: FragMapKey; label: string; url: string; defaultIso: number };

export const SILCS_3FLY = {
  proteinPdbUrl: '/from_silcsbio/3fly.pdb',

  // Use the SILCS-provided “posref” versions (aligned poses)
  ligands: [
    { id: 'cryst-posref', name: '3FLY crystal ligand (posref)', sdfUrl: '/from_silcsbio/3fly_cryst_lig_posref.sdf' },
    { id: '2e', name: 'Goldstein 2E (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_05_2e.sdf' },
    { id: '2f', name: 'Goldstein 2F (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_06_2f.sdf' },
    { id: '2g', name: 'Goldstein 2G (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_07_2g.sdf' },
    { id: '2h', name: 'Goldstein 2H (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_07_2h.sdf' },
    { id: '2i', name: 'Goldstein 2I (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_07_2i.sdf' },
    // FIXME: Add more as desired (keep it to ~6–10 for a demo; you can still include all files in repo)
  ] satisfies LigandOption[],

  // DX maps (preferred for first implementation)
  fragmaps: [
    { key: 'acec',  label: 'ACEC (acceptor)', url: '/from_silcsbio/maps/3fly.acec.gfe.dx',  defaultIso: 1.0 },
    { key: 'apolar',label: 'APOLAR',          url: '/from_silcsbio/maps/3fly.apolar.gfe.dx',defaultIso: 1.0 },
    { key: 'hbacc', label: 'HBACC (H-bond acceptor)', url: '/from_silcsbio/maps/3fly.hbacc.gfe.dx', defaultIso: 1.0 },
    { key: 'hbdon', label: 'HBDON (H-bond donor)',    url: '/from_silcsbio/maps/3fly.hbdon.gfe.dx', defaultIso: 1.0 },
    { key: 'mamn',  label: 'MAMN',            url: '/from_silcsbio/maps/3fly.mamn.gfe.dx', defaultIso: 1.0 },
    { key: 'meoo',  label: 'MEOO',            url: '/from_silcsbio/maps/3fly.meoo.gfe.dx', defaultIso: 1.0 },
    { key: 'tipo',  label: 'TIPO',            url: '/from_silcsbio/maps/3fly.tipo.gfe.dx', defaultIso: 1.0 },
    { key: 'excl',  label: 'EXCL (exclusion)',url: '/from_silcsbio/maps/3fly.excl.dx',     defaultIso: 1.0 },
  ] satisfies FragMapOption[],
} as const;

