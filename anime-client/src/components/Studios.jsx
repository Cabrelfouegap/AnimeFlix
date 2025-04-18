import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Studios = () => {
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/studios")
      .then((res) => res.json())
      .then((data) => setStudios(data))
      .catch((error) => console.error("Erreur lors de la récupération des studios:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">🏢 Top 5 studios d'animation les plus représentés</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Studio</th>
            <th>Nombre d’animes</th>
          </tr>
        </thead>
        <tbody>
          {studios.map(([studio, count], index) => (
            <tr key={index}>
              <td>{studio}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/stats/top" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default Studios;
