import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../Hooks/useGetUserID";
import { useCookies } from "react-cookie";
export default function Home() {
  const [recipe, setrecipe] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies,_] = useCookies(["access_token"])
  const userID = useGetUserID();
  const handleClick = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipe", {
        recipeID,
        userID,
      },{headers:{authorization:cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipe/");
        setrecipe(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    if(cookies.access_token) fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1>Recipes</h1>
      <ul style={{ display: "flex" }}>
        {recipe.map((recipe) => (
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
              {savedRecipes && savedRecipes.includes(recipe._id) ? (
                <button disabled>Saved</button>
              ) : (
                <button onClick={() => handleClick(recipe._id)}>
                  Save Recipe
                </button>
              )}
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
