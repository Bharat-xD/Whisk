import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import RecipeGrid from "../components/RecipeGrid";
import { searchByName, filterByIngredient, filterByCategory, filterByCuisine } from "../api";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // One shared runner for every kind of lookup (name, ingredient, category, cuisine)
  const runLookup = async (fetchFn, ...args) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await fetchFn(...args);
      setRecipes(results);
    } catch {
      setError("Couldn't load recipes right now. Please try again.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query, mode) => {
    if (mode === "name") {
      runLookup(searchByName, query);
    } else {
      runLookup(filterByIngredient, query);
    }
  };

  return (
    <div className="page">
      <div className="app-wrap">
        <h1 className="app-title">Recipe Finder</h1>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <FilterBar
          onFilterCategory={(category) => runLookup(filterByCategory, category)}
          onFilterCuisine={(cuisine) => runLookup(filterByCuisine, cuisine)}
          isLoading={isLoading}
        />

        <RecipeGrid
          recipes={recipes}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
}

export default Home;