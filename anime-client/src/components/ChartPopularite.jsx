import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ChartPopularite = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stats/chart-popularite")
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des données :", err);
      });
  }, []);

  const trace = {
    x: chartData.map((d) => d.score),
    y: chartData.map((d) => d.popularity),
    text: chartData.map((d) => d.title),
    mode: "markers+text",
    type: "scatter",
    marker: { size: 12, color: "rgba(0,123,255,0.7)" },
    textposition: "top center",
    name: "Anime",
  };

  const layout = {
    xaxis: {
      title: {
        text: "Score",
        font: {
          size: 18,
          color: "#333",
        },
      },
      showline: true,
      zeroline: false,
    },
    yaxis: {
      title: {
        text: "Popularité (rang)",
        font: {
          size: 18,
          color: "#333",
        },
      },
      autorange: "reversed",
      showline: true,
      zeroline: false,
    },
    legend: {
      orientation: "h",
      xanchor: "center",
      x: 0.5,
      y: -0.2,
    },
    margin: { t: 60, l: 70, r: 40, b: 70 },
    height: 600,
    width: 900,
  };

  return (
    <Container
      className="py-5 d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        maxWidth: "1000px",
      }}
    >
      <h2 className="mb-4 text-center">📊 Score vs Popularité (Top 10)</h2>
      <Plot data={[trace]} layout={layout} />
      <Link to="/">
        <Button variant="outline-dark" className="mt-4">
          ← Retour
        </Button>
      </Link>
    </Container>
  );
};

export default ChartPopularite;