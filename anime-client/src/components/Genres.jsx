import React, { useEffect, useState } from "react";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stats/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Erreur lors de la récupération des données:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📚 Top 10 Genres les plus fréquents</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Genre</th>
            <th>Nombre d'animes</th>
          </tr>
        </thead>
        <tbody>
          {genres.map(([genre, count], index) => (
            <tr key={index}>
              <td>{genre}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/stats/top" className="btn btn-outline-dark mt-3">
        ← Retour au Top
      </a>
    </div>
  );
};

export default Genres;
