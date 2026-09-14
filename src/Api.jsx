const BASE_URL = "https://www.themealdb.com/api/json/v1/1";


function toSummary(meal, fallback = {}) {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || fallback.category || null,
    cuisine: meal.strArea || fallback.cuisine || null,
  };
}

export async function searchByName(name) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Search request failed");
  const data = await res.json();
  return (data.meals || []).map((meal) => toSummary(meal));
}

export async function filterByIngredient(ingredient) {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  if (!res.ok) throw new Error("Filter request failed");
  const data = await res.json();
  return (data.meals || []).map((meal) => toSummary(meal));
}

export async function filterByCategory(category) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Filter request failed");
  const data = await res.json();
  return (data.meals || []).map((meal) => toSummary(meal, { category }));
}

export async function filterByCuisine(cuisine) {
  const res = await fetch(`${BASE_URL}/filter.php?a=${encodeURIComponent(cuisine)}`);
  if (!res.ok) throw new Error("Filter request failed");
  const data = await res.json();
  return (data.meals || []).map((meal) => toSummary(meal, { cuisine }));
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/list.php?c=list`);
  if (!res.ok) throw new Error("Category list request failed");
  const data = await res.json();
  return (data.meals || []).map((entry) => entry.strCategory);
}

export async function fetchCuisines() {
  const res = await fetch(`${BASE_URL}/list.php?a=list`);
  if (!res.ok) throw new Error("Cuisine list request failed");
  const data = await res.json();
  return (data.meals || []).map((entry) => entry.strArea);
}

export async function fetchRecipeDetail(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Recipe lookup failed");
  const data = await res.json();

  if (!data.meals || data.meals.length === 0) {
    throw new Error("RECIPE_NOT_FOUND");
  }

  const meal = data.meals[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim());
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    cuisine: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
  };
}