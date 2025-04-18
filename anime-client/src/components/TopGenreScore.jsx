import React, { useEffect, useState } from "react";

const TopGenreScore = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/topgenrescore")
      .then((res) => res.text()) // get raw text instead of json
    .then((text) => {
      
      const safeText = text.replace(/\bNaN\b/g, 'null');

      const data = JSON.parse(safeText);

      setAnimes(data);
    })
      .catch((error) => console.error("Erreur lors de la récupération des animes avec score > 8:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🔥 Animes avec un score suppérieur à 8 dans les genres les plus populaires</h2>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Score</th>
            <th>Type</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.title}</td>
              <td>{anime.score}</td>
              <td>{anime.type}</td>
              <td>
                {anime.genres.map((genre, idx) => (
                  <span key={idx} className="badge bg-primary">{genre.name}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/stats/top" className="btn btn-outline-dark">← Retour</a>
    </div>
  );
};

export default TopGenreScore;
