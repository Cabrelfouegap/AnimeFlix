import React from "react";
import { Link } from "react-router-dom";

const pages = [
  { titre: "📋 Tableau interactif (DataTable)", url: "/stats/tableau" },
  { titre: "🏆 Top 10 animes par score", url: "/stats/top" },
  { titre: "📚 Top genres les plus fréquents", url: "/stats/genres" },
  { titre: "📅 Statistiques par décennie", url: "/stats/decennies" },
  { titre: "👎 Anime le moins apprécié", url: "/stats/moinsapprecie" },
  { titre: "🎭 Combos de genres fréquents", url: "/stats/combogenres" },
  { titre: "🔥 Top animes par genre populaire", url: "/stats/topgenre" },
  { titre: "💎 Score > 8 dans genres populaires", url: "/stats/topgenrescore" },
  { titre: "🏢 Top 5 studios", url: "/stats/studios" },
  { titre: "📺 Top types d’animes", url: "/stats/types" },
  { titre: "👀 Animes les plus regardés (popularité)", url: "/stats/populaires" },
  { titre: "📢 Animes les plus notés (et les plus détestés)", url: "/stats/plus_notes" },
  { titre: "📊 Score moyen par type", url: "/stats/typescore" },
  { titre: "📊 Graphique Score vs Popularité", url: "/stats/chart-popularite" },
  { titre: "📈 Graphique Score vs Nombre de votes", url: "/stats/chart-score-votes" },
];

const Home = () => {
  return (
    <div className="container py-5">
      <h1 className="mb-4">📊 Tableau de bord AnimeFlix</h1>
      <p>
        Explore différentes statistiques extraites de{" "}
        <strong>6 000+ animes</strong> depuis l’API Jikan & Redis Cloud.
      </p>

      <div className="list-group">
        {pages.map((page, index) => (
          <Link key={index} to={page.url} className="list-group-item list-group-item-action">
            {page.titre}
          </Link>
        ))}
      </div>

      <footer className="mt-5 text-center text-muted">
        <hr />
        <small>Projet réalisé avec Flask + Redis + Pandas + Bootstrap · Groupe 3</small>
      </footer>
    </div>
  );
};

export default Home;
