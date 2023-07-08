const express = require("express");
const RecipeSchema = require("../models/RecipeSchema");
const UserSchema = require("../models/UserSchema");
const RecipeRouter = express.Router();
const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
	const token = req.headers.authorization;
	if(token){
		jwt.verify(token,"jwtSecretHueHue",(err) => {
		if(err)return res.sendStatus(403);
		next();
		});
	} else {
    alert("Login First")
		res.sendStatus(401);
	}	
};

RecipeRouter.get("/", async (req, res) => {
  try {
    const response = await RecipeSchema.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

RecipeRouter.post("/", verifyToken ,async (req, res) => {
  const recipe = new RecipeSchema(req.body);
  try {
    const response = await recipe.save();
    res.json({ message: "Recipe Added Successfully" });
  } catch (error) {
    res.json(error);
  }
});

RecipeRouter.put("/", verifyToken , async (req, res) => {
  try {
    const recipe = await RecipeSchema.findById(req.body.recipeID);
    const user = await UserSchema.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    const response = await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

  RecipeRouter.get(`/savedRecipes/ids/:userID`, async (req, res) => {
    try {
      const user = await UserSchema.findById(req.params.userID);
      res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
      res.json(err);
    }
  });

RecipeRouter.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userID);
    const savedRecipes = await RecipeSchema.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


module.exports = RecipeRouter;