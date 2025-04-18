import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist";

const ChartScoreVotes = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/stats/chart-score-votes")
      .then((res) => res.json())
      .then((data) => {
        const trace = {
          x: data.map((d) => d.scored_by),
          y: data.map((d) => d.score),
          text: data.map((d) => d.titre),
          mode: "markers+text",
          type: "scatter",
          textposition: "top center",
          marker: {
            size: 10,
            color: data.map((d) => d.score),
            colorscale: "Viridis",
            showscale: true,
            colorbar: { title: "Score" },
          },
          hovertemplate:
            "<b>%{text}</b><br>Votes: %{x}<br>Score: %{y}<extra></extra>",
        };

        const layout = {
          xaxis: { title: {text :"Nombre de votes", font: {size: 18, color: "#333"}}, showline: true, zeroline: false },
          yaxis: { title: {text :"Score", font: {size: 18, color: "#333"}}, showline: true, zeroline: false },
          margin: { t: 50 },
          height: 600,
          title: "Relation Score / Popularité des animes",
        };

        Plotly.newPlot(chartRef.current, [trace], layout);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">📈 Score vs Nombre de votes (Top 50 animes)</h2>
      <div ref={chartRef} id="chart"></div>
      <a href="/" className="btn btn-outline-dark mt-4">
        ← Retour
      </a>
    </div>
  );
};

export default ChartScoreVotes;
