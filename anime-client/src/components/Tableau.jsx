import React, { useEffect, useState } from "react";
import $ from "jquery";


const Tableau = () => {
  const [animes, setAnimes] = useState([]);

 useEffect(() => {
  fetch("http://localhost:5000/stats/tableau")
    .then((res) => res.text()) // get raw text instead of json
    .then((text) => {
      
      const safeText = text.replace(/\bNaN\b/g, 'null');

      const data = JSON.parse(safeText);

      setAnimes(data);
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des animes:", error)
    );
}, []);


  // useEffect(() => {
  //   if (animes.length) {
  //     $('#animeTable').DataTable({
  //       pageLength: 10,
  //       language: {
  //         search: "🔍 Rechercher :",
  //         lengthMenu: "Afficher _MENU_ lignes",
  //         info: "Page _PAGE_ sur _PAGES_",
  //         paginate: {
  //           previous: "Précédent",
  //           next: "Suivant"
  //         }
  //       }
  //     });
  //   }
  // }, [animes]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📋 Tableau interactif des animes</h2>
      <table id="animeTable" className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Score</th>
            <th>Votes</th>
            <th>Type</th>
            <th>Année</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime, index) => (
            <tr key={index}>
              <td>{anime.titre}</td>
              <td>{anime.score}</td>
              <td>{anime.scored_by || "N/A"}</td>
              <td>{anime.type}</td>
              <td>{anime.annee}</td>
              <td>{anime.genres || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="btn btn-outline-dark mt-4">← Retour</a>
    </div>
  );
};

export default Tableau;
