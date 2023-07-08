const mongoose = require("mongoose");
const { Schema } = require("mongoose")
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes:[{type:mongoose.Schema.Types.ObjectId , ref:"recipes"}]
});

module.exports = mongoose.model('user',UserSchema)