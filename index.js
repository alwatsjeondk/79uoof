const express = require("express");
const requestIp = require("request-ip");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to get client IP
app.use(requestIp.mw());

app.get("/get-ips", (req, res) => {
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
    
    res.send("<h1>LOCATION NIKAL LUNGA 😙</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
