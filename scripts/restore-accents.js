#!/usr/bin/env node
/**
 * Script to restore French accents in MDX files
 * Run with: node scripts/restore-accents.js
 */

const fs = require('fs');
const path = require('path');

// Comprehensive list of French words with missing accents
// Format: [pattern (case-insensitive), replacement function or string]
const accentReplacements = [
  // É at the beginning (capital)
  [/\bEtape\b/g, 'Étape'],
  [/\bEtapes\b/g, 'Étapes'],
  [/\bEtat\b/g, 'État'],
  [/\bEtats\b/g, 'États'],
  [/\bEtre\b/g, 'Être'],
  [/\bEves\b/g, 'Èves'],
  [/\bEviter\b/g, 'Éviter'],
  [/\bEvitez\b/g, 'Évitez'],
  [/\bEvaluer\b/g, 'Évaluer'],
  [/\bEvaluez\b/g, 'Évaluez'],
  [/\bEvaluation\b/g, 'Évaluation'],
  [/\bEvenement\b/g, 'Événement'],
  [/\bEvenements\b/g, 'Événements'],
  [/\bEvidemment\b/g, 'Évidemment'],
  [/\bEgalement\b/g, 'Également'],
  [/\bEleve\b/g, 'Élève'],
  [/\bEleves\b/g, 'Élèves'],
  [/\bElement\b/g, 'Élément'],
  [/\bElements\b/g, 'Éléments'],
  [/\bEquipe\b/g, 'Équipe'],
  [/\bEquipes\b/g, 'Équipes'],
  [/\bEcran\b/g, 'Écran'],
  [/\bEcrans\b/g, 'Écrans'],
  [/\bEcrire\b/g, 'Écrire'],
  [/\bEcrivez\b/g, 'Écrivez'],
  [/\bEditer\b/g, 'Éditer'],
  [/\bEditez\b/g, 'Éditez'],
  [/\bEdition\b/g, 'Édition'],

  // Common verbs and their conjugations
  [/\bDecouvrez\b/g, 'Découvrez'],
  [/\bdecouvrez\b/g, 'découvrez'],
  [/\bDecouvrir\b/g, 'Découvrir'],
  [/\bdecouvrir\b/g, 'découvrir'],
  [/\bDecouverte\b/g, 'Découverte'],
  [/\bdecouverte\b/g, 'découverte'],
  [/\bDecouvertes\b/g, 'Découvertes'],
  [/\bdecouvertes\b/g, 'découvertes'],

  [/\bAmeliorez\b/g, 'Améliorez'],
  [/\bameliorez\b/g, 'améliorez'],
  [/\bAmeliorer\b/g, 'Améliorer'],
  [/\bameliorer\b/g, 'améliorer'],
  [/\bAmelioration\b/g, 'Amélioration'],
  [/\bamelioration\b/g, 'amélioration'],
  [/\bAmeliorations\b/g, 'Améliorations'],
  [/\bameliorations\b/g, 'améliorations'],

  [/\bCreez\b/g, 'Créez'],
  [/\bcreez\b/g, 'créez'],
  [/\bCreer\b/g, 'Créer'],
  [/\bcreer\b/g, 'créer'],
  [/\bCreation\b/g, 'Création'],
  [/\bcreation\b/g, 'création'],
  [/\bCree\b/g, 'Créé'],
  [/\bcree\b/g, 'créé'],
  [/\bCreee\b/g, 'Créée'],
  [/\bcreee\b/g, 'créée'],
  [/\bCrees\b/g, 'Créés'],
  [/\bcrees\b/g, 'créés'],
  [/\bCreees\b/g, 'Créées'],
  [/\bcreees\b/g, 'créées'],

  [/\bMaitrisez\b/g, 'Maîtrisez'],
  [/\bmaitrisez\b/g, 'maîtrisez'],
  [/\bMaitriser\b/g, 'Maîtriser'],
  [/\bmaitriser\b/g, 'maîtriser'],
  [/\bMaitrise\b/g, 'Maîtrise'],
  [/\bmaitrise\b/g, 'maîtrise'],

  [/\bGerez\b/g, 'Gérez'],
  [/\bgerez\b/g, 'gérez'],
  [/\bGerer\b/g, 'Gérer'],
  [/\bgerer\b/g, 'gérer'],
  [/\bGestion\b/g, 'Gestion'],
  [/\bgestion\b/g, 'gestion'],

  [/\bSelectionnez\b/g, 'Sélectionnez'],
  [/\bselectionnez\b/g, 'sélectionnez'],
  [/\bSelectionner\b/g, 'Sélectionner'],
  [/\bselectionner\b/g, 'sélectionner'],
  [/\bSelection\b/g, 'Sélection'],
  [/\bselection\b/g, 'sélection'],
  [/\bSelectionne\b/g, 'Sélectionné'],
  [/\bselectionne\b/g, 'sélectionné'],
  [/\bSelectionnee\b/g, 'Sélectionnée'],
  [/\bselectionnee\b/g, 'sélectionnée'],

  [/\bVerifiez\b/g, 'Vérifiez'],
  [/\bverifiez\b/g, 'vérifiez'],
  [/\bVerifier\b/g, 'Vérifier'],
  [/\bverifier\b/g, 'vérifier'],
  [/\bVerification\b/g, 'Vérification'],
  [/\bverification\b/g, 'vérification'],

  [/\bRepetez\b/g, 'Répétez'],
  [/\brepetez\b/g, 'répétez'],
  [/\bRepeter\b/g, 'Répéter'],
  [/\brepeter\b/g, 'répéter'],
  [/\bRepetition\b/g, 'Répétition'],
  [/\brepetition\b/g, 'répétition'],
  [/\bRepete\b/g, 'Répété'],
  [/\brepete\b/g, 'répété'],
  [/\bRepetes\b/g, 'Répétés'],
  [/\brepetes\b/g, 'répétés'],

  [/\bAfficher\b/g, 'Afficher'],
  [/\bAffichez\b/g, 'Affichez'],

  [/\bDepasse\b/g, 'Dépasse'],
  [/\bdepasse\b/g, 'dépasse'],
  [/\bDepasser\b/g, 'Dépasser'],
  [/\bdepasser\b/g, 'dépasser'],
  [/\bDepassement\b/g, 'Dépassement'],
  [/\bdepassement\b/g, 'dépassement'],

  [/\bRefuse\b/g, 'Refusé'],
  [/\brefuse\b/g, 'refusé'],
  [/\bRefusee\b/g, 'Refusée'],
  [/\brefusee\b/g, 'refusée'],

  // Common nouns
  [/\bdonnees\b/g, 'données'],
  [/\bDonnees\b/g, 'Données'],
  [/\bdonnee\b/g, 'donnée'],
  [/\bDonnee\b/g, 'Donnée'],

  [/\bresultat\b/g, 'résultat'],
  [/\bResultat\b/g, 'Résultat'],
  [/\bresultats\b/g, 'résultats'],
  [/\bResultats\b/g, 'Résultats'],

  [/\bprobleme\b/g, 'problème'],
  [/\bProbleme\b/g, 'Problème'],
  [/\bproblemes\b/g, 'problèmes'],
  [/\bProblemes\b/g, 'Problèmes'],

  [/\betape\b/g, 'étape'],
  [/\betapes\b/g, 'étapes'],

  [/\bmethode\b/g, 'méthode'],
  [/\bMethode\b/g, 'Méthode'],
  [/\bmethodes\b/g, 'méthodes'],
  [/\bMethodes\b/g, 'Méthodes'],

  [/\belement\b/g, 'élément'],
  [/\belements\b/g, 'éléments'],

  [/\bgeneralite\b/g, 'généralité'],
  [/\bgeneralites\b/g, 'généralités'],
  [/\bGeneralite\b/g, 'Généralité'],
  [/\bGeneralites\b/g, 'Généralités'],

  [/\bspecificite\b/g, 'spécificité'],
  [/\bspecificites\b/g, 'spécificités'],
  [/\bSpecificite\b/g, 'Spécificité'],
  [/\bSpecificites\b/g, 'Spécificités'],

  [/\bfonctionnalite\b/g, 'fonctionnalité'],
  [/\bfonctionnalites\b/g, 'fonctionnalités'],
  [/\bFonctionnalite\b/g, 'Fonctionnalité'],
  [/\bFonctionnalites\b/g, 'Fonctionnalités'],

  [/\bcapacite\b/g, 'capacité'],
  [/\bcapacites\b/g, 'capacités'],
  [/\bCapacite\b/g, 'Capacité'],
  [/\bCapacites\b/g, 'Capacités'],

  [/\bqualite\b/g, 'qualité'],
  [/\bqualites\b/g, 'qualités'],
  [/\bQualite\b/g, 'Qualité'],
  [/\bQualites\b/g, 'Qualités'],

  [/\bquantite\b/g, 'quantité'],
  [/\bquantites\b/g, 'quantités'],
  [/\bQuantite\b/g, 'Quantité'],
  [/\bQuantites\b/g, 'Quantités'],

  [/\bverite\b/g, 'vérité'],
  [/\bVerite\b/g, 'Vérité'],

  [/\brealite\b/g, 'réalité'],
  [/\bRealite\b/g, 'Réalité'],

  [/\bsociete\b/g, 'société'],
  [/\bSociete\b/g, 'Société'],
  [/\bsocietes\b/g, 'sociétés'],
  [/\bSocietes\b/g, 'Sociétés'],

  [/\bpropriete\b/g, 'propriété'],
  [/\bPropriete\b/g, 'Propriété'],
  [/\bproprietes\b/g, 'propriétés'],
  [/\bProprietes\b/g, 'Propriétés'],

  [/\bsecurite\b/g, 'sécurité'],
  [/\bSecurite\b/g, 'Sécurité'],

  [/\bpriorite\b/g, 'priorité'],
  [/\bPriorite\b/g, 'Priorité'],
  [/\bpriorites\b/g, 'priorités'],
  [/\bPriorites\b/g, 'Priorités'],

  [/\bactivite\b/g, 'activité'],
  [/\bActivite\b/g, 'Activité'],
  [/\bactivites\b/g, 'activités'],
  [/\bActivites\b/g, 'Activités'],

  [/\bproductivite\b/g, 'productivité'],
  [/\bProductivite\b/g, 'Productivité'],

  [/\befficacite\b/g, 'efficacité'],
  [/\bEfficacite\b/g, 'Efficacité'],

  [/\bvelocite\b/g, 'vélocité'],
  [/\bVelocite\b/g, 'Vélocité'],

  [/\bvisibilite\b/g, 'visibilité'],
  [/\bVisibilite\b/g, 'Visibilité'],

  [/\bflexibilite\b/g, 'flexibilité'],
  [/\bFlexibilite\b/g, 'Flexibilité'],

  [/\bdisponibilite\b/g, 'disponibilité'],
  [/\bDisponibilite\b/g, 'Disponibilité'],

  [/\bcompatibilite\b/g, 'compatibilité'],
  [/\bCompatibilite\b/g, 'Compatibilité'],

  [/\bpossibilite\b/g, 'possibilité'],
  [/\bPossibilite\b/g, 'Possibilité'],
  [/\bpossibilites\b/g, 'possibilités'],
  [/\bPossibilites\b/g, 'Possibilités'],

  [/\bnecessite\b/g, 'nécessité'],
  [/\bNecessite\b/g, 'Nécessité'],

  [/\bcomplexite\b/g, 'complexité'],
  [/\bComplexite\b/g, 'Complexité'],

  [/\bsimplicite\b/g, 'simplicité'],
  [/\bSimplicite\b/g, 'Simplicité'],

  // Past participles (feminine and plural)
  [/\butilisee\b/g, 'utilisée'],
  [/\bUtilisee\b/g, 'Utilisée'],
  [/\butilisees\b/g, 'utilisées'],
  [/\bUtilisees\b/g, 'Utilisées'],
  [/\butilise\b/g, 'utilisé'],
  [/\bUtilise\b/g, 'Utilisé'],
  [/\butilises\b/g, 'utilisés'],
  [/\bUtilises\b/g, 'Utilisés'],

  [/\baffichee\b/g, 'affichée'],
  [/\bAffichee\b/g, 'Affichée'],
  [/\baffichees\b/g, 'affichées'],
  [/\bAffichees\b/g, 'Affichées'],
  [/\baffiche\b/g, 'affiché'],
  [/\bAffiché\b/g, 'Affiché'],

  [/\bmodifiee\b/g, 'modifiée'],
  [/\bModifiee\b/g, 'Modifiée'],
  [/\bmodifiees\b/g, 'modifiées'],
  [/\bModifiees\b/g, 'Modifiées'],
  [/\bmodifie\b/g, 'modifié'],
  [/\bModifie\b/g, 'Modifié'],
  [/\bmodifies\b/g, 'modifiés'],
  [/\bModifies\b/g, 'Modifiés'],

  [/\bdefinie\b/g, 'définie'],
  [/\bDefinie\b/g, 'Définie'],
  [/\bdefinies\b/g, 'définies'],
  [/\bDefinies\b/g, 'Définies'],
  [/\bdefini\b/g, 'défini'],
  [/\bDefini\b/g, 'Défini'],
  [/\bdefinis\b/g, 'définis'],
  [/\bDefinis\b/g, 'Définis'],

  [/\bdetaillee\b/g, 'détaillée'],
  [/\bDetaillee\b/g, 'Détaillée'],
  [/\bdetaillees\b/g, 'détaillées'],
  [/\bDetaillees\b/g, 'Détaillées'],
  [/\bdetaille\b/g, 'détaillé'],
  [/\bDetaille\b/g, 'Détaillé'],
  [/\bdetailles\b/g, 'détaillés'],
  [/\bDetailles\b/g, 'Détaillés'],

  [/\bintegree\b/g, 'intégrée'],
  [/\bIntegree\b/g, 'Intégrée'],
  [/\bintegrees\b/g, 'intégrées'],
  [/\bIntegrees\b/g, 'Intégrées'],
  [/\bintegre\b/g, 'intégré'],
  [/\bIntegre\b/g, 'Intégré'],
  [/\bintegres\b/g, 'intégrés'],
  [/\bIntegres\b/g, 'Intégrés'],

  [/\bsouhaitee\b/g, 'souhaitée'],
  [/\bSouhaitee\b/g, 'Souhaitée'],
  [/\bsouhaitees\b/g, 'souhaitées'],
  [/\bSouhaitees\b/g, 'Souhaitées'],
  [/\bsouhaite\b/g, 'souhaité'],
  [/\bSouhaite\b/g, 'Souhaité'],
  [/\bsouhaites\b/g, 'souhaités'],
  [/\bSouhaites\b/g, 'Souhaités'],

  [/\bpresentee\b/g, 'présentée'],
  [/\bPresentee\b/g, 'Présentée'],
  [/\bpresentees\b/g, 'présentées'],
  [/\bPresentees\b/g, 'Présentées'],
  [/\bpresente\b/g, 'présenté'],
  [/\bPresente\b/g, 'Présenté'],
  [/\bpresentes\b/g, 'présentés'],
  [/\bPresentes\b/g, 'Présentés'],

  [/\brealisee\b/g, 'réalisée'],
  [/\bRealisee\b/g, 'Réalisée'],
  [/\brealisees\b/g, 'réalisées'],
  [/\bRealisees\b/g, 'Réalisées'],
  [/\brealise\b/g, 'réalisé'],
  [/\bRealise\b/g, 'Réalisé'],
  [/\brealises\b/g, 'réalisés'],
  [/\bRealises\b/g, 'Réalisés'],

  // Common adjectives
  [/\bnecessaire\b/g, 'nécessaire'],
  [/\bNecessaire\b/g, 'Nécessaire'],
  [/\bnecessaires\b/g, 'nécessaires'],
  [/\bNecessaires\b/g, 'Nécessaires'],

  [/\bspecifique\b/g, 'spécifique'],
  [/\bSpecifique\b/g, 'Spécifique'],
  [/\bspecifiques\b/g, 'spécifiques'],
  [/\bSpecifiques\b/g, 'Spécifiques'],

  [/\bgeneral\b/g, 'général'],
  [/\bGeneral\b/g, 'Général'],
  [/\bgenerale\b/g, 'générale'],
  [/\bGenerale\b/g, 'Générale'],
  [/\bgeneraux\b/g, 'généraux'],
  [/\bGeneraux\b/g, 'Généraux'],
  [/\bgenerales\b/g, 'générales'],
  [/\bGenerales\b/g, 'Générales'],

  [/\bdifferent\b/g, 'différent'],
  [/\bDifferent\b/g, 'Différent'],
  [/\bdifferente\b/g, 'différente'],
  [/\bDifferente\b/g, 'Différente'],
  [/\bdifferents\b/g, 'différents'],
  [/\bDifferents\b/g, 'Différents'],
  [/\bdifferentes\b/g, 'différentes'],
  [/\bDifferentes\b/g, 'Différentes'],
  [/\bdifference\b/g, 'différence'],
  [/\bDifference\b/g, 'Différence'],
  [/\bdifferences\b/g, 'différences'],
  [/\bDifferences\b/g, 'Différences'],

  [/\bprecedent\b/g, 'précédent'],
  [/\bPrecedent\b/g, 'Précédent'],
  [/\bprecedente\b/g, 'précédente'],
  [/\bPrecedente\b/g, 'Précédente'],
  [/\bprecedents\b/g, 'précédents'],
  [/\bPrecedents\b/g, 'Précédents'],
  [/\bprecedentes\b/g, 'précédentes'],
  [/\bPrecedentes\b/g, 'Précédentes'],

  [/\bsuivant\b/g, 'suivant'],
  [/\bSuivant\b/g, 'Suivant'],

  [/\bpreferee\b/g, 'préférée'],
  [/\bPreferee\b/g, 'Préférée'],
  [/\bprefere\b/g, 'préféré'],
  [/\bPrefere\b/g, 'Préféré'],
  [/\bpreference\b/g, 'préférence'],
  [/\bPreference\b/g, 'Préférence'],
  [/\bpreferences\b/g, 'préférences'],
  [/\bPreferences\b/g, 'Préférences'],

  [/\belevee\b/g, 'élevée'],
  [/\bElevee\b/g, 'Élevée'],
  [/\belevees\b/g, 'élevées'],
  [/\bElevees\b/g, 'Élevées'],
  [/\beleve\b/g, 'élevé'],
  [/\bEleve\b/g, 'Élevé'],
  [/\beleves\b/g, 'élevés'],
  [/\bEleves\b/g, 'Élevés'],

  // Common words with è
  [/\bpremiere\b/g, 'première'],
  [/\bPremiere\b/g, 'Première'],
  [/\bpremieres\b/g, 'premières'],
  [/\bPremieres\b/g, 'Premières'],
  [/\bpremier\b/g, 'premier'],
  [/\bPremier\b/g, 'Premier'],
  [/\bpremiers\b/g, 'premiers'],
  [/\bPremiers\b/g, 'Premiers'],

  [/\bderniere\b/g, 'dernière'],
  [/\bDerniere\b/g, 'Dernière'],
  [/\bdernieres\b/g, 'dernières'],
  [/\bDernieres\b/g, 'Dernières'],
  [/\bdernier\b/g, 'dernier'],
  [/\bDernier\b/g, 'Dernier'],
  [/\bderniers\b/g, 'derniers'],
  [/\bDerniers\b/g, 'Derniers'],

  [/\bentiere\b/g, 'entière'],
  [/\bEntiere\b/g, 'Entière'],
  [/\bentieres\b/g, 'entières'],
  [/\bEntieres\b/g, 'Entières'],
  [/\bentier\b/g, 'entier'],
  [/\bEntier\b/g, 'Entier'],
  [/\bentiers\b/g, 'entiers'],
  [/\bEntiers\b/g, 'Entiers'],

  [/\bmaniere\b/g, 'manière'],
  [/\bManiere\b/g, 'Manière'],
  [/\bmanieres\b/g, 'manières'],
  [/\bManieres\b/g, 'Manières'],

  [/\bcarriere\b/g, 'carrière'],
  [/\bCarriere\b/g, 'Carrière'],
  [/\bcarrieres\b/g, 'carrières'],
  [/\bCarrieres\b/g, 'Carrières'],

  [/\bmatiere\b/g, 'matière'],
  [/\bMatiere\b/g, 'Matière'],
  [/\bmatieres\b/g, 'matières'],
  [/\bMatieres\b/g, 'Matières'],

  [/\breguliere\b/g, 'régulière'],
  [/\bReguliere\b/g, 'Régulière'],
  [/\bregulieres\b/g, 'régulières'],
  [/\bRegulieres\b/g, 'Régulières'],
  [/\bregulier\b/g, 'régulier'],
  [/\bRegulier\b/g, 'Régulier'],
  [/\breguliers\b/g, 'réguliers'],
  [/\bReguliers\b/g, 'Réguliers'],

  [/\bparticuliere\b/g, 'particulière'],
  [/\bParticuliere\b/g, 'Particulière'],
  [/\bparticulieres\b/g, 'particulières'],
  [/\bParticulieres\b/g, 'Particulières'],
  [/\bparticulier\b/g, 'particulier'],
  [/\bParticulier\b/g, 'Particulier'],
  [/\bparticuliers\b/g, 'particuliers'],
  [/\bParticuliers\b/g, 'Particuliers'],

  // Common adverbs and expressions
  [/\bgeneralement\b/g, 'généralement'],
  [/\bGeneralement\b/g, 'Généralement'],

  [/\bimmediatement\b/g, 'immédiatement'],
  [/\bImmediatement\b/g, 'Immédiatement'],

  [/\bprecisement\b/g, 'précisément'],
  [/\bPrecisement\b/g, 'Précisément'],

  [/\bcompletement\b/g, 'complètement'],
  [/\bCompletement\b/g, 'Complètement'],

  [/\brapidement\b/g, 'rapidement'],
  [/\bRapidement\b/g, 'Rapidement'],

  [/\bfacilement\b/g, 'facilement'],
  [/\bFacilement\b/g, 'Facilement'],

  [/\begalement\b/g, 'également'],

  [/\bdeja\b/g, 'déjà'],
  [/\bDeja\b/g, 'Déjà'],

  [/\bapres\b/g, 'après'],
  [/\bApres\b/g, 'Après'],

  [/\ba\b/g, 'à'],  // Be careful with this one - only standalone 'a'

  [/\bou\b/g, 'où'],  // Be careful - context dependent

  [/\btre\b/g, 'être'],

  // Excel-specific terms
  [/\bcellules\b/g, 'cellules'],
  [/\bCellules\b/g, 'Cellules'],
  [/\bcellule\b/g, 'cellule'],
  [/\bCellule\b/g, 'Cellule'],

  [/\bformule\b/g, 'formule'],
  [/\bFormule\b/g, 'Formule'],
  [/\bformules\b/g, 'formules'],
  [/\bFormules\b/g, 'Formules'],

  [/\btableau\b/g, 'tableau'],
  [/\bTableau\b/g, 'Tableau'],
  [/\btableaux\b/g, 'tableaux'],
  [/\bTableaux\b/g, 'Tableaux'],

  [/\bcolonne\b/g, 'colonne'],
  [/\bColonne\b/g, 'Colonne'],
  [/\bcolonnes\b/g, 'colonnes'],
  [/\bColonnes\b/g, 'Colonnes'],

  [/\bréference\b/g, 'référence'],
  [/\bReference\b/g, 'Référence'],
  [/\breferences\b/g, 'références'],
  [/\bReferences\b/g, 'Références'],

  [/\blegere\b/g, 'légère'],
  [/\bLegere\b/g, 'Légère'],
  [/\bleger\b/g, 'léger'],
  [/\bLeger\b/g, 'Léger'],

  [/\berreur\b/g, 'erreur'],
  [/\bErreur\b/g, 'Erreur'],
  [/\berreurs\b/g, 'erreurs'],
  [/\bErreurs\b/g, 'Erreurs'],

  // Words with ô
  [/\bcontrole\b/g, 'contrôle'],
  [/\bControle\b/g, 'Contrôle'],
  [/\bcontroles\b/g, 'contrôles'],
  [/\bControles\b/g, 'Contrôles'],

  [/\brole\b/g, 'rôle'],
  [/\bRole\b/g, 'Rôle'],
  [/\broles\b/g, 'rôles'],
  [/\bRoles\b/g, 'Rôles'],

  // Words with ç
  [/\bfacon\b/g, 'façon'],
  [/\bFacon\b/g, 'Façon'],
  [/\bfacons\b/g, 'façons'],
  [/\bFacons\b/g, 'Façons'],

  [/\blecon\b/g, 'leçon'],
  [/\bLecon\b/g, 'Leçon'],
  [/\blecons\b/g, 'leçons'],
  [/\bLecons\b/g, 'Leçons'],

  [/\bfrancais\b/g, 'français'],
  [/\bFrancais\b/g, 'Français'],
  [/\bfrancaise\b/g, 'française'],
  [/\bFrancaise\b/g, 'Française'],

  [/\bcommencer\b/g, 'commencer'],
  [/\bCommencer\b/g, 'Commencer'],
  [/\bcommencez\b/g, 'commencez'],
  [/\bCommencez\b/g, 'Commencez'],

  [/\brecu\b/g, 'reçu'],
  [/\bRecu\b/g, 'Reçu'],
  [/\brecue\b/g, 'reçue'],
  [/\bRecue\b/g, 'Reçue'],

  [/\bca\b/g, 'ça'],  // Be careful with context

  // Words with û
  [/\bsur\b/g, 'sûr'],  // Be careful - context dependent (sur vs sûr)

  // Words with î
  [/\bapparaitra\b/g, 'apparaîtra'],
  [/\bApparaitra\b/g, 'Apparaîtra'],

  [/\bconnaitre\b/g, 'connaître'],
  [/\bConnaitre\b/g, 'Connaître'],

  [/\bparaitre\b/g, 'paraître'],
  [/\bParaitre\b/g, 'Paraître'],

  // Additional common words
  [/\bdesormais\b/g, 'désormais'],
  [/\bDesormais\b/g, 'Désormais'],

  [/\bplutot\b/g, 'plutôt'],
  [/\bPlutot\b/g, 'Plutôt'],

  [/\bbientot\b/g, 'bientôt'],
  [/\bBientot\b/g, 'Bientôt'],

  [/\btemoin\b/g, 'témoin'],
  [/\bTemoin\b/g, 'Témoin'],
  [/\btemoins\b/g, 'témoins'],
  [/\bTemoins\b/g, 'Témoins'],

  [/\bbenefice\b/g, 'bénéfice'],
  [/\bBenefice\b/g, 'Bénéfice'],
  [/\bbenefices\b/g, 'bénéfices'],
  [/\bBenefices\b/g, 'Bénéfices'],

  [/\bperiode\b/g, 'période'],
  [/\bPeriode\b/g, 'Période'],
  [/\bperiodes\b/g, 'périodes'],
  [/\bPeriodes\b/g, 'Périodes'],

  [/\bregles\b/g, 'règles'],
  [/\bRegles\b/g, 'Règles'],
  [/\bregle\b/g, 'règle'],
  [/\bRegle\b/g, 'Règle'],

  [/\bmodele\b/g, 'modèle'],
  [/\bModele\b/g, 'Modèle'],
  [/\bmodeles\b/g, 'modèles'],
  [/\bModeles\b/g, 'Modèles'],

  [/\bsysteme\b/g, 'système'],
  [/\bSysteme\b/g, 'Système'],
  [/\bsystemes\b/g, 'systèmes'],
  [/\bSystemes\b/g, 'Systèmes'],

  [/\bschema\b/g, 'schéma'],
  [/\bSchema\b/g, 'Schéma'],
  [/\bschemas\b/g, 'schémas'],
  [/\bSchemas\b/g, 'Schémas'],

  [/\bcritere\b/g, 'critère'],
  [/\bCritere\b/g, 'Critère'],
  [/\bcriteres\b/g, 'critères'],
  [/\bCriteres\b/g, 'Critères'],

  [/\bnumero\b/g, 'numéro'],
  [/\bNumero\b/g, 'Numéro'],
  [/\bnumeros\b/g, 'numéros'],
  [/\bNumeros\b/g, 'Numéros'],

  [/\bmemoire\b/g, 'mémoire'],
  [/\bMemoire\b/g, 'Mémoire'],

  [/\boperation\b/g, 'opération'],
  [/\bOperation\b/g, 'Opération'],
  [/\boperations\b/g, 'opérations'],
  [/\bOperations\b/g, 'Opérations'],

  [/\bexecution\b/g, 'exécution'],
  [/\bExecution\b/g, 'Exécution'],

  [/\bcalendrier\b/g, 'calendrier'],
  [/\bCalendrier\b/g, 'Calendrier'],

  [/\bclavier\b/g, 'clavier'],
  [/\bClavier\b/g, 'Clavier'],

  [/\becrit\b/g, 'écrit'],
  [/\bEcrit\b/g, 'Écrit'],
  [/\becrite\b/g, 'écrite'],
  [/\bEcrite\b/g, 'Écrite'],
  [/\becrits\b/g, 'écrits'],
  [/\bEcrits\b/g, 'Écrits'],
  [/\becrites\b/g, 'écrites'],
  [/\bEcrites\b/g, 'Écrites'],

  [/\beventuellement\b/g, 'éventuellement'],
  [/\bEventuellement\b/g, 'Éventuellement'],

  [/\beverifier\b/g, 'évérifier'],
  [/\bEverifier\b/g, 'Évérifier'],

  [/\binteret\b/g, 'intérêt'],
  [/\bInteret\b/g, 'Intérêt'],
  [/\binterets\b/g, 'intérêts'],
  [/\bInterets\b/g, 'Intérêts'],

  [/\binterprete\b/g, 'interprété'],
  [/\bInterprete\b/g, 'Interprété'],

  [/\bsupplementaire\b/g, 'supplémentaire'],
  [/\bSupplementaire\b/g, 'Supplémentaire'],
  [/\bsupplementaires\b/g, 'supplémentaires'],
  [/\bSupplementaires\b/g, 'Supplémentaires'],

  [/\bcomprehension\b/g, 'compréhension'],
  [/\bComprehension\b/g, 'Compréhension'],

  [/\brepresentation\b/g, 'représentation'],
  [/\bRepresentation\b/g, 'Représentation'],

  [/\binterpretation\b/g, 'interprétation'],
  [/\bInterpretation\b/g, 'Interprétation'],

  [/\bexperience\b/g, 'expérience'],
  [/\bExperience\b/g, 'Expérience'],
  [/\bexperiences\b/g, 'expériences'],
  [/\bExperiences\b/g, 'Expériences'],

  [/\bprevu\b/g, 'prévu'],
  [/\bPrevu\b/g, 'Prévu'],
  [/\bprevue\b/g, 'prévue'],
  [/\bPrevue\b/g, 'Prévue'],
  [/\bprevus\b/g, 'prévus'],
  [/\bPrevus\b/g, 'Prévus'],
  [/\bprevues\b/g, 'prévues'],
  [/\bPrevues\b/g, 'Prévues'],

  [/\boccupe\b/g, 'occupé'],
  [/\bOccupe\b/g, 'Occupé'],
  [/\boccupee\b/g, 'occupée'],
  [/\bOccupee\b/g, 'Occupée'],

  [/\bdemarre\b/g, 'démarré'],
  [/\bDemarre\b/g, 'Démarré'],
  [/\bdemarrer\b/g, 'démarrer'],
  [/\bDemarrer\b/g, 'Démarrer'],
  [/\bdemarrez\b/g, 'démarrez'],
  [/\bDemarrez\b/g, 'Démarrez'],
  [/\bdemarrage\b/g, 'démarrage'],
  [/\bDemarrage\b/g, 'Démarrage'],

  [/\bdebut\b/g, 'début'],
  [/\bDebut\b/g, 'Début'],
  [/\bdebuter\b/g, 'débuter'],
  [/\bDebuter\b/g, 'Débuter'],
  [/\bdebutant\b/g, 'débutant'],
  [/\bDebutant\b/g, 'Débutant'],
  [/\bdebutants\b/g, 'débutants'],
  [/\bDebutants\b/g, 'Débutants'],

  [/\bdeveloppement\b/g, 'développement'],
  [/\bDeveloppement\b/g, 'Développement'],
  [/\bdevelopper\b/g, 'développer'],
  [/\bDevelopper\b/g, 'Développer'],
  [/\bdeveloppe\b/g, 'développé'],
  [/\bDeveloppe\b/g, 'Développé'],

  [/\bediteur\b/g, 'éditeur'],
  [/\bEditeur\b/g, 'Éditeur'],

  [/\benorme\b/g, 'énorme'],
  [/\bEnorme\b/g, 'Énorme'],
  [/\benormes\b/g, 'énormes'],
  [/\bEnormes\b/g, 'Énormes'],

  [/\beconomie\b/g, 'économie'],
  [/\bEconomie\b/g, 'Économie'],
  [/\beconomies\b/g, 'économies'],
  [/\bEconomies\b/g, 'Économies'],
  [/\beconomique\b/g, 'économique'],
  [/\bEconomique\b/g, 'Économique'],
  [/\beconomiques\b/g, 'économiques'],
  [/\bEconomiques\b/g, 'Économiques'],

  [/\benergie\b/g, 'énergie'],
  [/\bEnergie\b/g, 'Énergie'],

  [/\bretrouve\b/g, 'retrouvé'],
  [/\bRetrouve\b/g, 'Retrouvé'],
  [/\bretrouver\b/g, 'retrouver'],
  [/\bRetrouver\b/g, 'Retrouver'],
  [/\bretrouvez\b/g, 'retrouvez'],
  [/\bRetrouvez\b/g, 'Retrouvez'],

  [/\btelecharger\b/g, 'télécharger'],
  [/\bTelecharger\b/g, 'Télécharger'],
  [/\btelechargez\b/g, 'téléchargez'],
  [/\bTelechargez\b/g, 'Téléchargez'],
  [/\btelechargement\b/g, 'téléchargement'],
  [/\bTelechargement\b/g, 'Téléchargement'],
  [/\btelecharge\b/g, 'téléchargé'],
  [/\bTelecharge\b/g, 'Téléchargé'],

  [/\blegalement\b/g, 'légalement'],
  [/\bLegalement\b/g, 'Légalement'],

  [/\breference\b/g, 'référence'],
  [/\bReference\b/g, 'Référence'],
  [/\breferences\b/g, 'références'],
  [/\bReferences\b/g, 'Références'],

  [/\bphenomene\b/g, 'phénomène'],
  [/\bPhenomene\b/g, 'Phénomène'],
  [/\bphenomenes\b/g, 'phénomènes'],
  [/\bPhenomenes\b/g, 'Phénomènes'],

  // Words ending in -ement/-ément
  [/\bseverement\b/g, 'sévèrement'],
  [/\bSeverement\b/g, 'Sévèrement'],

  [/\bsincerement\b/g, 'sincèrement'],
  [/\bSincerement\b/g, 'Sincèrement'],

  [/\bentierement\b/g, 'entièrement'],
  [/\bEntierement\b/g, 'Entièrement'],

  [/\blegierement\b/g, 'légèrement'],
  [/\bLegerement\b/g, 'Légèrement'],

  // imperative verbs
  [/\bapprenez\b/g, 'apprenez'],
  [/\bApprenez\b/g, 'Apprenez'],

  [/\bsuivez\b/g, 'suivez'],
  [/\bSuivez\b/g, 'Suivez'],

  [/\bnaviguez\b/g, 'naviguez'],
  [/\bNaviguez\b/g, 'Naviguez'],

  [/\butilisez\b/g, 'utilisez'],
  [/\bUtilisez\b/g, 'Utilisez'],

  [/\bappliquez\b/g, 'appliquez'],
  [/\bAppliquez\b/g, 'Appliquez'],

  [/\bintegrez\b/g, 'intégrez'],
  [/\bIntegrez\b/g, 'Intégrez'],

  [/\boptimisez\b/g, 'optimisez'],
  [/\bOptimisez\b/g, 'Optimisez'],

  [/\borganisez\b/g, 'organisez'],
  [/\bOrganisez\b/g, 'Organisez'],

  [/\banalysez\b/g, 'analysez'],
  [/\bAnalysez\b/g, 'Analysez'],

  [/\bpersonnalisez\b/g, 'personnalisez'],
  [/\bPersonnalisez\b/g, 'Personnalisez'],

  [/\bautomatisez\b/g, 'automatisez'],
  [/\bAutomatisez\b/g, 'Automatisez'],

  [/\bsynchronisez\b/g, 'synchronisez'],
  [/\bSynchronisez\b/g, 'Synchronisez'],

  [/\bpartagez\b/g, 'partagez'],
  [/\bPartagez\b/g, 'Partagez'],

  [/\bprotegez\b/g, 'protégez'],
  [/\bProtegez\b/g, 'Protégez'],

  [/\baffichez\b/g, 'affichez'],
  [/\bAffichez\b/g, 'Affichez'],

  [/\baccedez\b/g, 'accédez'],
  [/\bAccedez\b/g, 'Accédez'],

  [/\bacces\b/g, 'accès'],
  [/\bAcces\b/g, 'Accès'],

  [/\bsucces\b/g, 'succès'],
  [/\bSucces\b/g, 'Succès'],

  [/\bproces\b/g, 'procès'],
  [/\bProces\b/g, 'Procès'],

  [/\bexces\b/g, 'excès'],
  [/\bExces\b/g, 'Excès'],

  // Ensure evaluations work correctly
  [/\bevaluer\b/g, 'évaluer'],
  [/\bevalue\b/g, 'évalué'],
  [/\bevaluee\b/g, 'évaluée'],

  [/\bcle\b/g, 'clé'],
  [/\bCle\b/g, 'Clé'],
  [/\bcles\b/g, 'clés'],
  [/\bCles\b/g, 'Clés'],

  // Context-specific Excel terms without accents
  [/\bimbrique\b/g, 'imbriqué'],
  [/\bImbriques\b/g, 'Imbriqués'],
  [/\bimbriques\b/g, 'imbriqués'],
  [/\bimbriquee\b/g, 'imbriquée'],
  [/\bimbriquees\b/g, 'imbriquées'],

  // Croisé (tableaux croisés dynamiques)
  [/\bcroise\b/g, 'croisé'],
  [/\bCroise\b/g, 'Croisé'],
  [/\bcroises\b/g, 'croisés'],
  [/\bCroises\b/g, 'Croisés'],
  [/\bcroisee\b/g, 'croisée'],
  [/\bCroisee\b/g, 'Croisée'],
  [/\bcroisees\b/g, 'croisées'],
  [/\bCroisees\b/g, 'Croisées'],

  // Résumer et dérivés
  [/\bresumer\b/g, 'résumer'],
  [/\bResumer\b/g, 'Résumer'],
  [/\bresumez\b/g, 'résumez'],
  [/\bResumez\b/g, 'Résumez'],
  [/\bresume\b/g, 'résumé'],
  [/\bResume\b/g, 'Résumé'],
  [/\bresumee\b/g, 'résumée'],
  [/\bResumee\b/g, 'Résumée'],
  [/\bresumes\b/g, 'résumés'],
  [/\bResumes\b/g, 'Résumés'],

  // Synthèse et dérivés
  [/\bsynthese\b/g, 'synthèse'],
  [/\bSynthese\b/g, 'Synthèse'],
  [/\bsyntheses\b/g, 'synthèses'],
  [/\bSyntheses\b/g, 'Synthèses'],
  [/\bsynthetique\b/g, 'synthétique'],
  [/\bSynthetique\b/g, 'Synthétique'],
  [/\bsynthetiques\b/g, 'synthétiques'],
  [/\bSynthetiques\b/g, 'Synthétiques'],
  [/\bsynthetiser\b/g, 'synthétiser'],
  [/\bSynthetiser\b/g, 'Synthétiser'],

  // Compréhensible et dérivés
  [/\bcomprehensible\b/g, 'compréhensible'],
  [/\bComprehensible\b/g, 'Compréhensible'],
  [/\bcomprehensibles\b/g, 'compréhensibles'],
  [/\bComprehensibles\b/g, 'Compréhensibles'],

  // Réorganiser et dérivés
  [/\breorganiser\b/g, 'réorganiser'],
  [/\bReorganiser\b/g, 'Réorganiser'],
  [/\breorganisez\b/g, 'réorganisez'],
  [/\bReorganisez\b/g, 'Réorganisez'],
  [/\breorganise\b/g, 'réorganisé'],
  [/\bReorganise\b/g, 'Réorganisé'],
  [/\breorganisee\b/g, 'réorganisée'],
  [/\bReorganisee\b/g, 'Réorganisée'],
  [/\breorganisation\b/g, 'réorganisation'],
  [/\bReorganisation\b/g, 'Réorganisation'],

  // Données spécifiques aux tableaux croisés
  [/\bdynamique\b/g, 'dynamique'],
  [/\bDynamique\b/g, 'Dynamique'],
  [/\bdynamiques\b/g, 'dynamiques'],
  [/\bDynamiques\b/g, 'Dynamiques'],

  // Supérieur/Inférieur
  [/\bsuperieur\b/g, 'supérieur'],
  [/\bSuperieur\b/g, 'Supérieur'],
  [/\bsuperieure\b/g, 'supérieure'],
  [/\bSuperieure\b/g, 'Supérieure'],
  [/\bsuperieurs\b/g, 'supérieurs'],
  [/\bSuperieurs\b/g, 'Supérieurs'],
  [/\bsuperieures\b/g, 'supérieures'],
  [/\bSuperieures\b/g, 'Supérieures'],
  [/\binferieur\b/g, 'inférieur'],
  [/\bInferieur\b/g, 'Inférieur'],
  [/\binferieure\b/g, 'inférieure'],
  [/\bInferieure\b/g, 'Inférieure'],
  [/\binferieurs\b/g, 'inférieurs'],
  [/\bInferieurs\b/g, 'Inférieurs'],
  [/\binferieures\b/g, 'inférieures'],
  [/\bInferieures\b/g, 'Inférieures'],

  // Opérateur
  [/\boperateur\b/g, 'opérateur'],
  [/\bOperateur\b/g, 'Opérateur'],
  [/\boperateurs\b/g, 'opérateurs'],
  [/\bOperateurs\b/g, 'Opérateurs'],

  // Préférer et dérivés
  [/\bpreferer\b/g, 'préférer'],
  [/\bPreferer\b/g, 'Préférer'],
  [/\bpreferez\b/g, 'préférez'],
  [/\bPreferez\b/g, 'Préférez'],

  // Très
  [/\bTres\b/g, 'Très'],
  [/\btres\b/g, 'très'],

  // Numérique
  [/\bnumerique\b/g, 'numérique'],
  [/\bNumerique\b/g, 'Numérique'],
  [/\bnumeriques\b/g, 'numériques'],
  [/\bNumeriques\b/g, 'Numériques'],

  // Egal/Égal
  [/\begal\b/g, 'égal'],
  [/\bEgal\b/g, 'Égal'],
  [/\begale\b/g, 'égale'],
  [/\bEgale\b/g, 'Égale'],
  [/\begaux\b/g, 'égaux'],
  [/\bEgaux\b/g, 'Égaux'],
  [/\begales\b/g, 'égales'],
  [/\bEgales\b/g, 'Égales'],

  // Paramètre
  [/\bparametre\b/g, 'paramètre'],
  [/\bParametre\b/g, 'Paramètre'],
  [/\bparametres\b/g, 'paramètres'],
  [/\bParametres\b/g, 'Paramètres'],

  // Régional
  [/\bregional\b/g, 'régional'],
  [/\bRegional\b/g, 'Régional'],
  [/\bregionale\b/g, 'régionale'],
  [/\bRegionale\b/g, 'Régionale'],
  [/\bregionaux\b/g, 'régionaux'],
  [/\bRegionaux\b/g, 'Régionaux'],
  [/\bregionales\b/g, 'régionales'],
  [/\bRegionales\b/g, 'Régionales'],

  // Lisibilité
  [/\blisibilite\b/g, 'lisibilité'],
  [/\bLisibilite\b/g, 'Lisibilité'],

  // Plage nommée
  [/\bnommee\b/g, 'nommée'],
  [/\bNommee\b/g, 'Nommée'],
  [/\bnommees\b/g, 'nommées'],
  [/\bNommees\b/g, 'Nommées'],
  [/\bnomme\b/g, 'nommé'],
  [/\bNomme\b/g, 'Nommé'],
  [/\bnommes\b/g, 'nommés'],
  [/\bNommes\b/g, 'Nommés'],

  // Clarte
  [/\bclarte\b/g, 'clarté'],
  [/\bClarte\b/g, 'Clarté'],

  // Avancé
  [/\bavance\b/g, 'avancé'],
  [/\bAvance\b/g, 'Avancé'],
  [/\bavancee\b/g, 'avancée'],
  [/\bAvancee\b/g, 'Avancée'],
  [/\bavances\b/g, 'avancés'],
  [/\bAvances\b/g, 'Avancés'],
  [/\bavancees\b/g, 'avancées'],
  [/\bAvancees\b/g, 'Avancées'],

  // Réduire/Réduit
  [/\breduit\b/g, 'réduit'],
  [/\bReduit\b/g, 'Réduit'],
  [/\breduite\b/g, 'réduite'],
  [/\bReduite\b/g, 'Réduite'],
  [/\breduits\b/g, 'réduits'],
  [/\bReduits\b/g, 'Réduits'],
  [/\breduites\b/g, 'réduites'],
  [/\bReduites\b/g, 'Réduites'],
  [/\breduire\b/g, 'réduire'],
  [/\bReduire\b/g, 'Réduire'],

  // Délai
  [/\bdelai\b/g, 'délai'],
  [/\bDelai\b/g, 'Délai'],
  [/\bdelais\b/g, 'délais'],
  [/\bDelais\b/g, 'Délais'],

  // Échéance
  [/\becheance\b/g, 'échéance'],
  [/\bEcheance\b/g, 'Échéance'],
  [/\becheances\b/g, 'échéances'],
  [/\bEcheances\b/g, 'Échéances'],

  // Régulièrement
  [/\breguliérement\b/g, 'régulièrement'],
  [/\bReguliérement\b/g, 'Régulièrement'],
  [/\bregulierement\b/g, 'régulièrement'],
  [/\bRegulierement\b/g, 'Régulièrement'],

  // Hiérarchie
  [/\bhierarchie\b/g, 'hiérarchie'],
  [/\bHierarchie\b/g, 'Hiérarchie'],
  [/\bhierarchique\b/g, 'hiérarchique'],
  [/\bHierarchique\b/g, 'Hiérarchique'],
  [/\bhierarchiques\b/g, 'hiérarchiques'],
  [/\bHierarchiques\b/g, 'Hiérarchiques'],

  // Répartition
  [/\brepartition\b/g, 'répartition'],
  [/\bRepartition\b/g, 'Répartition'],
  [/\brepartitions\b/g, 'répartitions'],
  [/\bRepartitions\b/g, 'Répartitions'],

  // Répondre/Réponse
  [/\brepondre\b/g, 'répondre'],
  [/\bRepondre\b/g, 'Répondre'],
  [/\brepondez\b/g, 'répondez'],
  [/\bRepondez\b/g, 'Répondez'],
  [/\breponse\b/g, 'réponse'],
  [/\bReponse\b/g, 'Réponse'],
  [/\breponses\b/g, 'réponses'],
  [/\bReponses\b/g, 'Réponses'],

  // Récupérer
  [/\brecuperer\b/g, 'récupérer'],
  [/\bRecuperer\b/g, 'Récupérer'],
  [/\brecuperez\b/g, 'récupérez'],
  [/\bRecuperez\b/g, 'Récupérez'],
  [/\brecupere\b/g, 'récupéré'],
  [/\bRecupere\b/g, 'Récupéré'],
  [/\brecuperee\b/g, 'récupérée'],
  [/\bRecuperee\b/g, 'Récupérée'],
  [/\brecuperation\b/g, 'récupération'],
  [/\bRecuperation\b/g, 'Récupération'],

  // Génerer
  [/\bgenerer\b/g, 'générer'],
  [/\bGenerer\b/g, 'Générer'],
  [/\bgenerez\b/g, 'générez'],
  [/\bGenerez\b/g, 'Générez'],
  [/\bgenere\b/g, 'généré'],
  [/\bGenere\b/g, 'Généré'],
  [/\bgeneree\b/g, 'générée'],
  [/\bGeneree\b/g, 'Générée'],
  [/\bgeneres\b/g, 'générés'],
  [/\bGeneres\b/g, 'Générés'],
  [/\bgenerees\b/g, 'générées'],
  [/\bGenerees\b/g, 'Générées'],
  [/\bgeneration\b/g, 'génération'],
  [/\bGeneration\b/g, 'Génération'],

  // Sélection spécifiques
  [/\bselections\b/g, 'sélections'],
  [/\bSelections\b/g, 'Sélections'],
  [/\bselectionnees\b/g, 'sélectionnées'],
  [/\bSelectionnees\b/g, 'Sélectionnées'],
  [/\bselectionnes\b/g, 'sélectionnés'],
  [/\bSelectionnes\b/g, 'Sélectionnés'],

  // Intégration
  [/\bintegration\b/g, 'intégration'],
  [/\bIntegration\b/g, 'Intégration'],
  [/\bintegrations\b/g, 'intégrations'],
  [/\bIntegrations\b/g, 'Intégrations'],

  // Révision
  [/\brevision\b/g, 'révision'],
  [/\bRevision\b/g, 'Révision'],
  [/\brevisions\b/g, 'révisions'],
  [/\bRevisions\b/g, 'Révisions'],
  [/\breviser\b/g, 'réviser'],
  [/\bReviser\b/g, 'Réviser'],
  [/\brevisez\b/g, 'révisez'],
  [/\bRevisez\b/g, 'Révisez'],

  // Année
  [/\bannee\b/g, 'année'],
  [/\bAnnee\b/g, 'Année'],
  [/\bannees\b/g, 'années'],
  [/\bAnnees\b/g, 'Années'],

  // Idée
  [/\bidee\b/g, 'idée'],
  [/\bIdee\b/g, 'Idée'],
  [/\bidees\b/g, 'idées'],
  [/\bIdees\b/g, 'Idées'],

  // Entrée
  [/\bentree\b/g, 'entrée'],
  [/\bEntree\b/g, 'Entrée'],
  [/\bentrees\b/g, 'entrées'],
  [/\bEntrees\b/g, 'Entrées'],

  // Côté
  [/\bcote\b/g, 'côté'],
  [/\bCote\b/g, 'Côté'],
  [/\bcotes\b/g, 'côtés'],
  [/\bCotes\b/g, 'Côtés'],

  // Arrêt
  [/\barret\b/g, 'arrêt'],
  [/\bArret\b/g, 'Arrêt'],
  [/\barrets\b/g, 'arrêts'],
  [/\bArrets\b/g, 'Arrêts'],
  [/\barreter\b/g, 'arrêter'],
  [/\bArreter\b/g, 'Arrêter'],
  [/\barretez\b/g, 'arrêtez'],
  [/\bArretez\b/g, 'Arrêtez'],

  // Fenêtre
  [/\bfenetre\b/g, 'fenêtre'],
  [/\bFenetre\b/g, 'Fenêtre'],
  [/\bfenetres\b/g, 'fenêtres'],
  [/\bFenetres\b/g, 'Fenêtres'],

  // Requête
  [/\brequete\b/g, 'requête'],
  [/\bRequete\b/g, 'Requête'],
  [/\brequetes\b/g, 'requêtes'],
  [/\bRequetes\b/g, 'Requêtes'],

  // Préparer
  [/\bpreparer\b/g, 'préparer'],
  [/\bPreparer\b/g, 'Préparer'],
  [/\bpreparation\b/g, 'préparation'],
  [/\bPreparation\b/g, 'Préparation'],
  [/\bpreparez\b/g, 'préparez'],
  [/\bPreparez\b/g, 'Préparez'],
  [/\bprepare\b/g, 'préparé'],
  [/\bPrepare\b/g, 'Préparé'],
  [/\bpreparee\b/g, 'préparée'],
  [/\bPreparee\b/g, 'Préparée'],

  // En-tête
  [/\ben-tete\b/g, 'en-tête'],
  [/\bEn-tete\b/g, 'En-tête'],
  [/\ben-tetes\b/g, 'en-têtes'],
  [/\bEn-tetes\b/g, 'En-têtes'],
  [/\bentete\b/g, 'entête'],
  [/\bEntete\b/g, 'Entête'],
  [/\bentetes\b/g, 'entêtes'],
  [/\bEntetes\b/g, 'Entêtes'],

  // Cohérent
  [/\bcoherent\b/g, 'cohérent'],
  [/\bCoherent\b/g, 'Cohérent'],
  [/\bcoherente\b/g, 'cohérente'],
  [/\bCoherente\b/g, 'Cohérente'],
  [/\bcoherents\b/g, 'cohérents'],
  [/\bCoherents\b/g, 'Cohérents'],
  [/\bcoherentes\b/g, 'cohérentes'],
  [/\bCoherentes\b/g, 'Cohérentes'],
  [/\bcoherence\b/g, 'cohérence'],
  [/\bCoherence\b/g, 'Cohérence'],

  // Recommandé
  [/\brecommande\b/g, 'recommandé'],
  [/\bRecommande\b/g, 'Recommandé'],
  [/\brecommandee\b/g, 'recommandée'],
  [/\bRecommandee\b/g, 'Recommandée'],
  [/\brecommandes\b/g, 'recommandés'],
  [/\bRecommandes\b/g, 'Recommandés'],
  [/\brecommandees\b/g, 'recommandées'],
  [/\bRecommandees\b/g, 'Recommandées'],
  [/\brecommander\b/g, 'recommander'],
  [/\bRecommander\b/g, 'Recommander'],
  [/\brecommandation\b/g, 'recommandation'],
  [/\bRecommandation\b/g, 'Recommandation'],

  // Catégorie
  [/\bcategorie\b/g, 'catégorie'],
  [/\bCategorie\b/g, 'Catégorie'],
  [/\bcategories\b/g, 'catégories'],
  [/\bCategories\b/g, 'Catégories'],
  [/\bcategoriser\b/g, 'catégoriser'],
  [/\bCategoriser\b/g, 'Catégoriser'],

  // Définir
  [/\bdefinir\b/g, 'définir'],
  [/\bDefinir\b/g, 'Définir'],
  [/\bdefinissez\b/g, 'définissez'],
  [/\bDefinissez\b/g, 'Définissez'],
  [/\bdefinition\b/g, 'définition'],
  [/\bDefinition\b/g, 'Définition'],
  [/\bdefinitions\b/g, 'définitions'],
  [/\bDefinitions\b/g, 'Définitions'],
  [/\bdefinitif\b/g, 'définitif'],
  [/\bDefinitif\b/g, 'Définitif'],
  [/\bdefinitive\b/g, 'définitive'],
  [/\bDefinitive\b/g, 'Définitive'],

  // Prédéfini
  [/\bpredefini\b/g, 'prédéfini'],
  [/\bPredefini\b/g, 'Prédéfini'],
  [/\bpredefinie\b/g, 'prédéfinie'],
  [/\bPredefinie\b/g, 'Prédéfinie'],
  [/\bpredefinis\b/g, 'prédéfinis'],
  [/\bPredefinis\b/g, 'Prédéfinis'],
  [/\bpredefinies\b/g, 'prédéfinies'],
  [/\bPredefinies\b/g, 'Prédéfinies'],

  // Échelle
  [/\bechelle\b/g, 'échelle'],
  [/\bEchelle\b/g, 'Échelle'],
  [/\bechelles\b/g, 'échelles'],
  [/\bEchelles\b/g, 'Échelles'],

  // Éviter
  [/\beviter\b/g, 'éviter'],
  [/\bEviter\b/g, 'Éviter'],

  // Structuré
  [/\bstructure\b/g, 'structuré'],
  [/\bStructure\b/g, 'Structuré'],
  [/\bstructuree\b/g, 'structurée'],
  [/\bStructuree\b/g, 'Structurée'],
  [/\bstructures\b/g, 'structurés'],
  [/\bStructures\b/g, 'Structurés'],
  [/\bstructurees\b/g, 'structurées'],
  [/\bStructurees\b/g, 'Structurées'],

  // Fusionné
  [/\bfusionne\b/g, 'fusionné'],
  [/\bFusionne\b/g, 'Fusionné'],
  [/\bfusionnee\b/g, 'fusionnée'],
  [/\bFusionnee\b/g, 'Fusionnée'],
  [/\bfusionnes\b/g, 'fusionnés'],
  [/\bFusionnes\b/g, 'Fusionnés'],
  [/\bfusionnees\b/g, 'fusionnées'],
  [/\bFusionnees\b/g, 'Fusionnées'],
  [/\bfusionner\b/g, 'fusionner'],
  [/\bFusionner\b/g, 'Fusionner'],
  [/\bfusionnez\b/g, 'fusionnez'],
  [/\bFusionnez\b/g, 'Fusionnez'],

  // Défusionner
  [/\bdefusionner\b/g, 'défusionner'],
  [/\bDefusionner\b/g, 'Défusionner'],
  [/\bdefusionnez\b/g, 'défusionnez'],
  [/\bDefusionnez\b/g, 'Défusionnez'],

  // Insérer
  [/\binserer\b/g, 'insérer'],
  [/\bInserer\b/g, 'Insérer'],
  [/\binserez\b/g, 'insérez'],
  [/\bInserez\b/g, 'Insérez'],
  [/\binsere\b/g, 'inséré'],
  [/\bInsere\b/g, 'Inséré'],
  [/\binseree\b/g, 'insérée'],
  [/\bInseree\b/g, 'Insérée'],
  [/\binsertion\b/g, 'insertion'],
  [/\bInsertion\b/g, 'Insertion'],

  // Séparateur
  [/\bseparateur\b/g, 'séparateur'],
  [/\bSeparateur\b/g, 'Séparateur'],
  [/\bseparateurs\b/g, 'séparateurs'],
  [/\bSeparateurs\b/g, 'Séparateurs'],
  [/\bseparer\b/g, 'séparer'],
  [/\bSeparer\b/g, 'Séparer'],
  [/\bseparez\b/g, 'séparez'],
  [/\bSeparez\b/g, 'Séparez'],
  [/\bsepare\b/g, 'séparé'],
  [/\bSepare\b/g, 'Séparé'],
  [/\bseparee\b/g, 'séparée'],
  [/\bSeparee\b/g, 'Séparée'],
  [/\bsepares\b/g, 'séparés'],
  [/\bSepares\b/g, 'Séparés'],
  [/\bseparees\b/g, 'séparées'],
  [/\bSeparees\b/g, 'Séparées'],
  [/\bseparation\b/g, 'séparation'],
  [/\bSeparation\b/g, 'Séparation'],

  // Répéter
  [/\brepeter\b/g, 'répéter'],
  [/\bRepeter\b/g, 'Répéter'],
  [/\brepetez\b/g, 'répétez'],
  [/\bRepetez\b/g, 'Répétez'],
  [/\brepete\b/g, 'répété'],
  [/\bRepete\b/g, 'Répété'],
  [/\brepetee\b/g, 'répétée'],
  [/\bRepetee\b/g, 'Répétée'],
  [/\brepetition\b/g, 'répétition'],
  [/\bRepetition\b/g, 'Répétition'],

  // Déplacer
  [/\bdeplacer\b/g, 'déplacer'],
  [/\bDeplacer\b/g, 'Déplacer'],
  [/\bdeplacez\b/g, 'déplacez'],
  [/\bDeplacez\b/g, 'Déplacez'],
  [/\bdeplace\b/g, 'déplacé'],
  [/\bDeplace\b/g, 'Déplacé'],
  [/\bdeplacee\b/g, 'déplacée'],
  [/\bDeplacee\b/g, 'Déplacée'],
  [/\bdeplacement\b/g, 'déplacement'],
  [/\bDeplacement\b/g, 'Déplacement'],

  // Présenter
  [/\bpresenter\b/g, 'présenter'],
  [/\bPresenter\b/g, 'Présenter'],
  [/\bpresentez\b/g, 'présentez'],
  [/\bPresentez\b/g, 'Présentez'],
  [/\bpresentation\b/g, 'présentation'],
  [/\bPresentation\b/g, 'Présentation'],
  [/\bpresentations\b/g, 'présentations'],
  [/\bPresentations\b/g, 'Présentations'],

  // Vérifier patterns manquants
  [/\bverifie\b/g, 'vérifié'],
  [/\bVerifie\b/g, 'Vérifié'],
  [/\bverifiee\b/g, 'vérifiée'],
  [/\bVerifiee\b/g, 'Vérifiée'],
  [/\bverifies\b/g, 'vérifiés'],
  [/\bVerifies\b/g, 'Vérifiés'],
  [/\bverifiees\b/g, 'vérifiées'],
  [/\bVerifiees\b/g, 'Vérifiées'],
];

