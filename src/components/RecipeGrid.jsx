import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, isLoading, error, hasSearched }) {
  if (isLoading) {
    return <p className="status-text">Loading recipes…</p>;
  }

  if (error) {
    return <p className="status-text status-error">{error}</p>;
  }

  if (hasSearched && recipes.length === 0) {
    return <p className="status-text">No recipes found. Try a different search.</p>;
  }

  if (!hasSearched) {
    return <p className="status-text">Search a recipe name, an ingredient, or pick a filter to get started.</p>;
  }

  return (
    <div className="recipe-grid">
      {/* map() turns each recipe object into a rendered RecipeCard */}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeGrid;