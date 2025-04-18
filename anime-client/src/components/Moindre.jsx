import React, { useEffect, useState } from "react";

const Moindre = () => {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/moinsapprecie")
     .then((res) => res.text()) // get raw text instead of json
    .then((text) => {
      
      const safeText = text.replace(/\bNaN\b/g, 'null');

      const data = JSON.parse(safeText);

      setAnimes(data);
    })
    
      .catch((error) => console.log("Erreur lors de la récupération des données:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-danger">👎 Top 10 des animes les moins appréciés</h2>
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
      <a href="/" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default Moindre;
