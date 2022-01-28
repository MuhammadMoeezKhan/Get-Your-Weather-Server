const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.get("/",function(req,res){
    res.sendFile(__dirname + "/Images/sunIcon.png");
    });


app.get("/index.css",function(req,res){
    res.sendFile(__dirname + "/index.css");
    });

app.post("/",function(req,res){
const city = req.body.cityname.slice(0,1).toUpperCase() + req.body.cityname.slice(1,req.body.cityname.length).toLowerCase();
const apiKey = "8e2b38afb412d30976574e6953a739f9";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconImage = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<head><meta charset='UTF-8'></head>");
            res.write("<h1>The Current Temperature in "+city+" is "+temp+" degress Celcius.</h1>");
            res.write("<h3> The weather displays some " + description + "</h4>");
            res.write("<img src=" +  iconImage + ">");
            res.write("<h6>Refresh page to see the weather of a different city!</h6>");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server Is Running");
});