const express = require("express");
const requestIp = require("request-ip");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to get client IP
app.use(requestIp.mw());

app.get("/form", (req, res) => {
   try {
        const clientIp = req.clientIp || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        // Use a public IP if running locally (since localhost IPs won't work)
        const ipToCheck = clientIp === "::1" ? "8.8.8.8" : clientIp;

        // Fetch location data
        const response = await axios.get(`http://ip-api.com/json/${ipToCheck}`);
        const locationData = response.data;

        res.json({
            ip: ipToCheck,
            country: locationData.country,
            region: locationData.regionName, // State/Province
            city: locationData.city,
            latitude: locationData.lat,
            longitude: locationData.lon,
            isp: locationData.isp
        });
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve location data" });
    } 
   });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
