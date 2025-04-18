import React, { useEffect, useState } from "react";

const Types = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/stats/types")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des types d'animes");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
       
        setTypes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">📺 Top 5 types d’animes les plus courants</h2>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">📺 Top 5 types d’animes les plus courants</h2>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">📺 Top 5 types d’animes les plus courants</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Type</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {types.map((t, index) => (
            <tr key={index}>
              <td>{t.type}</td>
              <td>{t.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/stats/top" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default Types;
