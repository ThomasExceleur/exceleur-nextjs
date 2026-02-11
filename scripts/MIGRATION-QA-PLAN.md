# Plan de Vérification Migration WordPress → Next.js

## Contexte

- **Site source** : exceleur.fr (WordPress, 381 articles)
- **Site cible** : Next.js avec contenu MDX dans `content/blog/`
- **Enjeu** : 1 000+ clics/jour sur le blog, aucune perte de trafic acceptable
- **Approche** : Hybride — scripts automatisés + agents IA

---

## Architecture globale

```
┌──────────────────────────────────────────────────┐
│               ORCHESTRATEUR                       │
│         scripts/run-qa.mjs                        │
│                                                   │
│  1. Lance les 6 agents en parallèle               │
│  2. Collecte les rapports JSON de chaque agent    │
│  3. Génère un rapport consolidé HTML              │
│  4. Affiche un résumé terminal (pass/warn/fail)   │
└──────────┬───────────────────────────────────────┘
           │
   ┌───────┼───────┬───────┬───────┬───────┐
   ▼       ▼       ▼       ▼       ▼       ▼
 Agent1  Agent2  Agent3  Agent4  Agent5  Agent6
 Script  Script    IA    Script  Script  Script
```

### Structure des fichiers

```
scripts/
├── MIGRATION-QA-PLAN.md          ← ce document
├── run-qa.mjs                    ← orchestrateur principal
├── qa-report/                    ← rapports générés
│   ├── report.json               ← rapport consolidé JSON
│   └── report.html               ← rapport visuel HTML
└── agents/
    ├── agent1-content-diff.mjs   ← comparaison contenu WP vs MDX
    ├── agent2-link-checker.mjs   ← vérification des liens
    ├── agent3-seo.mjs            ← conformité SEO (IA-assisté)
    ├── agent4-images.mjs         ← images et médias
    ├── agent5-formatting.mjs     ← qualité du Markdown
    └── agent6-routing.mjs        ← redirections et routage
```

---

## Phase 1 — Agents automatisés (scripts Node.js)

### Agent 2 : Link Checker

**Fichier** : `scripts/agents/agent2-link-checker.mjs`
**Type** : Script automatisé
**Priorité** : Haute

#### Vérifications

| # | Check | Seuil pass | Seuil warn | Seuil fail |
|---|-------|-----------|-----------|-----------|
| 2.1 | Chaque lien Markdown `[texte](url)` dans les MDX est accessible | 100% | > 95% | < 95% |
| 2.2 | Liens internes : le slug cible existe dans `content/blog/` ou dans les routes Next.js | 100% | - | < 100% |
| 2.3 | Liens externes : retournent HTTP 200 (tolérance 3xx) | > 95% | > 90% | < 90% |
| 2.4 | Liens internes exceleur.fr convertis en chemins relatifs | 100% | - | < 100% |
| 2.5 | Aucun lien placeholder (`lien-interne-1`, `href="#"`, `href="/"`) | 0 trouvés | - | > 0 |

#### Logique

```
Pour chaque fichier MDX :
  1. Extraire tous les liens Markdown avec regex
  2. Classifier : interne (relatif ou exceleur.fr) vs externe
  3. Liens internes → vérifier que le slug existe en fichier MDX ou route
  4. Liens externes → HTTP HEAD request avec timeout 5s
  5. Détecter les liens exceleur.fr absolus non convertis en relatifs
  6. Reporter : { file, url, type, status, httpCode }
```

#### Output

```json
{
  "agent": "link-checker",
  "status": "pass|warn|fail",
  "summary": { "total": 249, "ok": 245, "broken": 2, "unconverted": 2 },
  "issues": [
    { "file": "article.mdx", "url": "https://...", "type": "external", "httpCode": 404 }
  ]
}
```

---

### Agent 4 : Images & Media

**Fichier** : `scripts/agents/agent4-images.mjs`
**Type** : Script automatisé
**Priorité** : Moyenne

#### Vérifications

| # | Check | Seuil pass | Seuil fail |
|---|-------|-----------|-----------|
| 4.1 | Chaque image `![alt](url)` dans les MDX est accessible (HTTP 200) | 100% | < 100% |
| 4.2 | Les `featuredImage` du frontmatter sont accessibles | 100% | < 100% |
| 4.3 | Les images WordPress (wp-content/uploads) sont soit migrées soit accessibles | 100% | < 95% |
| 4.4 | Les attributs `alt` sont présents (pas vides) | > 90% | < 50% |

