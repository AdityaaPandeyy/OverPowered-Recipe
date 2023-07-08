const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./Routes/UserRoutes")
const RecipeRouter = require("./Routes/RecipeRoutes")
const app = express();

app.use(express.json());
app.use(cors());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://zaemoncoder:mernstack@recipes.pshhxrr.mongodb.net/recipes?retryWrites=true&w=majority"
    );
    console.log("Connected to Database");
  } catch (error) {
    console.log(`Error connecting to database : ${error}`);
  }
};
connectToDatabase()

app.use("/auth",UserRouter)
app.use("/recipe",RecipeRouter)
app.listen(3001, () => {
  console.log("Server Started");
});
