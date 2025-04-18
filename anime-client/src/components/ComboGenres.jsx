import React, { useEffect, useState } from "react";

const CombosGenres = () => {
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/combogenres")
      .then((res) => res.json())
      .then((data) => setCombos(data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🎭 Combinaisons de genres les plus fréquentes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Genres combinés</th>
            <th>Nombre d'animes</th>
          </tr>
        </thead>
        <tbody>
          {combos.map((c, index) => (
            <tr key={index}>
              <td>{c.combo}</td>
              <td>{c.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="btn btn-outline-dark mt-4">
        ← Retour
      </a>
    </div>
  );
};

export default CombosGenres;