#### Logique

```
Pour chaque fichier MDX :
  1. Parser le frontmatter → extraire featuredImage
  2. Extraire les images Markdown ![alt](url) et les <img> HTML résiduels
  3. Pour chaque URL image → HTTP HEAD avec timeout 5s
  4. Vérifier que alt n'est pas vide
  5. Lister les images hébergées sur wp-content/uploads (à migrer potentiellement)
  6. Reporter : { file, imageUrl, accessible, hasAlt, isWordPressHosted }
```

---

### Agent 5 : Formatting Quality

**Fichier** : `scripts/agents/agent5-formatting.mjs`
**Type** : Script automatisé
**Priorité** : Haute

#### Vérifications

| # | Check | Seuil pass | Seuil fail |
|---|-------|-----------|-----------|
| 5.1 | Aucun HTML résiduel dans le contenu MDX (hors frontmatter) | 0 tags | > 5 tags/fichier |
| 5.2 | Les blocs de code sont fermés (``` ouvrant = ``` fermant) | 100% | < 100% |
| 5.3 | Pas de caractères d'encodage cassés (`&amp;`, `&#8217;`, `&rsquo;`, etc.) | 0 trouvés | > 0 |
| 5.4 | Les tableaux Markdown sont syntaxiquement valides | 100% | < 90% |
| 5.5 | Le frontmatter YAML est parseable sans erreur | 100% | < 100% |
| 5.6 | Pas de lignes excessivement longues (> 2000 chars, signe de HTML inline) | 0 | > 5 |

#### Logique

```
Pour chaque fichier MDX :
  1. Parser le frontmatter avec gray-matter (catch erreurs YAML)
  2. Dans le body :
     a. Regex pour tags HTML résiduels : <[a-z][^>]*> (hors code blocks)
     b. Compter les ``` ouvrants vs fermants
     c. Chercher les entités HTML non converties
     d. Valider la structure des tableaux Markdown (| header | / |---| / | row |)
     e. Détecter les lignes > 2000 chars
  3. Reporter : { file, htmlTags: [], brokenCodeBlocks, badEntities: [], yamlValid }
```

---

### Agent 6 : Routing & Redirects

**Fichier** : `scripts/agents/agent6-routing.mjs`
**Type** : Script automatisé
**Priorité** : Critique

#### Vérifications

| # | Check | Seuil pass | Seuil fail |
|---|-------|-----------|-----------|
| 6.1 | Chaque slug du sitemap WordPress a un MDX correspondant | 100% | < 100% |
| 6.2 | Aucune collision de slug avec les routes réservées (`blog-excel`, `formations-excel`, `categorie`) | 0 collisions | > 0 |
| 6.3 | `generateStaticParams()` retourne tous les slugs MDX | 100% | < 100% |
| 6.4 | Les slugs `-2` WordPress ont bien leur MDX (pas de redirect cassé) | 100% | < 100% |
| 6.5 | Le sitemap Next.js (si existant) contient toutes les URLs | 100% | < 95% |

#### Logique

```
1. Fetcher le sitemap WordPress : /post-sitemap.xml
2. Extraire tous les slugs WP
3. Lister tous les fichiers MDX dans content/blog/
4. Croiser : pour chaque slug WP, un MDX existe ?
5. Lire src/app/[slug]/page.tsx → vérifier les routes réservées
6. Exécuter mentalement generateStaticParams → tous les MDX sont générés ?
7. Reporter : { wpSlugs: 381, mdxFiles: 381, matched: 380, missing: [...], collisions: [...] }
```

---

## Phase 2 — Agents IA (Claude / LLM-assisté)

### Agent 1 : Content Diff

**Fichier** : `scripts/agents/agent1-content-diff.mjs`
**Type** : Hybride (script + IA pour évaluation sémantique)
**Priorité** : Critique

#### Vérifications

| # | Check | Méthode | Seuil pass | Seuil fail |
|---|-------|---------|-----------|-----------|
| 1.1 | Le nombre de mots MDX est proche du WP | Script : ratio mots | ratio > 0.90 | ratio < 0.75 |
| 1.2 | Toutes les sections H2/H3 du WP sont dans le MDX | Script : extraction headings | 100% match | < 90% |
| 1.3 | Le sens du contenu est préservé | IA : comparaison sémantique | IA dit "conforme" | IA dit "divergent" |
| 1.4 | Les données factuelles (stats, chiffres, noms) sont identiques | IA : extraction d'entités | 100% | < 95% |
| 1.5 | Pas de contenu "hallucination" ajouté par la conversion | IA : détection de contenu inventé | 0 trouvé | > 0 |

#### Logique

```
Phase A — Pré-filtrage automatisé (rapide, tous les articles) :
  1. Fetcher le contenu WP via API
  2. Lire le MDX correspondant
  3. Comparer : nombre de mots, nombre de headings, ratio de similarité
  4. Si ratio < 0.90 ou headings manquants → flag pour review IA

