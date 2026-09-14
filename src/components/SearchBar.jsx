import React, { useState } from "react";

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("name"); // "name" | "ingredient"

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") return;
    onSearch(trimmed, mode);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-mode">
        <button
          type="button"
          className={`mode-btn ${mode === "name" ? "mode-btn-active" : ""}`}
          onClick={() => setMode("name")}
        >
          By Name
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === "ingredient" ? "mode-btn-active" : ""}`}
          onClick={() => setMode("ingredient")}
        >
          By Ingredient
        </button>
      </div>

      <div className="search-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "name" ? "Search recipes…" : "Search by ingredient…"}
          className="search-input"
          aria-label="Search recipes"
        />
        <button type="submit" className="search-btn" disabled={isLoading}>
          {isLoading ? "…" : "Search"}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;