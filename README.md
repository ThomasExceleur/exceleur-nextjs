# Exceleur - Site Next.js

Site de formations Excel migre de WordPress/Elementor vers Next.js 14.

## Stack technique

- **Framework**: Next.js 14.2 (App Router)
- **Styling**: Tailwind CSS
- **Contenu**: MDX (Markdown + JSX)
- **TypeScript**: Oui
- **Hebergement**: Vercel

## Developpement

```bash
# Installation
npm install

# Developpement
npm run dev

# Build
npm run build

# Linting
npm run lint
```

## Structure

```
src/
├── app/           # Pages Next.js (App Router)
├── components/    # Composants React
├── lib/           # Utilitaires (MDX, config)
└── types/         # Types TypeScript

content/
├── blog/          # 434 articles MDX
├── formations/    # Pages formations
└── pages/         # Pages statiques

public/
└── images/        # Images du site
```

## Deploiement

```bash
vercel login
vercel --prod
```

Puis configurer le domaine `exceleur.fr` dans le dashboard Vercel.

## Stats

- 517 pages statiques generees
- 434 articles de blog
- 6 formations
- 62 categories

## Licence

Propriete de L'Exceleur.
