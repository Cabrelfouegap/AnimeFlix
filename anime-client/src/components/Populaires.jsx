import React, { useEffect, useState } from "react";

const Populaires = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/populaires")
      .then((res) => res.json())
      .then((data) => setAnimes(data))
      .catch((error) => console.error("Erreur lors de la récupération des animes populaires:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">👀 Top 20 des animes les plus regardés (popularité)</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Popularité</th>
            <th>Score</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.title}</td>
              <td># {anime.popularity}</td>
              <td>{anime.score}</td>
              <td>
                {anime.genres.map((genre, idx) => (
                  <span key={idx} className="badge bg-secondary">
                    {genre.name}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default Populaires;
