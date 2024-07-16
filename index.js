import express from "express";
import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended : true}))

let now = new Date();
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/api/key", (req, res)=>{
    res.json({apiKey : process.env.GEOCODING_API_KEYS});
})

app.post("/get-weatherly", async(req, res)=>{
    try{
        // formatting the address suitable for forwarding this to the api , for eg: spaces with + and removing , 
        const address = req.body.address;
        let arr_address = address.split("");
        for(let i = 0; i<arr_address.length; i++){
            if(arr_address[i] === " "){
              arr_address[i]="+";
            }
            else if(arr_address[i] === ","){
              arr_address[i] = "";
            }
          }
        
        let new_address = arr_address.join("");

        const geo_data = await axios.get(`https://geocode.maps.co/search?q=${new_address}&api_key=${process.env.GEOCODING_API_KEYS}`);
        const lat = geo_data.data[0].lat;
        const lon = geo_data.data[0].lon;
        console.log("latitude and longitude", lat +" "+lon)

        const weather_data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEYS}`);

        const temp = weather_data.data.list[1].main.temp;
        const feelsLike = weather_data.data.list[1].main.feels_like;
        const iconID = weather_data.data.list[1].weather[0].icon;
        const weatherDes = weather_data.data.list[1].weather[0].description;
        const humidity = weather_data.data.list[1].main.humidity;
        const pressure = weather_data.data.list[1].main.pressure;
        const name = weather_data.data.city.name;
        const tempMax = weather_data.data.list[1].main.temp_max;
        const tempMin = weather_data.data.list[1].main.temp_min;
        

        // console.log(weatherDes)
        const icon_src = (`https://openweathermap.org/img/wn/${iconID}@2x.png`)

        res.render("main.ejs", {
            c_temp : temp, 
            c_feelsLike : feelsLike, 
            c_icon_src : icon_src, 
            c_weatherDes : weatherDes,
            c_humidity : humidity,
            c_pressure : pressure,
            c_day : day,
            c_hours : hours,
            c_minutes : minutes,
            c_name : name,
            c_tempMax : tempMax,
            c_tempMin : tempMin,
        });

    }
    catch (error){
        console.log("Error :", error);
    }
})

app.listen(`${process.env.port}`, console.log(`Server is running on port ${process.env.port}`));