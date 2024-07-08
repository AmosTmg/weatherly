import express from "express";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.listen(`${process.env.port}`, console.log(`Server is running on port ${process.env.port}`));