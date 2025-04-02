const express = require("express");
const requestIp = require("request-ip");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to get client IP
app.use(requestIp.mw());

app.get("/form", (req, res) => {
    bar name = req.query.name;
    const clientIp = req.clientIp || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    
    // Get local IPs
    const networkInterfaces = os.networkInterfaces();
    let localIps = [];
    
    Object.keys(networkInterfaces).forEach((iface) => {
        networkInterfaces[iface].forEach((ifaceDetails) => {
            if (!ifaceDetails.internal) {
                localIps.push(ifaceDetails.address);
            }
        });
    });

    console.log(name);
    console.log(`publicIp: ${clientIp}`);
    console.log(`localIps: ${localIps}`);
    console.log("--------------");
    
    res.send(`<h1>${name} TERA LOCATION NIKAL LUNGA 😙</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
