import React, { useEffect, useState } from "react";

const PlusNotes = () => {
  const [topAnimes, setTopAnimes] = useState([]);
  const [worstAnimes, setWorstAnimes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/stats/plus_notes')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erreur HTTP ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setTopAnimes(data.top);
      setWorstAnimes(data.worst); // ou data.top et data.worst selon ton affichage
    })
    .catch(err => {
      console.error("Erreur lors de la récupération des animes mal notés:", err);
    });


    // fetch("/stats/moinsapprecie")
    //   .then((res) => res.json())
    //   .then((data) => setWorstAnimes(data.worst))
    //   .catch((error) => console.error("Erreur lors de la récupération des animes mal notés:", error));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📊 Top 20 des animes les plus notés</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Score</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {topAnimes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.title}</td>
              <td>{anime.score}</td>
              <td>{anime.scored_by.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-5" />

      <h3 className="text-danger mb-3">💩 Animes très notés mais très mal aimés</h3>
      <p>Ces animes ont été massivement notés... mais mal aimés 😬</p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Score</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {worstAnimes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.title}</td>
              <td className="text-danger fw-bold">{anime.score}</td>
              <td>{anime.scored_by.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default PlusNotes;
