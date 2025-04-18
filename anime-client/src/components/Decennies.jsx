import React, { useEffect, useState } from "react";

const Decennies = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/decennies")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📅 Animes par décennie</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Décennie</th>
            <th>Nombre d'animes</th>
            <th>Score moyen</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((d, index) => (
            <tr key={index}>
              <td>{d.décennie}</td>
              <td>{d.nb_animes}</td>
              <td>{d.score_moyen.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="btn btn-outline-dark mt-3">
        ← Retour
      </a>
    </div>
  );
};

export default Decennies;
