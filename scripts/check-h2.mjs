import fs from 'fs';

const files = [
  'excel-additionner-les-heures-et-les-minutes-2',
  'excel-afficher-le-jour-de-la-semaine-2',
  'excel-formule-si',
  'excel-remplacer-une-couleur-par-une-autre',
  'excel-sous-total',
  'excel-formule-somme',
  'excel-calcul-de-la-tva',
  'excel-recherche-multicriteres',
  'nb-si-ens-excel-compter-additionner',
  'quelle-formule-excel-pour-additionner-des-heures',
];

for (const slug of files) {
  const raw = fs.readFileSync('content/blog/' + slug + '.mdx', 'utf-8');
  const h2s = (raw.match(/^## .+/gm) || []);
  const lines = raw.split('\n');
  const longLines = lines.filter(l => l.length > 500).length;
  const fenceCount = (raw.match(/^`{3}/gm) || []).length;
  const unclosed = fenceCount % 2 !== 0;
  console.log(`${slug}: ${h2s.length} H2, ${lines.length} lines, ${longLines} long(>500), fences: ${fenceCount}${unclosed ? ' UNCLOSED' : ' ok'}`);
}
