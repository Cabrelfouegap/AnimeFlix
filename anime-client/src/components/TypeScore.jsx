import React, { useEffect, useState } from "react";

const TypeScore = () => {
  const [typescore, setTypescore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remplacer cette URL par celle de votre API pour récupérer les scores par type
    fetch("http://localhost:5000/stats/typescore")
      .then((res) => res.json())
      .then((data) => {
        setTypescore(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des scores par type d'anime :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📊 Moyenne des scores par type d’anime</h2>

      {loading ? (
        <p>Chargement des données...</p>
      ) : typescore.length === 0 ? (
        <p>Aucune donnée disponible pour les scores par type d'anime.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Score moyen</th>
            </tr>
          </thead>
          <tbody>
            {typescore.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.score_moyen.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <a href="/stats/top" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default TypeScore;