// Directories to process
const contentDirs = ['blog', 'formations', 'pages'];

// Stats tracking
let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

/**
 * Apply accent replacements to text
 */
function restoreAccents(text) {
  let modified = text;
  let replacementCount = 0;

  for (const [pattern, replacement] of accentReplacements) {
    const matches = modified.match(pattern);
    if (matches) {
      replacementCount += matches.length;
      modified = modified.replace(pattern, replacement);
    }
  }

  return { text: modified, count: replacementCount };
}

/**
 * Process a single MDX file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { text: newContent, count } = restoreAccents(content);

    if (count > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`  ✓ ${path.basename(filePath)}: ${count} replacements`);
      modifiedFiles++;
      totalReplacements += count;
    }

    totalFiles++;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}: ${error.message}`);
  }
}

/**
 * Process all MDX files in a directory
 */
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`  Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'));
  console.log(`\nProcessing ${files.length} files in ${path.basename(dirPath)}/`);

  for (const file of files) {
    processFile(path.join(dirPath, file));
  }
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('French Accent Restoration Script');
  console.log('='.repeat(60));

  const contentPath = path.join(process.cwd(), 'content');

  for (const dir of contentDirs) {
    const dirPath = path.join(contentPath, dir);
    processDirectory(dirPath);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log(`  Total files processed: ${totalFiles}`);
  console.log(`  Files modified: ${modifiedFiles}`);
  console.log(`  Total replacements: ${totalReplacements}`);
  console.log('='.repeat(60));
}

// Run the script
main();
