import React, { useEffect, useState } from "react";

const TopGenre = () => {
  const [genreTop, setGenreTop] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/topgenre")
      .then((res) => res.json())
      .then((data) => {
      const formatted = Object.entries(data).map(([genre, animes]) => ({
        genre,
        animes,
      }));
      setGenreTop(formatted); // now it's an array
    })
      .catch((error) => console.error("Erreur lors de la récupération des animes par genre:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🔥 Top animes dans les 10 genres les plus populaires</h2>

      {genreTop.map((genreData, index) => (
        <div key={index}>
          <h4 className="mt-4">{genreData.genre}</h4>
          <ul className="list-group mb-3">
            {genreData.animes.map((anime, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {anime.title}
                <span className="badge bg-primary rounded-pill">{anime.score}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <a href="/stats/top" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default TopGenre;
