import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecipeDetail } from "../api";

function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-fetch whenever `id` changes 
  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchRecipeDetail(id);
        if (!isCancelled) setRecipe(data);
      } catch (err) {
        if (!isCancelled) {
          setError(
            err.message === "RECIPE_NOT_FOUND"
              ? "Recipe not found."
              : "Couldn't load this recipe. Please try again."
          );
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      isCancelled = true;
    };
  }, [id]);

  return (
    <div className="page">
      <div className="app-wrap">
        <Link to="/" className="back-link">
          ← Back to search
        </Link>

        {isLoading && <p className="status-text">Loading recipe…</p>}
        {!isLoading && error && <p className="status-text status-error">{error}</p>}

        {!isLoading && !error && recipe && (
          <article className="recipe-detail">
            <img className="detail-image" src={recipe.image} alt={recipe.name} />

            <h1 className="detail-title">{recipe.name}</h1>

            <div className="detail-tags">
              {recipe.category && <span className="recipe-tag">{recipe.category}</span>}
              {recipe.cuisine && <span className="recipe-tag recipe-tag-cuisine">{recipe.cuisine}</span>}
            </div>

            <section className="detail-section">
              <h2 className="detail-heading">Ingredients</h2>
              <ul className="ingredient-list">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h2 className="detail-heading">Instructions</h2>
              <p className="instructions-text">{recipe.instructions}</p>
            </section>
          </article>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;