# FujiTask – Application de gestion de tâches (Frontend)

## Fonctionnalités principales

- **Ajout de tâches** : formulaire multi-étapes avec validation, suggestions de localisation (API Mapbox), gestion de la date/heure, description, etc.
- **Affichage de la liste** : toutes les tâches sont listées avec nom, description, localisation, date/heure et statut (réalisée/en cours).
- **Modification de tâche** : édition dynamique (nom, description, localisation, date/heure) avec suggestions et validation.
- **Suppression de tâche** : confirmation avant suppression définitive.
- **Complétion** : possibilité de marquer une tâche comme réalisée ou non réalisée.
- **Filtres dynamiques** : filtrage par statut (Toutes, En cours, Réalisées) via boutons accessibles.
- **Suggestions de localisation** : autocomplétion lors de la saisie de la localisation grâce à l’API Mapbox.
- **Accessibilité** : navigation clavier, focus automatique sur les champs pertinents, boutons accessibles.
- **Design responsive** : interface moderne, adaptée mobile et desktop.
- **Tests unitaires et d’intégration** : couverture élevée sur les composants et les workflows principaux.
- **Qualité de code** : typage TypeScript strict, ESLint, Prettier, conventions pro.

## Stack technique
- React 18 + TypeScript
- Axios (services API)
- Jest + React Testing Library (tests)
- ESLint, Prettier

## Structure des composants
- `TodoForm` : ajout de tâche (multi-étapes, suggestions)
- `TodoItem` : affichage, modification, suppression, complétion d’une tâche
- `TodoList` : conteneur de la liste
- `TodoFilters` : boutons de filtre
- `Footer` : pied de page

## Lancer l’application
```sh
npm install
npm start
```

## Lancer les tests
```sh
npm test
```

## Couverture de tests
```sh
npm test -- --coverage --watchAll=false
```

---

Pour toute question ou contribution, voir le dépôt GitHub du projet.
