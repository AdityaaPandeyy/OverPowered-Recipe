import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../Hooks/useGetUserID";

export default function Home() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}`);
        console.log(response.data); // Check the response from the server
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);

  console.log(savedRecipes); // Check the value of savedRecipes

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul style={{ display: "flex" }}>
        {savedRecipes && savedRecipes.map((recipe) => (
          <li
            key={recipe._id}
            style={{
              background: "red",
              maxWidth: "13rem",
              margin: "1rem",
              border: "2px solid black",
            }}
          >
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img
              src={recipe.imageURL}
              alt={recipe.name}
              style={{ maxHeight: "5rem" }}
            />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
