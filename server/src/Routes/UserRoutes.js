const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/UserSchema");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserSchema.findOne({ username: req.body.username });
    if(user) return res.json({message:"User Already Exists"});
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await UserSchema.create({
        username:req.body.username,
        password:hashedPassword
    })
    res.json({message : "User Created Successfully"})
});
UserRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserSchema.findOne({ username: req.body.username });
    if(!user) return res.json({message:"User Doesn't Exist"});
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) return res.json({message:"User Doesn't Exist"})

    const token = jwt.sign({id:user._id},"jwtSecretHueHue")
    res.json({"token":token,"userID" : user._id})
});

module.exports = UserRouter;

