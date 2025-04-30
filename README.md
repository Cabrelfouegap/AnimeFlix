AnimeFlix - Plateforme d’analyse d’animes 📊
AnimeFlix est une application web interactive permettant d'explorer et d'analyser des données issues du monde des animes. Le projet exploite l’API Jikan (MyAnimeList) pour fournir des statistiques enrichies sur les animes les plus notés, les genres dominants, les studios les plus prolifiques et bien plus encore.

🚀 Objectifs
Offrir une interface visuelle simple et intuitive pour analyser les tendances du monde des animes.

Répondre à des questions précises sur la popularité, les genres, les studios, les scores moyens, etc.

Fournir une expérience utilisateur moderne grâce à un frontend responsive et dynamique.

🛠 Technologies utilisées
Backend : Python (Flask)

Base de données : Redis (cache mémoire)

Frontend : React.js + Bootstrap

API externe : Jikan API (non officielle de MyAnimeList)

Visualisation : Chart.js

🔍 Fonctionnalités principales
🔝 Top 10 des animes par score

🧬 Répartition par genres, types et studios

📈 Évolution des animes par décennie

🧠 Genres “cross-over” les plus fréquents

💔 Anime le moins apprécié

⭐ Classements par score et popularité

📐 Architecture
[React + Bootstrap] → [Flask API] → [Redis Cache] ← [Jikan API]

⚙️ Lancer le projet en local
1. Backend
bash
Copier
Modifier
cd backend
pip install -r requirements.txt
python app.py
2. Frontend
bash
Copier
Modifier
cd frontend
npm install
npm start
🧪 Tests
Backend : Flask + Postman

Frontend : Tests manuels via interface
