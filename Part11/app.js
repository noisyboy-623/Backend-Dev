const express = require('express');
const app = express();

const userModel = require('./usermodel');

app.get("/", (req,res) => {
    res.send("Heyy");
})

app.get("/create", async (req,res) => {
    let createdUser = await userModel.create({
        name: "apple",
        username: "seb",
        email: "seb@def.ghi"
    })
    res.send(createdUser);
})

app.get("/read", async (req,res) => {
    let users = await userModel.find()
    res.send(users);
})

app.get("/update", async (req,res) => {
    let updatedUser = await userModel.findOneAndUpdate({username: "def"},{name: "xyz"})
    res.send(updatedUser);
})

app.get("/delete", async (req,res) => {
    let deletedUser = await userModel.findOneAndDelete({name: "apple"})
    res.send(deletedUser);
})

app.listen(3000);