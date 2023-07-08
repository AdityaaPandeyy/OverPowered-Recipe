const mongoose = require("mongoose");
const { Schema } = require("mongoose")
const RecipeSchema = new Schema({
    name : {type : String , required:true},
    ingredients : [{type : String , required:true}],
    instructions : {type : String , required:true},
    imageURL : {type : String , required:true},
    cookingTime : {type : Number , required:true},
    userOwner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
});

module.exports = mongoose.model("recipe",RecipeSchema)