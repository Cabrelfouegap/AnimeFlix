import React, { useEffect, useState } from "react";

const Top = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/top")
      .then((res) => res.text()) // get raw text instead of json
    .then((text) => {
      
      const safeText = text.replace(/\bNaN\b/g, 'null');

      const data = JSON.parse(safeText);

      setAnimes(data);
    })
      .catch((error) => console.error("Erreur lors de la récupération des animes:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🏆 Top 10 des animes par score</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Score</th>
            <th>Type</th>
            <th>Année</th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.titre}</td>
              <td>{anime.score}</td>
              <td>{anime.type}</td>
              <td>{anime.année}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="btn btn-outline-dark">← Retour</a>
    </div>
  );
};

export default Top;