Phase B — Review IA (seulement les articles flaggés) :
  1. Envoyer au LLM : "Voici le contenu WordPress et le contenu MDX.
     Compare-les et signale : sections manquantes, données modifiées,
     contenu ajouté, changements de sens."
  2. Le LLM retourne un verdict structuré JSON
  3. Reporter les divergences
```

#### Prompt IA (agent 1, phase B)

```
Tu es un agent QA spécialisé dans la vérification de migration de contenu.

CONTENU SOURCE (WordPress HTML) :
{wp_content}

CONTENU CIBLE (MDX Markdown) :
{mdx_content}

Compare ces deux versions et retourne un JSON avec :
{
  "verdict": "conforme" | "divergence_mineure" | "divergence_majeure",
  "word_count_wp": number,
  "word_count_mdx": number,
  "missing_sections": ["titre de section manquante"],
  "modified_facts": ["description du changement factuel"],
  "added_content": ["contenu présent dans MDX mais pas dans WP"],
  "encoding_issues": ["caractères mal encodés trouvés"],
  "notes": "commentaire libre"
}
```

---

### Agent 3 : SEO Compliance

**Fichier** : `scripts/agents/agent3-seo.mjs`
**Type** : Hybride (script + IA pour évaluation qualitative)
**Priorité** : Critique

#### Vérifications

| # | Check | Méthode | Seuil pass | Seuil fail |
|---|-------|---------|-----------|-----------|
| 3.1 | Le `title` frontmatter correspond au `<title>` WordPress | Script : comparaison string | Identique ou amélioré | Totalement différent |
| 3.2 | La `description` frontmatter est pertinente et unique | Script + IA | Présente et > 100 chars | Absente ou dupliquée |
| 3.3 | Le slug URL est identique entre WP et Next.js | Script : comparaison exacte | 100% | < 100% |
| 3.4 | La date de publication est préservée | Script : comparaison date | 100% | < 100% |
| 3.5 | Les catégories sont correctement mappées | Script : WP catID → nom vs MDX | > 90% | < 80% |
| 3.6 | La meta description n'est pas tronquée ni générique | IA : évaluation qualité | IA approuve | IA signale problème |
| 3.7 | Pas de cannibalisation : chaque article a un title unique | Script : détection doublons | 0 doublons | > 0 |

#### Logique

```
Phase A — Vérifications automatisées :
  1. Pour chaque article : comparer title WP vs title MDX frontmatter
  2. Vérifier que slug WP == nom fichier MDX (sans .mdx)
  3. Comparer date WP vs date frontmatter
  4. Mapper category IDs WP → noms, comparer avec frontmatter
  5. Détecter les titles/descriptions dupliqués dans le corpus MDX

Phase B — Évaluation IA (échantillon ou articles flaggés) :
  1. "Cette meta description est-elle pertinente pour le contenu ?"
  2. "Le title est-il optimisé pour le SEO tout en restant fidèle ?"
```

---

## Orchestrateur

**Fichier** : `scripts/run-qa.mjs`

### Fonctionnement

```javascript
// Pseudo-code
const agents = [
  { name: 'content-diff',  file: './agents/agent1-content-diff.mjs',  type: 'hybrid' },
  { name: 'link-checker',  file: './agents/agent2-link-checker.mjs',  type: 'script' },
  { name: 'seo',           file: './agents/agent3-seo.mjs',           type: 'hybrid' },
  { name: 'images',        file: './agents/agent4-images.mjs',        type: 'script' },
  { name: 'formatting',    file: './agents/agent5-formatting.mjs',    type: 'script' },
  { name: 'routing',       file: './agents/agent6-routing.mjs',       type: 'script' },
];

// Phase 1 : Lancer tous les agents scripts en parallèle
const scriptResults = await Promise.all(
  agents.filter(a => a.type === 'script').map(a => runAgent(a))
);

