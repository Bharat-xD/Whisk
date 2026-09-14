import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The default page: search + filters + results grid */}
        <Route path="/" element={<Home />} />

        {/* :id is a dynamic segment — useParams() in RecipeDetail reads it */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;