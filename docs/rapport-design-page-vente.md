# Rapport : Design de Page de Vente Formation
## Structure, Hiérarchie Visuelle & Bonnes Pratiques

---

## 1. LA STRUCTURE IDÉALE (ordre des sections)

Une page de vente de formation suit un parcours psychologique précis. Chaque section a un rôle :

### La séquence optimale :

| # | Section | Rôle psychologique | Longueur |
|---|---------|-------------------|----------|
| 1 | **Hero / Accroche** | Capter l'attention, identifier le problème | 1 écran |
| 2 | **Problème / Douleur** | Agiter le problème, créer l'empathie | 2-3 paragraphes |
| 3 | **Pont / Transition** | "Il existe une meilleure façon" | 1-2 phrases |
| 4 | **Solution / Promesse** | Présenter la méthode (pas le produit) | 2-3 paragraphes |
| 5 | **Preuve sociale #1** | Témoignages, résultats élèves | 3-5 témoignages |
| 6 | **Contenu / Programme** | Ce qu'ils vont apprendre (modules) | Liste structurée |
| 7 | **À qui c'est destiné** | "C'est pour toi si..." / "Pas pour toi si..." | 2 listes |
| 8 | **Preuve sociale #2** | Plus de témoignages, résultats chiffrés | 3-5 témoignages |
| 9 | **L'offre / Prix** | Présentation de l'offre, ancrage prix | 1 bloc |
| 10 | **Garantie** | Réduire le risque perçu | 1 paragraphe |
| 11 | **FAQ** | Lever les dernières objections | 5-8 questions |
| 12 | **CTA final + Urgence** | Dernier appel à l'action | 1 bloc |

### Variante "Slippery Slide" (que tu as dans Notion) :
Même structure mais avec des micro-hooks entre chaque section qui forcent à continuer la lecture. Chaque section se termine par une phrase qui crée de la curiosité pour la suivante.

---

## 2. HIÉRARCHIE VISUELLE — Les 5 règles d'or

### Règle 1 : Maximum 3 niveaux typographiques
- **H1** (32-48px, bold) → Titres de section principaux
- **H2** (22-28px, semi-bold) → Sous-titres
- **Body** (16-18px, regular) → Texte courant

❌ Erreur classique : 5-6 tailles de texte différentes → le lecteur ne sait plus ce qui est important.

### Règle 2 : Maximum 2-3 couleurs
- **Couleur primaire** → CTA et éléments d'action (1 seule couleur pour tous les boutons)
- **Couleur d'accent** → Surlignage, éléments à mettre en avant
- **Noir/gris** → Texte

❌ Pas de dégradés sur le texte, pas de couleurs vives partout. La couleur vive = rare = puissante.

### Règle 3 : Largeur de lecture contrôlée
- Texte principal : **max 680px de large** (60-75 caractères par ligne)
- Les paragraphes trop larges tuent la lisibilité
- Sur mobile : marges latérales de 16-24px minimum

### Règle 4 : Espacement vertical généreux
- **Entre sections** : 80-120px d'espace blanc
- **Entre paragraphes** : 24-32px
- **Entre titre et texte** : 16-24px
- L'espace blanc n'est pas du gaspillage, c'est de la hiérarchie

### Règle 5 : Un seul type de CTA
- Même bouton, même couleur, même texte partout
- Placer un CTA : après le hero, après la preuve sociale, après l'offre, en fin de page
- Le CTA doit être le seul élément "qui bouge" visuellement (couleur la plus contrastée)

---

## 3. CE QUI CONVERTIT vs CE QUI DISTRAIT

### ✅ Ce qui convertit :
| Élément | Pourquoi |
|---------|----------|
| **Texte court, scannable** | 79% des visiteurs scannent, ne lisent pas (Nielsen) |
| **Bullet points** | 2-3x plus lus que les paragraphes |
| **Sous-titres fréquents** | Un sous-titre tous les 2-3 paragraphes, formulé comme un bénéfice |
| **Témoignages avec photo** | +35% de crédibilité (réel > stock) |
| **Résultats chiffrés** | "2578 élèves formés" > "des milliers d'élèves" |
| **Ancrage de prix** | Montrer la valeur avant le prix |
| **Urgence réelle** | Compteur + date de fermeture |
| **FAQ** | Chaque question = une objection écrasée |

### ❌ Ce qui distrait/tue les conversions :
| Élément | Pourquoi |
|---------|----------|
| **Animations d'entrée** | Retardent la lecture, fatiguent l'œil |
| **Sliders/Carrousels** | 1% de clic sur les slides après la première |
| **Vidéo en autoplay** | Agressive, fait fuir |
| **Menu de navigation** | Donne une porte de sortie → pas de menu sur une page de vente |
| **Sidebar** | Distraction latérale |
| **Trop d'images décoratives** | Du bruit visuel sans valeur |
| **Pop-ups** | Interrompt le flow de lecture |
| **Multiples couleurs de CTA** | Confusion sur l'action à prendre |
| **Polices fantaisie** | Réduisent la lisibilité |

