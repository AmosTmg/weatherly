import express from "express";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}))

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/api/key", (req, res)=>{
    res.json({apiKey : process.env.GEOCODING_API_KEYS});
})

app.post("/get-weatherly",(req, res)=>{
    const address = req.body.address;
    res.render("main.ejs");
    console.log(address);
})

app.listen(`${process.env.port}`, console.log(`Server is running on port ${process.env.port}`));