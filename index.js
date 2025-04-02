const express = require("express");
const requestIp = require("request-ip");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to get client IP
app.use(requestIp.mw());
app.use(express.static("public"));

app.get("/form", (req, res) => {
   let name = req.query.name;
   let ip = req.query.ip;
   
   console.log("---------");
   console.log(`Name: ${name}`);
   console.log(`Ip: ${ip}`);
   console.log("---------");
   try {
        res.send("HMM");
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve location data" });
    } 
   });
app.get("/done", (req, res) => {
res.send("Ho gya nikal abb jaa");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
fetch("https://api64.ipify.org?format=json")
  .then(response => response.json())
  .then(data => console.log("Your IP:", data.ip))
  .catch(error => console.error("Error fetching IP:", error));

  */
