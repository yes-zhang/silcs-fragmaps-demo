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
  proteinPdbUrl: '/public/from_silcsbio/3fly.pdb',

  // Use the SILCS-provided “posref” versions (aligned poses)
  ligands: [
    { id: 'cryst-posref', name: '3FLY crystal ligand (posref)', sdfUrl: '/from_silcsbio/3fly_cryst_lig_posref.sdf' },
    { id: '2e', name: 'Goldstein 2E (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_05_2e.sdf' },
    { id: '2f', name: 'Goldstein 2F (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_06_2f.sdf' },
    { id: '2g', name: 'Goldstein 2G (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_07_2g.sdf' },
    { id: '2h', name: 'Goldstein 2H (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_08_2h.sdf' },
    { id: '2i', name: 'Goldstein 2I (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_09_2i.sdf' },
    { id: '2j', name: 'Goldstein 2J (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_10_2j.sdf' },
    { id: '2k', name: 'Goldstein 2K (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_11_2k.sdf' },
    { id: '2l', name: 'Goldstein 2L (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_12_2l.sdf' },
    { id: '2m', name: 'Goldstein 2M (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_13_2m.sdf' },
    { id: '2n', name: 'Goldstein 2N (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_14_2n.sdf' },
    { id: '2o', name: 'Goldstein 2O (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_15_2o.sdf' },
    { id: '2p', name: 'Goldstein 2P (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_16_2p.sdf' },
    { id: '2q', name: 'Goldstein 2Q (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_17_2q.sdf' },
    { id: '2r', name: 'Goldstein 2R (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_18_2r.sdf' },
    { id: '2s', name: 'Goldstein 2S (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_19_2s_s.sdf' },
    { id: '2t', name: 'Goldstein 2T (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_20_2t.sdf' },
    { id: '2u', name: 'Goldstein 2U (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_21_2u.sdf' },
    { id: '2v', name: 'Goldstein 2V (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_22_2v.sdf' },
    { id: '2x', name: 'Goldstein 2X (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_24_2x.sdf' },
    { id: '2y', name: 'Goldstein 2Y (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_25_2y.sdf' },
    { id: '2z', name: 'Goldstein 2Z (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_26_2z.sdf' },
    { id: '2aa', name: 'Goldstein 2AA (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_27_2aa.sdf' },
    { id: '2bb', name: 'Goldstein 2BB (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_28_2bb.sdf' },
    { id: '2cc', name: 'Goldstein 2CC (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_29_2cc_3fls.sdf' },
    { id: '2dd', name: 'Goldstein 2DD (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_30_2dd_3flq.sdf' },
    { id: '2ee', name: 'Goldstein 2EE (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_31_2ee.sdf' },
    { id: '2ff', name: 'Goldstein 2FF (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_32_2ff.sdf' },
    { id: '2gg', name: 'Goldstein 2GG (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_33_2gg.sdf' },
    { id: '2hh', name: 'Goldstein 2HH (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_34_2hh_3fmk.sdf' },
    { id: '2ii', name: 'Goldstein 2II (posref)', sdfUrl: '/from_silcsbio/ligands_posref/p38_goldstein_35_2ii_3fmh.sdf' },
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

