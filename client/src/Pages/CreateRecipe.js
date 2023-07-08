import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../Hooks/useGetUserID";
import { useCookies } from "react-cookie";
export default function CreateRecipe() {
  const userID = useGetUserID()
  const [cookies,_] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipe/",recipe ,{headers:{authorization:cookies.access_token}}
      );

      alert("Recipe Created");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({...recipe, ingredients});
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  return (
    <form
      className="container custom-form mt-5"
      style={{ maxWidth: "40rem" }}
      onSubmit={handleSubmit}
    >
      <div className="text-white fs-3 mt-3 mb-5" style={{ textAlign: "left" }}>
        Create a Recipe
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className="form-label text-white fs-5 text-left"
        >
          Name :
        </label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          className="form-control custom-input"
          id="name"
          aria-describedby="emailHelp"
          onChange={handleChange}
        />
      </div>
      <label htmlFor="ingredients" className="text-white">Ingredients</label>
      {recipe && recipe.ingredients.map((ingredient, index) => (
        <div>
        <input
          key={index}
          type="text"
          name="ingredients"
          value={ingredient}
          onChange={(event) => handleIngredientChange(event, index)}
        />
        </div>
      ))}
      <button type="button" onClick={handleAddIngredient}>
        Add Ingredient
      </button>
      <div className="mb-3" style={{ marginTop: "4rem" }}>
        <label
          htmlFor="exampleInputPassword1"
          className="form-label text-white fs-5 text-left"
        >
          Instructions:
        </label>
        <input
          type="text"
          name="instructions"
          value={recipe.instructions}
          className="form-control custom-input"
          id="exampleInputPassword1"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3" style={{ marginTop: "4rem" }}>
        <label
          htmlFor="exampleInputPassword1"
          className="form-label text-white fs-5 text-left"
        >
          Image URL :
        </label>
        <input
          type="text"
          name="imageURL"
          value={recipe.imageURL}
          className="form-control custom-input"
          id="exampleInputPassword1"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3" style={{ marginTop: "4rem" }}>
        <label
          htmlFor="exampleInputPassword1"
          className="form-label text-white fs-5 text-left"
        >
          Cooking Time :
        </label>
        <input
          type="text"
          name="cookingTime"
          value={recipe.cookingTime}
          className="form-control custom-input"
          id="exampleInputPassword1"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary custom-button">
        Create Recipe
      </button>
    </form>
  );
}
