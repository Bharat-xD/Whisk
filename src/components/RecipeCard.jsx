import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <img className="recipe-image" src={recipe.image} alt={recipe.name} loading="lazy" />
      <div className="recipe-info">
        <p className="recipe-name">{recipe.name}</p>
        <div className="recipe-tags">
          {recipe.category && <span className="recipe-tag">{recipe.category}</span>}
          {recipe.cuisine && <span className="recipe-tag recipe-tag-cuisine">{recipe.cuisine}</span>}
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;