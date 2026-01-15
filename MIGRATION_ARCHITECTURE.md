# Migration WordPress/Elementor vers Next.js

## Objectif

Migrer le site https://exceleur.fr de WordPress/Elementor vers Next.js avec :
- **Contenu en Markdown (MDX)** : Plus de CMS externe, tout dans le repo
- **Mêmes URLs** : Conservation du SEO existant
- **Même design** : Reproduction fidèle de l'apparence actuelle
- **Gestion via Claude** : Édition du contenu directement dans les fichiers

## Stack technique cible

- **Framework** : Next.js 14+ (App Router)
- **Styling** : Tailwind CSS
- **Contenu** : MDX (Markdown + JSX)
- **Hébergement** : Vercel (gratuit)
- **TypeScript** : Oui

---

## Architecture multi-agents

```
┌─────────────────────────────────────────────────────────────┐
│                        PHASE 1                              │
│                       (parallèle)                           │
│  ┌─────────────────┐       ┌─────────────────┐             │
│  │   Agent 1       │       │   Agent 2       │             │
│  │   SCOUT         │       │   DESIGN        │             │
│  │                 │       │   EXTRACTOR     │             │
│  │  Crawl toutes   │       │                 │             │
│  │  les URLs       │       │  Analyse le     │             │
│  │                 │       │  design system  │             │
│  └────────┬────────┘       └────────┬────────┘             │
│           │                         │                       │
│           ▼                         ▼                       │
│    _meta/sitemap.json      _meta/design-system.json        │
└─────────────────────────────────────────────────────────────┘
                    │                         │
                    ▼                         ▼
┌─────────────────────────────────────────────────────────────┐
│                        PHASE 2                              │
│                       (parallèle)                           │
│  ┌─────────────────┐       ┌─────────────────┐             │
│  │   Agent 3       │       │   Agent 4       │             │
│  │   CONTENT       │       │   PROJECT       │             │
│  │   EXTRACTOR     │       │   BUILDER       │             │
│  │                 │       │                 │             │
│  │  Scrape +       │       │  Next.js +      │             │
│  │  Convert to MDX │       │  Components     │             │
│  └────────┬────────┘       └────────┬────────┘             │
│           │                         │                       │
│           ▼                         ▼                       │
│      content/**/*.mdx         src/components/              │
│      public/images/           tailwind.config.js           │
└─────────────────────────────────────────────────────────────┘
                    │                         │
                    └───────────┬─────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                        PHASE 3                              │
│                      (séquentiel)                           │
│              ┌─────────────────────────┐                   │
│              │       Agent 5           │                   │
│              │       PAGE BUILDER      │                   │
│              │                         │                   │
│              │  Assemble everything    │                   │
│              │  into final pages       │                   │
│              └───────────┬─────────────┘                   │
│                          │                                  │
│                          ▼                                  │
│                   Site complet prêt                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Fichiers de coordination

Ces fichiers servent de "contrats" entre les agents. Chaque agent produit ou consomme ces fichiers.

### `_meta/sitemap.json`

**Produit par** : Agent 1 (Scout)
**Consommé par** : Agent 3, Agent 4, Agent 5

```json
{
  "crawled_at": "2024-01-14T10:30:00Z",
  "base_url": "https://exceleur.fr",
  "pages": [
    {
      "url": "/",
      "type": "home",
      "title": "Exceleur - Formations Excel en ligne",
      "meta_description": "Apprenez Excel avec nos formations...",
      "priority": 1
    },
    {
      "url": "/blog",
      "type": "blog-index",
      "title": "Blog - Exceleur",
      "meta_description": "Tous nos articles sur Excel...",
      "priority": 0.8
    },
    {
      "url": "/blog/comment-faire-une-recherchev",
      "type": "blog-post",
      "title": "Comment faire une RECHERCHEV dans Excel",
      "meta_description": "Guide complet pour maîtriser...",
      "date": "2024-01-10",
      "category": "Formules",
      "priority": 0.6
    },
    {
      "url": "/formation/excel-debutant",
      "type": "formation",
      "title": "Formation Excel Débutant",
      "meta_description": "...",
      "priority": 0.9
    }
  ],
  "routing_patterns": {
    "home": "/",
    "blog-index": "/blog",
    "blog-post": "/blog/[slug]",
    "formation": "/formation/[slug]",
    "page": "/[slug]"
  },
  "stats": {
    "total": 47,
    "by_type": {
      "home": 1,
      "blog-index": 1,
      "blog-post": 35,
      "formation": 5,
      "page": 5
    }
  }
}
```

### `_meta/design-system.json`

**Produit par** : Agent 2 (Design Extractor)
**Consommé par** : Agent 4, Agent 5

```json
{
  "extracted_at": "2024-01-14T10:35:00Z",
  "colors": {
    "primary": "#2563eb",
    "primary-hover": "#1d4ed8",
    "primary-light": "#dbeafe",
    "secondary": "#10b981",
    "secondary-hover": "#059669",
    "background": "#ffffff",
    "background-alt": "#f8fafc",
    "background-dark": "#1e293b",
    "text": "#1e293b",
    "text-muted": "#64748b",
    "text-light": "#94a3b8",
    "text-on-dark": "#f8fafc",
    "border": "#e2e8f0",
    "error": "#ef4444",
    "success": "#22c55e"
  },
  "fonts": {
    "heading": {
      "family": "Poppins",
      "weights": [500, 600, 700],
      "google_url": "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap"
    },
    "body": {
      "family": "Inter",
      "weights": [400, 500, 600],
      "google_url": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
    }
  },
  "typography": {
    "h1": { "size": "3rem", "weight": 700, "line_height": 1.2 },
    "h2": { "size": "2.25rem", "weight": 600, "line_height": 1.3 },
    "h3": { "size": "1.5rem", "weight": 600, "line_height": 1.4 },
    "h4": { "size": "1.25rem", "weight": 600, "line_height": 1.4 },
    "body": { "size": "1rem", "weight": 400, "line_height": 1.6 },
    "small": { "size": "0.875rem", "weight": 400, "line_height": 1.5 }
  },
  "spacing": {
    "container_max": "1280px",
    "container_padding": "1.5rem",
    "section_padding_y": "5rem",
    "section_padding_y_mobile": "3rem",
    "card_padding": "1.5rem",
    "gap_sm": "0.5rem",
    "gap_md": "1rem",
    "gap_lg": "2rem",
    "gap_xl": "3rem"
  },
  "borders": {
    "radius_sm": "0.25rem",
    "radius_md": "0.5rem",
    "radius_lg": "1rem",
    "radius_full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  },
  "components": [
    {
      "name": "Header",
      "description": "Navigation principale fixe en haut de page",
      "structure": {
        "layout": "Flexbox horizontal, justify-between",
        "elements": [
          "Logo (image ou texte) à gauche",
          "Navigation links au centre (4-5 items)",
          "CTA button à droite"
        ],
        "mobile": "Logo + burger menu icon, menu en overlay"
      },
      "styles": {
        "background": "white",
        "height": "70px",
        "shadow": "sm (au scroll)",
        "position": "fixed top-0"
      }
    },
    {
      "name": "Footer",
      "description": "Pied de page avec plusieurs colonnes",
      "structure": {
        "layout": "4 colonnes sur desktop, stack sur mobile",
        "columns": [
          "Logo + description + réseaux sociaux",
          "Liens rapides",
          "Ressources / Blog",
          "Contact / Newsletter"
        ],
        "bottom": "Copyright + mentions légales"
      },
      "styles": {
        "background": "background-dark",
        "text_color": "text-on-dark",
        "padding": "section_padding_y"
      }
    },
    {
      "name": "HeroSection",
      "description": "Section d'accroche en haut de page",
      "structure": {
        "layout": "2 colonnes sur desktop (texte gauche, image droite)",
        "elements": [
          "Badge/étiquette (optionnel)",
          "Titre H1",
          "Sous-titre / description",
          "CTA buttons (1 ou 2)",
          "Image/illustration"
        ]
      },
      "styles": {
        "background": "white ou gradient léger",
        "padding": "section_padding_y"
      }
    },
    {
      "name": "BlogCard",
      "description": "Card pour afficher un article de blog",
      "structure": {
        "layout": "Vertical",
        "elements": [
          "Image cover (ratio 16:9)",
          "Catégorie badge",
          "Titre H3",
          "Extrait (2 lignes max)",
          "Date + temps de lecture"
        ]
      },
      "styles": {
        "background": "white",
        "border_radius": "radius_lg",
        "shadow": "md",
        "hover": "shadow_lg + translateY(-4px)",
        "transition": "all 0.2s ease"
      }
    },
    {
      "name": "Button",
      "variants": [
        {
          "name": "primary",
          "background": "primary",
          "text": "white",
          "hover": "primary-hover"
        },
        {
          "name": "secondary",
          "background": "transparent",
          "text": "primary",
          "border": "primary",
          "hover": "primary background, white text"
        },
        {
          "name": "ghost",
          "background": "transparent",
          "text": "text",
          "hover": "background-alt"
        }
      ],
      "styles": {
        "padding": "0.75rem 1.5rem",
        "border_radius": "radius_md",
        "font_weight": 500,
        "transition": "all 0.2s ease"
      }
    },
    {
      "name": "SectionTitle",
      "description": "Titre de section avec sous-titre optionnel",
      "structure": {
        "layout": "Centré",
        "elements": [
          "Étiquette/badge (optionnel)",
          "Titre H2",
          "Sous-titre paragraphe"
        ]
      },
      "styles": {
        "text_align": "center",
        "max_width": "600px",
        "margin": "0 auto margin_bottom_lg"
      }
    },
    {
      "name": "FeatureCard",
      "description": "Card pour présenter une fonctionnalité/avantage",
      "structure": {
        "elements": [
          "Icône (dans cercle coloré)",
          "Titre H4",
          "Description"
        ]
      },
      "styles": {
        "padding": "card_padding",
        "text_align": "center ou left selon contexte"
      }
    },
    {
      "name": "TestimonialCard",
      "description": "Card pour un témoignage client",
      "structure": {
        "elements": [
          "Quote/texte du témoignage",
          "Avatar",
          "Nom",
          "Titre/entreprise",
          "Étoiles (optionnel)"
        ]
      },
      "styles": {
        "background": "white",
        "border_radius": "radius_lg",
        "shadow": "md",
        "padding": "card_padding"
      }
    },
    {
      "name": "CTASection",
      "description": "Section d'appel à l'action",
      "structure": {
        "layout": "Centré",
        "elements": [
          "Titre H2",
          "Description courte",
          "Button(s)"
        ]
      },
      "styles": {
        "background": "primary ou gradient",
        "text_color": "white",
        "padding": "section_padding_y",
        "border_radius": "radius_lg (si dans container)"
      }
    }
  ],
  "tailwind_config": {
    "theme": {
      "extend": {
        "colors": {
          "primary": {
            "DEFAULT": "#2563eb",
            "hover": "#1d4ed8",
            "light": "#dbeafe"
          },
          "secondary": {
            "DEFAULT": "#10b981",
            "hover": "#059669"
          }
        },
        "fontFamily": {
          "heading": ["Poppins", "sans-serif"],
          "body": ["Inter", "sans-serif"]
        },
        "container": {
          "center": true,
          "padding": "1.5rem",
          "screens": {
            "xl": "1280px"
          }
        }
      }
    }
  }
}
```

---

## Prompts des agents

### Agent 1 : Scout

```markdown
# Mission : Cartographier le site exceleur.fr

Tu es un agent de crawling. Ta mission est d'explorer exhaustivement le site https://exceleur.fr et de créer une carte complète de toutes ses pages.

## Objectifs

1. **Trouver TOUTES les URLs** du site (pages, articles de blog, formations, etc.)
2. **Classifier chaque page** par type (home, blog-post, formation, page statique, etc.)
3. **Extraire les métadonnées** de base de chaque page (title, meta description)
4. **Identifier les patterns de routing** pour la migration Next.js

## Méthode de crawling

1. **Commence par le sitemap** : Vérifie si `/sitemap.xml` ou `/sitemap_index.xml` existe
2. **Crawl depuis la homepage** : Parcours tous les liens internes
3. **Explore les menus** : Header, footer, sidebars
4. **Règles** :
   - Ne suis PAS les liens externes (autres domaines)
   - Ignore les ancres (#section)
   - Ignore les paramètres de query (?utm_source=...)
   - Normalise les URLs (pas de trailing slash sauf pour /)

## Classification des types de pages

| Type | Pattern URL | Description |
|------|-------------|-------------|
| `home` | `/` | Page d'accueil |
| `blog-index` | `/blog` ou `/blog/` | Liste des articles |
| `blog-post` | `/blog/*` | Article individuel |
| `formation` | `/formation/*` | Page de formation |
| `page` | `/*` | Autre page statique |

## Pour chaque page, extrais :

- `url` : URL relative (ex: `/blog/mon-article`)
- `type` : Type de page (voir classification)
- `title` : Balise <title>
- `meta_description` : Meta description
- `date` : Date de publication (si article de blog)
- `category` : Catégorie (si applicable)
- `priority` : Priorité SEO (1 pour home, 0.9 pour formations, 0.6 pour articles)

## Output attendu

Crée le fichier `_meta/sitemap.json` avec la structure suivante :

```json
{
  "crawled_at": "ISO timestamp",
  "base_url": "https://exceleur.fr",
  "pages": [
    {
      "url": "/",
      "type": "home",
      "title": "...",
      "meta_description": "...",
      "priority": 1
    }
  ],
  "routing_patterns": {
    "home": "/",
    "blog-index": "/blog",
    "blog-post": "/blog/[slug]"
  },
  "stats": {
    "total": 47,
    "by_type": { ... }
  }
}
```

## Critères de succès

- [ ] Toutes les URLs du site sont listées
- [ ] Chaque URL a un type correct
- [ ] Pas de doublons
- [ ] Le fichier JSON est valide
```

---

### Agent 2 : Design Extractor

```markdown
# Mission : Extraire le design system de exceleur.fr

Tu es un agent d'analyse visuelle. Ta mission est d'analyser le design du site https://exceleur.fr et d'en extraire un design system complet et exploitable.

## Objectifs

1. **Extraire la palette de couleurs** (primary, secondary, backgrounds, text, etc.)
2. **Identifier les fonts** (familles, weights, où elles sont utilisées)
3. **Documenter les composants UI** (header, footer, cards, buttons, sections, etc.)
4. **Préparer une configuration Tailwind** prête à l'emploi

## Méthode d'analyse

1. **Homepage** : Analyse complète (c'est la référence principale)
2. **Page blog** : Vérifie la liste d'articles et les cards
3. **Article de blog** : Analyse la mise en page du contenu
4. **Page formation** : Identifie les spécificités

Pour chaque page :
- Prends un snapshot visuel
- Inspecte les styles CSS (couleurs exactes, fonts, espacements)
- Note les variations (hover, responsive)

## Éléments à extraire

### Couleurs
- Primary (boutons principaux, liens)
- Secondary (accents)
- Background (fond principal, fond alterné)
- Text (principal, muted, light)
- Border
- Success, Error, Warning (si présents)

### Fonts
- Font des titres (h1, h2, h3...)
- Font du corps de texte
- Weights utilisés
- Tailles pour chaque niveau

### Espacements
- Padding des sections
- Margins entre éléments
- Gap dans les grids
- Container max-width

### Composants à documenter

Pour chaque composant, décris :
- **Structure** : Quels éléments, dans quel ordre
- **Layout** : Flexbox/Grid, alignement
- **Styles** : Couleurs, shadows, borders, radius
- **États** : Hover, active, focus
- **Responsive** : Comportement mobile/tablet

Composants obligatoires :
1. Header / Navigation
2. Footer
3. Hero Section
4. Blog Card
5. Button (toutes variantes)
6. Section titles
7. CTA sections
8. Feature cards (si présent)
9. Testimonials (si présent)
10. Forms (si présent)

## Output attendu

Crée le fichier `_meta/design-system.json` avec la structure documentée (voir exemple dans la documentation principale).

## Critères de succès

- [ ] Toutes les couleurs sont en format hex
- [ ] Les fonts sont identifiées avec leurs Google Fonts URLs
- [ ] Chaque composant majeur est documenté
- [ ] La config Tailwind est prête à être utilisée
- [ ] Les comportements responsive sont notés
```

---

### Agent 3 : Content Extractor

```markdown
# Mission : Extraire et convertir le contenu en MDX

Tu es un agent d'extraction de contenu. Ta mission est de récupérer tout le contenu du site https://exceleur.fr et de le convertir en fichiers MDX propres.

## Input requis

Avant de commencer, lis le fichier `_meta/sitemap.json` pour avoir la liste complète des URLs à traiter.

## Objectifs

Pour chaque URL listée dans le sitemap :
1. **Extraire le contenu principal** (pas le header/footer, juste le contenu de la page)
2. **Récupérer les images** et les télécharger localement
3. **Convertir en fichier MDX** avec frontmatter approprié

## Structure de sortie

```
content/
├── pages/
│   ├── index.mdx          # Homepage
│   ├── a-propos.mdx       # Page "À propos"
│   └── contact.mdx        # Page "Contact"
├── blog/
│   ├── article-slug-1.mdx
│   ├── article-slug-2.mdx
│   └── ...
└── formations/
    ├── excel-debutant.mdx
    └── ...

public/
└── images/
    ├── pages/
    │   └── home/
    │       └── hero.jpg
    ├── blog/
    │   └── article-slug-1/
    │       ├── cover.jpg
    │       └── screenshot-1.png
    └── formations/
        └── excel-debutant/
            └── cover.jpg
```

## Format MDX

### Pour les articles de blog :

```mdx
---
title: "Titre exact de l'article"
description: "Meta description de l'article"
slug: "slug-de-larticle"
type: "blog-post"
date: "2024-01-10"
updated: "2024-01-12"
image: "/images/blog/slug-de-larticle/cover.jpg"
category: "Formules"
tags: ["Excel", "RECHERCHEV", "Formules"]
author: "Nom de l'auteur"
reading_time: "5 min"
---

Contenu de l'article en Markdown...

## Sous-titre

Paragraphe avec **gras** et *italique*.

![Description de l'image](/images/blog/slug-de-larticle/screenshot-1.png)

### Liste

- Item 1
- Item 2
- Item 3

> Citation ou bloc important

```excel
=RECHERCHEV(A1;B:C;2;FAUX)
```
```

### Pour les pages statiques :

```mdx
---
title: "Titre de la page"
description: "Meta description"
slug: "slug-page"
type: "page"
---

Contenu de la page...
```

### Pour les formations :

```mdx
---
title: "Formation Excel Débutant"
description: "Apprenez les bases d'Excel..."
slug: "excel-debutant"
type: "formation"
image: "/images/formations/excel-debutant/cover.jpg"
price: "297"
duration: "10h"
level: "Débutant"
modules:
  - title: "Introduction"
    lessons: 5
  - title: "Les formules de base"
    lessons: 8
---

Description longue de la formation...
```

## Règles d'extraction

### Contenu
- Préserve le contenu EXACT (pas de réécriture)
- Garde la structure sémantique (h1, h2, h3, listes, etc.)
- Convertis les tableaux HTML en Markdown
- Garde les blocs de code tels quels

### Liens
- Convertis les liens internes en relatifs :
  - `https://exceleur.fr/blog/article` → `/blog/article`
- Garde les liens externes tels quels

### Images
- Télécharge chaque image dans le bon dossier
- Renomme si nécessaire (pas de caractères spéciaux)
- Mets à jour les src dans le contenu
- Note les dimensions si pertinent

### Embeds
- Garde les iframes YouTube/Vimeo
- Note les embeds spéciaux dans le frontmatter si besoin

### Contenu Elementor
- Elementor génère du HTML complexe
- Extrais le TEXTE et la STRUCTURE, pas le markup Elementor
- Ignore les classes CSS d'Elementor
- Reconstruit une structure Markdown propre

## Ordre de traitement

1. Homepage
2. Pages statiques importantes
3. Formations
4. Articles de blog (par date décroissante)

## Critères de succès

- [ ] Tous les fichiers MDX sont créés
- [ ] Toutes les images sont téléchargées
- [ ] Les frontmatter sont complets et corrects
- [ ] Le Markdown est valide et bien formaté
- [ ] Les liens internes sont convertis
- [ ] Pas de contenu Elementor/HTML résiduel
```

---

### Agent 4 : Project Builder

```markdown
# Mission : Créer le projet Next.js avec composants

Tu es un agent de scaffolding. Ta mission est de créer la structure complète du projet Next.js avec tous les composants nécessaires.

## Input requis

Avant de commencer, lis :
- `_meta/sitemap.json` pour la structure de routing
- `_meta/design-system.json` pour le design

## Objectifs

1. **Initialiser un projet Next.js 14+** avec App Router
2. **Configurer Tailwind CSS** avec le design system extrait
3. **Créer tous les composants UI** identifiés
4. **Mettre en place le système MDX** pour le contenu
5. **Créer la structure de routing** (pages placeholder)

## Stack technique

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- next-mdx-remote (pour le MDX)
- clsx + tailwind-merge (pour les classes conditionnelles)

## Structure du projet

```
exceleur-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout racine
│   │   ├── page.tsx             # Homepage
│   │   ├── globals.css          # Styles globaux
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Article
│   │   ├── formation/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Formation
│   │   └── [slug]/
│   │       └── page.tsx         # Pages dynamiques
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Input.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── blog/
│   │       ├── BlogCard.tsx
│   │       ├── BlogList.tsx
│   │       └── BlogContent.tsx
│   ├── lib/
│   │   ├── mdx.ts               # Utilitaires MDX
│   │   ├── utils.ts             # Helpers généraux
│   │   └── config.ts            # Configuration site
│   └── types/
│       └── index.ts             # Types TypeScript
├── content/                      # (créé par Agent 3)
│   ├── pages/
│   ├── blog/
│   └── formations/
├── public/
│   ├── images/                  # (créé par Agent 3)
│   ├── fonts/
│   └── favicon.ico
├── _meta/                       # Fichiers de coordination
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Configuration Tailwind

Utilise la config de `_meta/design-system.json` :

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Copier depuis design-system.json
      },
      fontFamily: {
        // Copier depuis design-system.json
      },
      // ... autres extensions
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
```

## Composants à créer

Crée chaque composant listé dans `design-system.json > components`.

Chaque composant doit :
- Être en TypeScript avec props typées
- Utiliser Tailwind pour le styling
- Être responsive (mobile-first)
- Avoir les états hover/focus appropriés

### Exemple de composant Button :

```tsx
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
            'border border-primary text-primary hover:bg-primary hover:text-white': variant === 'secondary',
            'text-text hover:bg-background-alt': variant === 'ghost',
          },
          {
            'px-3 py-1.5 text-sm rounded': size === 'sm',
            'px-4 py-2 text-base rounded-md': size === 'md',
            'px-6 py-3 text-lg rounded-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
```

## Système MDX

```typescript
// src/lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface PostMeta {
  title: string
  description: string
  slug: string
  date: string
  image?: string
  category?: string
  tags?: string[]
}

export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta
  content: string
}> {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: data as PostMeta,
    content,
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const postsDirectory = path.join(contentDirectory, 'blog')
  const filenames = fs.readdirSync(postsDirectory)

  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      return data as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}
```

## Pages placeholder

Les pages peuvent être de simples placeholders :

```tsx
// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="container py-20">
      <h1>Homepage - TODO</h1>
      <p>Cette page sera complétée par l'Agent 5</p>
    </div>
  )
}
```

## Critères de succès

- [ ] `npm install` fonctionne sans erreur
- [ ] `npm run dev` lance le serveur
- [ ] Tous les composants sont créés et importables
- [ ] Tailwind est configuré avec le design system
- [ ] Le routing correspond aux patterns du sitemap
- [ ] Les utilitaires MDX fonctionnent
```

---

### Agent 5 : Page Builder

```markdown
# Mission : Assembler les pages finales

Tu es un agent d'assemblage. Ta mission est de finaliser toutes les pages du site en intégrant le contenu MDX et les composants créés.

## Input requis

- Le projet Next.js créé par l'Agent 4
- Le contenu MDX créé par l'Agent 3
- `_meta/sitemap.json` pour vérification
- `_meta/design-system.json` pour référence visuelle

## Objectifs

1. **Compléter chaque page** avec le bon layout et contenu
2. **Implémenter les pages de liste** (blog index, formations)
3. **Configurer le SEO** (metadata Next.js)
4. **Vérifier la cohérence** avec le design original
5. **S'assurer que toutes les URLs fonctionnent**

## Pages à implémenter

### Homepage (`src/app/page.tsx`)

```tsx
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { getPageContent } from '@/lib/mdx'

export const metadata = {
  title: 'Exceleur - Formations Excel en ligne',
  description: '...',
}

export default async function HomePage() {
  const content = await getPageContent('index')

  return (
    <>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        cta={content.hero.cta}
      />
      <Features items={content.features} />
      <Testimonials items={content.testimonials} />
      <CTA />
    </>
  )
}
```

### Blog Index (`src/app/blog/page.tsx`)

```tsx
import { getAllPosts } from '@/lib/mdx'
import { BlogList } from '@/components/blog/BlogList'

export const metadata = {
  title: 'Blog - Exceleur',
  description: 'Tous nos articles et tutoriels Excel',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogList posts={posts} />
    </div>
  )
}
```

### Article de blog (`src/app/blog/[slug]/page.tsx`)

```tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { BlogContent } from '@/components/blog/BlogContent'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostBySlug(params.slug)

  return {
    title: `${meta.title} - Exceleur`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [{ url: meta.image }] : [],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  try {
    const { meta, content } = await getPostBySlug(params.slug)

    return <BlogContent meta={meta} content={content} />
  } catch {
    notFound()
  }
}
```

## SEO Checklist

Pour chaque page, assure-toi que :

- [ ] `title` est défini et unique
- [ ] `description` est définie (150-160 caractères)
- [ ] `openGraph` est configuré (title, description, image)
- [ ] Les images ont des `alt` descriptifs
- [ ] Les headings sont hiérarchiques (h1 > h2 > h3)
- [ ] Les URLs sont propres (pas de trailing slash sauf /)

## Validation finale

À la fin de ton travail, vérifie :

1. **Build réussi** :
   ```bash
   npm run build
   ```
   Doit passer sans erreur.

2. **Toutes les URLs** :
   Compare avec `_meta/sitemap.json` - chaque URL doit avoir sa page.

3. **Liens internes** :
   Aucun lien cassé (404).

4. **Images** :
   Toutes les images s'affichent.

5. **Responsive** :
   Vérifie sur mobile, tablet, desktop.

## Rapport final

Crée un fichier `_meta/migration-report.json` :

```json
{
  "completed_at": "ISO timestamp",
  "pages_created": 47,
  "pages_by_type": {
    "home": 1,
    "blog-post": 35,
    "formation": 5,
    "page": 6
  },
  "images_migrated": 120,
  "build_status": "success",
  "warnings": [
    "Page /ancienne-page redirigée vers /nouvelle-page"
  ],
  "errors": []
}
```

## Critères de succès

- [ ] Toutes les pages sont implémentées
- [ ] Le build Next.js passe
- [ ] Toutes les URLs du sitemap original fonctionnent
- [ ] Le design correspond à l'original
- [ ] Le SEO est correctement configuré
- [ ] Le rapport de migration est créé
```

---

## Orchestration

### Ordre d'exécution

```
PHASE 1 (parallèle)
├── Agent 1 : Scout
│   └── Output: _meta/sitemap.json
└── Agent 2 : Design Extractor
    └── Output: _meta/design-system.json

        ↓ (attendre que les deux soient terminés)

PHASE 2 (parallèle)
├── Agent 3 : Content Extractor
│   ├── Input: _meta/sitemap.json
│   └── Output: content/**, public/images/**
└── Agent 4 : Project Builder
    ├── Input: _meta/sitemap.json, _meta/design-system.json
    └── Output: src/**, config files

        ↓ (attendre que les deux soient terminés)

PHASE 3 (séquentiel)
└── Agent 5 : Page Builder
    ├── Input: tout ce qui précède
    └── Output: pages finales, _meta/migration-report.json
```

### Script d'orchestration (conceptuel)

```typescript
async function runMigration() {
  console.log('🚀 Démarrage de la migration...')

  // Phase 1 : Parallèle
  console.log('📍 Phase 1 : Cartographie et Design')
  await Promise.all([
    runAgent('scout', SCOUT_PROMPT),
    runAgent('design-extractor', DESIGN_PROMPT)
  ])

  // Vérification intermédiaire
  if (!fileExists('_meta/sitemap.json') || !fileExists('_meta/design-system.json')) {
    throw new Error('Phase 1 échouée - fichiers manquants')
  }

  // Phase 2 : Parallèle
  console.log('📦 Phase 2 : Extraction et Construction')
  await Promise.all([
    runAgent('content-extractor', CONTENT_PROMPT),
    runAgent('project-builder', PROJECT_PROMPT)
  ])

  // Phase 3 : Séquentiel
  console.log('🔧 Phase 3 : Assemblage final')
  await runAgent('page-builder', PAGEBUILDER_PROMPT)

  // Validation
  console.log('✅ Migration terminée !')
  console.log('📊 Rapport:', readFile('_meta/migration-report.json'))
}
```

---

## Points d'attention

### 1. Contenu Elementor

Elementor génère du HTML très verbeux avec beaucoup de divs imbriquées. L'Agent 3 devra :
- Ignorer les classes CSS Elementor
- Extraire uniquement le contenu textuel
- Reconstruire une structure sémantique propre

### 2. Images

- Certaines images peuvent être en WebP, d'autres en JPG/PNG
- Vérifier les dimensions et optimiser si nécessaire
- Gérer les images manquantes ou cassées

### 3. URLs spéciales

Attention aux :
- Pages avec paramètres (ex: `/page/?ref=xxx`)
- Redirections existantes
- Pages en double (avec et sans trailing slash)

### 4. Formulaires

Si le site a des formulaires (contact, newsletter) :
- Option 1 : Utiliser un service externe (Formspree, Getform)
- Option 2 : Créer des API routes Next.js

### 5. Analytics et tracking

Ne pas oublier de :
- Migrer le Google Analytics (ou autre)
- Vérifier les pixels Facebook/LinkedIn si présents

---

## Checklist finale

### Avant migration
- [ ] Backup du site WordPress existant
- [ ] Liste des redirections nécessaires (si URLs changent)
- [ ] Accès au domaine pour changer les DNS

### Après migration
- [ ] Tester toutes les pages
- [ ] Vérifier le SEO (Google Search Console)
- [ ] Tester les formulaires
- [ ] Vérifier le tracking analytics
- [ ] Configurer les redirections si nécessaire
- [ ] Soumettre le nouveau sitemap à Google

---

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vercel Deployment](https://vercel.com/docs)