// Phase 2 : Lancer les agents hybrides (qui peuvent appeler un LLM)
const hybridResults = await Promise.all(
  agents.filter(a => a.type === 'hybrid').map(a => runAgent(a))
);

// Phase 3 : Consolider
const report = consolidate([...scriptResults, ...hybridResults]);
writeJSON('scripts/qa-report/report.json', report);
writeHTML('scripts/qa-report/report.html', report);
printSummary(report);
```

### Format du rapport consolidé

```json
{
  "timestamp": "2026-02-11T10:00:00Z",
  "overall_status": "warn",
  "summary": {
    "total_articles": 381,
    "pass": 375,
    "warn": 4,
    "fail": 2
  },
  "agents": {
    "content-diff": { "status": "pass", "issues": 0 },
    "link-checker": { "status": "warn", "issues": 4 },
    "seo": { "status": "pass", "issues": 0 },
    "images": { "status": "fail", "issues": 12 },
    "formatting": { "status": "pass", "issues": 0 },
    "routing": { "status": "pass", "issues": 0 }
  },
  "articles": {
    "article-slug": {
      "status": "warn",
      "checks": {
        "content-diff": "pass",
        "links": "warn",
        "seo": "pass",
        "images": "pass",
        "formatting": "pass",
        "routing": "pass"
      },
      "issues": [
        { "agent": "link-checker", "severity": "warn", "message": "1 lien externe retourne 301" }
      ]
    }
  }
}
```

---

## Rapport HTML

Le rapport HTML généré affichera :

1. **Dashboard** — Vue d'ensemble avec indicateurs vert/orange/rouge par agent
2. **Par agent** — Liste détaillée des issues trouvées, triées par sévérité
3. **Par article** — Fiche de santé de chaque article avec tous les checks
4. **Actions requises** — Liste triée des corrections à faire, du plus critique au moins critique

---

## Ordre d'implémentation

| Étape | Agent | Effort | Impact |
|-------|-------|--------|--------|
| 1 | Agent 6 : Routing | ~1h | Critique — s'assurer que toutes les URLs marchent |
| 2 | Agent 5 : Formatting | ~1h | Haut — détecter les MDX cassés avant déploiement |
| 3 | Agent 2 : Link Checker | ~2h | Haut — liens cassés = mauvaise UX et SEO |
| 4 | Agent 1 : Content Diff (phase A seulement) | ~1h | Critique — détecter les articles tronqués |
| 5 | Agent 4 : Images | ~1h | Moyen — images cassées visibles par les utilisateurs |
| 6 | Agent 3 : SEO (phase A seulement) | ~1h | Critique — préserver le trafic organique |
| 7 | Orchestrateur + rapport HTML | ~2h | — |
| 8 | Agent 1 phase B (IA) | ~2h | Bonus — vérification sémantique profonde |
| 9 | Agent 3 phase B (IA) | ~1h | Bonus — évaluation qualitative SEO |

**Total estimé : ~12h de développement**

---

## Dépendances techniques

| Package | Usage | Déjà installé ? |
|---------|-------|-----------------|
| `gray-matter` | Parser frontmatter YAML | Oui |
| `turndown` | Conversion HTML → MD (pour comparaison) | Oui |
| `node-fetch` ou `fetch` natif | HTTP requests | Oui (Node 22) |
| Anthropic SDK (optionnel) | Appels LLM pour agents IA | À installer si phase B |

---

## Utilisation

```bash
# Lancer toute la suite de vérification
node scripts/run-qa.mjs

# Lancer un agent spécifique
node scripts/agents/agent2-link-checker.mjs

# Lancer seulement les agents scripts (sans IA)
node scripts/run-qa.mjs --scripts-only

# Lancer sur un article spécifique
node scripts/run-qa.mjs --slug=excel-formule-recherchex

# Ouvrir le rapport HTML
open scripts/qa-report/report.html
```

---

## Critères de Go/No-Go pour la mise en production

| Critère | Condition pour Go |
|---------|-------------------|
| Routing | 100% des slugs WordPress ont un MDX correspondant |
| Content | 0 article tronqué (ratio mots > 0.90 pour tous) |
| Links | 0 lien interne cassé, < 5% liens externes en 404 |
| Formatting | 0 MDX avec erreur YAML, 0 code block non fermé |
| SEO | 100% des titles et descriptions présents et uniques |
| Images | < 5% d'images inaccessibles |
