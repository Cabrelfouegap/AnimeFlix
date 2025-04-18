import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Tableau from "./components/tableau";
import Top from "./components/top";
import Genres from "./components/genres";
import Decennies from "./components/decennies";
import Moindre from "./components/moindre";
import CombosGenres from "./components/combogenres";
import TopGenre from "./components/topgenre";
import TopGenreScore from "./components/topgenrescore";
import Studios from "./components/studios";
import Types from "./components/types";
import Populaires from "./components/populaires";
import PlusNotes from "./components/PlusNotes";
import TypeScore from "./components/typescore";
import ChartPopularite from "./components/ChartPopularite";
import ChartScoreVotes from "./components/ChartScoreVotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats/tableau" element={<Tableau />} />
        <Route path="/stats/top" element={<Top />} />
        <Route path="/stats/genres" element={<Genres />} />
        <Route path="/stats/decennies" element={<Decennies />} />
        <Route path="/stats/moinsapprecie" element={<Moindre />} />
        <Route path="/stats/combogenres" element={<CombosGenres />} />
        <Route path="/stats/topgenre" element={<TopGenre />} />
        <Route path="/stats/topgenrescore" element={<TopGenreScore />} />
        <Route path="/stats/studios" element={<Studios />} />
        <Route path="/stats/types" element={<Types />} />
        <Route path="/stats/populaires" element={<Populaires />} />
        <Route path="/stats/plus_notes" element={<PlusNotes />} />
        <Route path="/stats/typescore" element={<TypeScore />} />
        <Route path="/stats/chart-popularite" element={<ChartPopularite />} />
        <Route path="/stats/chart-score-votes" element={<ChartScoreVotes />} />
      </Routes>
    </Router>
  );
}

export default App;
