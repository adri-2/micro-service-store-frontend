# Frontend - Microservices Project

Interface React pour l'application microservices. Ce projet fournit une interface utilisateur moderne pour interagir avec les services backend (Account, Order, Product).

## 🎯 Objectif

Ce frontend communique avec une architecture microservices composée de :

- **Account Service** : Gestion des comptes et authentification
- **Order Service** : Gestion des commandes
- **Product Service** : Gestion du catalogue de produits
- **Message Service** : Service de messagerie

## 🛠️ Tech Stack

- **React 19** : Framework UI
- **Vite** : Build tool rapide
- **Tailwind CSS** : Styling utilitaire
- **Material-UI** : Composants UI
- **Axios** : Client HTTP
- **React Router** : Navigation
- **Zustand** : Gestion d'état
- **ESLint** : Linting du code

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou yarn

### Étapes

1. **Cloner et accéder au répertoire**

```bash
cd frontend
```

1. **Installer les dépendances**

```bash
npm install
```

1. **Configurer les variables d'environnement** (si nécessaire)
Créer un fichier `.env` avec les URLs des services :

```env
VITE_API_URL=http://localhost:8000
```

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173` avec HMR activé.

### Build production

```bash
npm run build
```

### Preview du build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📂 Structure du Projet

```
src/
├── api/              # Clients HTTP pour chaque service
├── components/       # Composants réutilisables
├── hooks/           # Hooks personnalisés
├── pages/           # Pages principales
├── store/           # Gestion d'état (Zustand)
├── assets/          # Ressources statiques
├── App.jsx          # Composant principal
└── main.jsx         # Point d'entrée
```

## 🔗 Points d'Entrée API

- Account Service : `http://localhost:8000/api/accounts`
- Order Service : `http://localhost:8001/api/orders`
- Product Service : `http://localhost:8002/api/products`

## 🐛 Dépannage

- S'assurer que tous les services backend sont en cours d'exécution
- Vérifier les URLs des services dans les fichiers `src/api/`
- Consulter la console du navigateur pour les erreurs

## 📝 Notes

- Ce projet utilise Zustand pour la gestion d'état simple et légère
- Les requêtes HTTP sont centralisées dans `src/api/`
- Tailwind CSS est configuré pour le styling responsif
