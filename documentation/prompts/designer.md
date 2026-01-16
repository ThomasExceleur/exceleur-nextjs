Objectif

  Rendre le site Next.js (localhost:3000) visuellement identique à exceleur.fr. Chaque page, chaque composant doit être une copie pixel-perfect du site WordPress/Elementor original.

  Méthodologie

  Pour chaque page/composant, tu dois :

  1. Capturer le design original : Utilise Playwright (browser MCP) pour naviguer sur exceleur.fr et prendre un snapshot de la page
  2. Analyser les styles : Note les valeurs exactes (couleurs hex, font-family, font-size, line-height, padding, margin, border-radius, box-shadow, etc.)
  3. Comparer avec localhost : Navigue sur le même chemin en localhost et identifie les différences
  4. Corriger : Modifie les composants/styles pour correspondre exactement
  5. Valider : Vérifie visuellement que c'est identique

  Pages à traiter (par ordre de priorité)

  1. Homepage (/)
    - Hero section (titre, sous-titre, CTA, image)
    - Section témoignages
    - Section formations
    - Section blog
  2. Header (global)
    - Logo
    - Navigation
    - Bouton CTA
    - Menu mobile
  3. Footer (global)
    - Structure
    - Liens
    - Copyright
  4. Page article blog (/excel-formule-si ou similaire)
    - Titre H1
    - Méta (date, catégorie)
    - Contenu (typographie, images, code blocks)
    - Sidebar/suggestions
  5. Page formation (/formations-excel/le-decollage-liste-attente)
    - Hero
    - Sections de contenu
    - CTA
  6. Pages statiques (/mentions-legales, /a-propos, etc.)

  Éléments à vérifier systématiquement
  ┌─────────────┬─────────────────────────────────────────────────────────────────────────┐
  │   Élément   │                          Propriétés à extraire                          │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Typographie │ font-family, font-size, font-weight, line-height, letter-spacing, color │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Espacements │ padding, margin, gap                                                    │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Couleurs    │ background-color, color, border-color (valeurs hex exactes)             │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Bordures    │ border-width, border-radius, border-style                               │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Ombres      │ box-shadow                                                              │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Images      │ dimensions, object-fit, border-radius                                   │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Boutons     │ tous les états (hover, active, focus)                                   │
  ├─────────────┼─────────────────────────────────────────────────────────────────────────┤
  │ Liens       │ couleur, underline, hover state                                         │
  └─────────────┴─────────────────────────────────────────────────────────────────────────┘
  Instructions techniques

  - Utilise browser_snapshot pour capturer l'accessibilité tree
  - Utilise browser_evaluate avec getComputedStyle() pour extraire les valeurs CSS exactes
  - Utilise browser_take_screenshot pour référence visuelle si nécessaire
  - Compare les valeurs avec celles dans Tailwind config et les composants

  Critères de succès

  - Header identique (desktop + mobile)
  - Footer identique
  - Homepage identique (toutes sections)
  - Page article blog identique
  - Page formation identique
  - Typographie cohérente sur tout le site
  - Couleurs exactement les mêmes
  - Espacements identiques
  - Responsive breakpoints identiques

  Livrables attendus

  1. Liste des différences trouvées par composant
  2. Modifications apportées aux fichiers
  3. Validation visuelle finale

  ---
  Tu veux que j'ajoute ou modifie quelque chose dans ce prompt ?