# Audit Page d'Accueil — WordPress vs Next.js

**Date :** 2026-02-08

## Structure WordPress (sections dans l'ordre)

1. **Hero** — "Faites d'Excel la compétence la plus rentable de votre carrière"
2. **Logos de confiance** — "Ils m'ont fait confiance" (Trescal, Bluewin, ESCP, Hermès, European Sourcing)
3. **À propos de Thomas** — Bio complète
4. **Méthode** — "Plusieurs formations, une seule méthode" (4 piliers)
5. **⚠️ Financement** — "Faites financer votre formation" (Qualiopi, OPCO, CPF, TOSA)
6. **Programmes** — 7 formations détaillées (Le Décollage, La Machine, La Slide, ExcelGPT, Power Query Secrets, TCD Express, Excel Avancé)
7. **⚠️ Témoignages** — "Plus de 2000 stagiaires accompagnés" + 3 témoignages (Romain P., Virginie D., Eddine S.)
8. **Livre** — "Révèle l'exceleur qui est en toi !"
9. **Instagram** — Lien Instagram
10. **Newsletter** — "Rejoignez la #REFérence"
11. **Presse** — "Ils parlent de nous"

## Structure Next.js actuelle

1. ✅ Hero
2. ✅ TrustLogos
3. ✅ AboutThomas
4. ✅ MethodSection
5. ✅ ProgramsSection (mais seulement 4 formations sur 7)
6. ✅ StatsSection (compteurs uniquement, PAS de témoignages)
7. ✅ BookSection
8. ✅ InstagramSection
9. ✅ Newsletter
10. ✅ PressSection

## Éléments MANQUANTS dans Next.js

### 🔴 Critique — Section Témoignages
- WordPress affiche 3 témoignages détaillés (Romain P., Virginie D., Eddine S.) dans un carousel
- Next.js a un composant `TestimonialCarousel` existant mais **non utilisé** sur la homepage
- Le `StatsSection` affiche les compteurs mais aucun témoignage
- **Action :** Ajouter les témoignages dans StatsSection ou créer une section dédiée

### 🔴 Critique — Section Financement (Qualiopi/OPCO/CPF)
- WordPress a une section dédiée "Faites financer votre formation" avec mention de Qualiopi, OPCO, CPF et TOSA
- **Totalement absente** de Next.js (aucun composant, aucune mention)
- **Action :** Créer un composant `FinancingSection`

### 🟡 Important — Formations manquantes dans ProgramsSection
- Next.js : 4 formations (Le Décollage, La Machine, La Slide, Power Query Secrets)
- WordPress : 7 formations (+ExcelGPT, TCD Express, Excel Avancé)
- **Action :** Ajouter les 3 formations manquantes

### 🟢 Mineur — Détails des formations
- WordPress liste les bullet points détaillés de chaque formation + dates d'inscription
- Next.js a des descriptions courtes uniquement
- **Recommandation :** Les pages individuelles de formation gèrent probablement ce détail, OK pour la homepage

## Actions réalisées

- [x] Rapport d'audit créé
- [x] Témoignages ajoutés — `TestimonialsSection.tsx` créé avec les 3 témoignages (Romain, Virginie, Eddine) via le `TestimonialCarousel` existant
- [x] Section Financement créée — `FinancingSection.tsx` (Qualiopi, OPCO, CPF, TOSA)
- [x] Formations manquantes ajoutées — ExcelGPT, TCD Express, Excel Avancé dans `ProgramsSection`
- [x] `page.tsx` mis à jour avec les nouvelles sections dans le bon ordre
- [x] Exports ajoutés dans `index.ts`
- [x] TypeScript compile sans erreur
- [ ] **TODO** : Vérifier que les images des nouvelles formations existent dans `/public/images/formations/`
- [ ] **TODO** : Ajouter les vrais liens URL pour les podcasts dans PressSection (actuellement `#`)
