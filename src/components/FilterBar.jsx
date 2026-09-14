import React, { useState, useEffect } from "react";
import { fetchCategories, fetchCuisines } from "../api";

function FilterBar({ onFilterCategory, onFilterCuisine, isLoading }) {
  const [categories, setCategories] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  // Load the filter option.
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
    fetchCuisines().then(setCuisines).catch(() => setCuisines([]));
  }, []);

  return (
    <div className="filter-bar">
      <select
        className="filter-select"
        defaultValue=""
        disabled={isLoading}
        onChange={(e) => {
          if (e.target.value) onFilterCategory(e.target.value);
          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Filter by category…
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        defaultValue=""
        disabled={isLoading}
        onChange={(e) => {
          if (e.target.value) onFilterCuisine(e.target.value);
          e.target.value = "";
        }}
      >
        <option value="" disabled>
          Filter by cuisine…
        </option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;