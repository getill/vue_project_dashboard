# Mini Projet Tableau de Bord Admin Vue 3

Un tableau de bord administrateur complet et prêt pour la production, construit avec l'API de Composition Vue 3, Vite, Pinia, Vue Router et Tailwind CSS.

## 🚀 Fonctionnalités Implémentées

1. **Authentification**
   - Flux de connexion simulé utilisant Pinia
   - Routes protégées (nécessitent une connexion)
   - État d'authentification persistant dans le localStorage

2. **Accueil du Tableau de Bord**
   - Cartes de statistiques générales (Ventes, Utilisateurs, Produits, Commandes)
   - Graphique linéaire des ventes (avec Chart.js)
   - Liste des commandes récentes

3. **Gestion des Produits**
   - CRUD complet : Créer, Lire, Mettre à jour, Supprimer avec l'API
   - Pagination des produits
   - Filtrage des produits par catégorie et terme de recherche
   - Modales de création et d'édition avec validation de formulaire

4. **Gestion des Utilisateurs**
   - Liste des utilisateurs avec avatars
   - Recherche d'utilisateurs par nom d'utilisateur, e-mail ou nom
   - Modale de vue détaillée montrant l'adresse complète et les informations de contact

5. **Analyses & Rapports**
   - Graphique en barres des ventes par mois
   - Graphique en anneau (Doughnut) des ventes par catégorie
   - Calcul des produits les plus vendus et affichage sous forme de tableau

6. **Design & Mise en page**
   - Design entièrement responsive utilisant Tailwind CSS
   - Navigation latérale (Sidebar) et barre de navigation supérieure (Navbar)
   - Indicateurs de chargement et gestion élégante des états d'erreur

## 🛠️ Technologies Utilisées

- **Vue 3** (API de Composition avec script setup)
- **Vite** (Outil de build)
- **Pinia** (Gestion d'état)
- **Vue Router** (Routage côté client)
- **Tailwind CSS** (Styles)
- **Axios** (Requêtes API)
- **vue-chartjs & Chart.js** (Visualisation de données)
- **Fake Store API** (Mock backend / fausses données de l'API)

## 🚦 Pour Commencer

### Prérequis

- Node.js >= 18.x
- npm ou yarn

### Étapes d'Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/getill/vue_project_dashboard.git
   cd vue_project_dashboard
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

4. **Compiler pour la production :**
   ```bash
   npm run build
   ```


## 📝 Problèmes Connus / Limitations
- L'API utilisée (Fake Store API) traite les requêtes POST/PUT/DELETE mais ne fait que simuler les actions sans modifier la base de données réelle. Ainsi, les produits nouvellement créés apparaîtront temporairement dans l'état local mais disparaîtront au rafraîchissement de la page.

## 👤 Auteur
- Théo Lemray