---

## 4. PATTERNS DESIGN ÉPROUVÉS

### Pattern "Centre Stage" (le plus efficace pour les formations)
```
┌─────────────────────────────────────┐
│         [Logo petit, discret]        │
│                                     │
│     TITRE ACCROCHE (H1, centré)     │
│     Sous-titre 1-2 lignes           │
│         [ CTA BOUTON ]              │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│     Le problème (texte gauche)      │
│     aligné à gauche, 680px max      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│     "Il existe une autre façon"     │
│         (centré, accent color)      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│     La solution / La méthode        │
│     (gauche, avec bullet points)    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │Témoin│  │Témoin│  │Témoin│      │
│  │  #1  │  │  #2  │  │  #3  │      │
│  └──────┘  └──────┘  └──────┘     │
│                                     │
│         [ CTA BOUTON ]              │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│     Programme / Modules             │
│     ☑ Module 1 - ...               │
│     ☑ Module 2 - ...               │
│     ☑ Module 3 - ...               │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       BLOC OFFRE            │   │
│  │  Valeur : 1497€             │   │
│  │  Prix lancement : 497€     │   │
│  │  Ou 3x 179€                │   │
│  │       [ CTA BOUTON ]        │   │
│  │  Garantie 30 jours          │   │
│  └─────────────────────────────┘   │
│                                     │
│     FAQ (accordéon)                 │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│     DERNIER APPEL                   │
│     (urgence + CTA)                 │
│         [ CTA BOUTON ]              │
└─────────────────────────────────────┘
```

### Principes du pattern :
- **Fond blanc dominant** (85%+ de la page)
- **1 seule colonne** pour le texte (pas de layout 2 colonnes sauf témoignages)
- **Alternance centré/gauche** pour le rythme visuel
- **Séparateurs subtils** (ligne fine ou espace blanc, pas de couleur de fond alternée)
- **Le bloc offre** est le seul élément avec un fond différent (léger gris ou bordure)

---

## 5. TYPOGRAPHIE — Choix concrets

### Combinaisons qui marchent :
| Titres | Body | Style |
|--------|------|-------|
| **Inter Bold** | Inter Regular | Clean, moderne |
| **DM Sans Bold** | DM Sans Regular | Chaleureux, accessible |
| **Outfit Semibold** | Source Sans Regular | Moderne, pro |
| **Cal Sans** | Inter Regular | Startup, tech |

### Règles :
- **1 seule famille** de police (ou 2 max : une pour titres, une pour body)
- **Line-height** : 1.6-1.8 pour le body (aéré)
- **Paragraphes** : max 3-4 lignes. Puis saut de ligne.
- **Bold** pour les mots-clés dans le texte (1-2 par paragraphe, pas plus)

---

## 6. LE TEST DU SQUINT (validation rapide)

Méthode NN Group pour valider ta hiérarchie :

1. **Plisse les yeux** devant ta page (ou applique un flou gaussien 10px)
2. Tu dois voir immédiatement :
   - Le titre principal
   - Les boutons CTA (seuls éléments colorés qui ressortent)
   - Les blocs de témoignages
   - Le bloc prix/offre
3. Si tout se mélange → la hiérarchie est cassée
4. Si 2 éléments se battent pour l'attention → en supprimer/atténuer un

---

## 7. RECOMMANDATIONS SPÉCIFIQUES POUR LE DÉCOLLAGE

Basé sur ce que je connais de ta formation :

1. **Hero** : "La Règle des 95% pour devenir autonome sur Excel" + sous-titre paradoxe silencieux + 1 CTA
2. **Pas de menu de navigation** → page 100% dédiée à la conversion
3. **Pas d'animations** → le contenu doit couler naturellement
4. **Compteur de deadline** → sticky en haut ou en bas, discret mais visible
5. **Témoignages** → utiliser les vrais retours de tes 2578+ élèves
6. **Bloc prix** → ancrage valeur réelle vs prix promo + facilités de paiement
7. **Mobile first** → 60%+ de tes visiteurs viendront d'email sur mobile

### Stack technique suggéré :
- Next.js (tu as déjà exceleur-nextjs)
- Tailwind CSS
- Pas de framework d'animation
- Font : Inter ou DM Sans (system-ui en fallback)

---

## Sources
- Nielsen Norman Group — Visual Hierarchy in UX (nngroup.com)
- Joanna Wiebe / Copyhackers — Long-form sales page methodology
- Nick Kolenda — Psychological principles in sales page design
- ConversionXL — Landing page optimization research
- Baymard Institute — E-commerce checkout & form design studies
