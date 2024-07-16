# Weatherly

Weatherly is a simple weather app built using html, css, node.js, express and ejs

## Features
weatherly has a suggestive search bar for addresses, which are fetched using the [geocode](https://geocode.maps.co/) API and can be adjust in the view.js file.

## Installation

install node and type the command to install the dependencies.

```
npm i
```

## APIs
I have used two APIs, [geocode](https://geocode.maps.co/) for showing relevant address and converting address to their respective longitudes and latitudes. And [open weather](https://openweathermap.org/api) API for getting the weather data.

## configuring env files
create a .env file and put the API keys in there
```
port = xxxx

GEOCODING_API_KEYS = xxx

OPEN_WEATHER_API_KEYS = xxx
```
## run the application
to start the application just run the command
```
npm start
```
## Contributing

contributions are welcomed here so feel free to make PRs.