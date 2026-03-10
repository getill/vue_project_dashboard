# Mini Projet - Rapport de l'Application Tableau de Bord

**Nom de l'étudiant :** Théo Lemray  
**Titre du Projet :** Tableau de Bord Admin E-Commerce Vue 3  
**Dépôt GitHub :** https://github.com/getill/vue_project_dashboard.git 
**Date :** Mars 2026

---

## 1. Aperçu des Fonctionnalités

L'application développée est un projet complet utilisant l'API de Composition Vue 3, qui respecte tous les critères définis dans les contraintes.

- **Système d'Authentification :** Intégration d'une fausse page de connexion avec validation de formulaire. Utilise le store de l'authentification (`auth`) Pinia pour mapper les sessions utilisateurs dans le `localStorage`. La garde de navigation `beforeEach` de Vue Router applique la protection des routes.
- **Résumé du Tableau de Bord :** Le tableau de bord principal rassemble une logique de ventes simulées, affichant des KPI généraux sous forme de graphiques et visualisant les tendances des revenus hebdomadaires via `vue-chartjs`.
- **Module Produits :** Combine les données de `Fake Store API` dans un tableau de données paginé. Il permet de filtrer par chaîne de caractères pour le nom du produit ou via une liste déroulante pour la catégorie, et offre des capacités CRUD complètes (formulaires Créer/Éditer via des modales et Supprimer avec des confirmations par alerte).
- **Gestion des Utilisateurs :** Affiche les faux utilisateurs récupérés dans une liste détaillée permettant de voir les informations spécifiques d'un utilisateur grâce à une fenêtre modale personnalisée.
- **Vue des Analyses :** Route supplémentaire dédiée présentant des graphiques en barres et en anneau construits via Chart.js, analysant les revenus simulés par segment.
- **Mises en page Responsives :** Conception "mobile-first" avec une barre latérale (sidebar) et une barre de navigation (navbar) garantissant la visibilité et l'intégrité esthétique sur tous les écrans (mobile, tablette et bureau).

---

## 2. Explication Technique

### Structure du Projet
Organisé de manière stricte par domaines, en utilisant des architectures typiques des projets Vue à grande échelle.
- `src/views/` gère les pages de niveau supérieur du routage.
- `src/components/layout/` contient les wrappers universellement persistants (`Sidebar`, `Navbar`, `BaseLayout`).
- `src/stores/` abrite les modules Pinia séparés par préoccupation : `auth.js`, `dashboard.js`, `products.js`, `users.js`.
- `src/services/` inclut notre instance personnalisée Axios encapsulant les en-têtes HTTP de base et les points de terminaison.

### Gestion d'État
Pinia est largement utilisé pour gérer les enregistrements en cache, le mapping des données, les paramètres de recherche et les éléments de pagination, ce qui maintient les composants purs et concentrés sur l'UI. Cela garantit un flux de données unidirectionnel à travers l'application.

### Approche d'Intégration de l'API
Avec Axios, les fonctions dans les stores Pinia correspondent directement aux points de terminaison respectifs de la Fake Store API. Toutes les requêtes asynchrones mettent en œuvre des flux de travail `try-catch-finally` cohérents pour basculer les propriétés booléennes `isLoading` et capturer les potentielles `error` réseau.

---

## 3. Processus de Développement

**Défis Rencontrés & Solutions :**
L'intégration de la pagination avec la Fake Store API a posé un petit défi car l'API ne fournit pas nativement de métadonnées de pagination (comme `total_pages`). S'appuyer fortement sur les propriétés `computed` de Vue a résolu ce problème : récupérer tous les éléments en une seule fois et découper dynamiquement le tableau obtenu selon des décalages standards (`currentPage` et `itemsPerPage`).

**Décisions de Design :**
J'ai privilégié Tailwind CSS pour le prototypage rapide plutôt que des frameworks de composants (comme Vuetify) afin d'avoir un contrôle atomique sur l'espacement et des points de rupture mobiles précis pour éviter la surabondance de styles dans le bundle. J'ai choisi une approche multi-modales pour les opérations CRUD afin de préserver le contexte de l'application et de réduire les rechargements de route inutiles.

**Ce Que J'ai Appris :**
Ce projet a renforcé ma compréhension de la puissance architecturale de l'API de Composition Vue 3 associée à Pinia. Extraire la logique complexe de filtrage et de création de graphiques en des stores indépendants permet de bien nettoyer les fichiers contenant les composants `.vue`.

---

## 4. Instructions d'Installation

**Prérequis :** 
- Node.js installé (v18.x ou plus récent).

**Installation :**
1. Cloner le projet : `git clone https://github.com/getill/vue_project_dashboard.git`
2. Installer les modules Node : `npm install`
3. Démarrer le serveur de développement : `npm run dev`

---

## 5. Preuves de Test

**(Veuillez ajouter des captures d'écran à ce document lors de l'exportation, couvrant :)**
1. Le formulaire de connexion avec les erreurs de validation.
2. Le tableau de bord avec le graphique linéaire et les KPI.
3. La vue mobile montrant la navigation réduite.
4. La liste des produits et la modale "Ajouter un produit".
5. Le tableau des utilisateurs en mettant en évidence la modale de détails.
