require("dotenv").config();
const axios = require("axios");
const https = require("https");
const { dbCreds } = require("./app/config/hana-db.js");

const testLogin = async (port, protocol) => {
    const url = `${protocol}://172.18.30.114:${port}/b1s/v1/`;
    console.log(`\n--- Testing SL Login on Port ${port} (${protocol.toUpperCase()}) ---`);
    console.log("URL:", url);
    console.log("Company:", dbCreds.CompanyDB);
    console.log("User:", dbCreds.UserName);

    const axiosInstance = axios.create({
        baseURL: url,
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        headers: { "Content-Type": "application/json" }
    });

    try {
        const response = await axiosInstance.post('Login', dbCreds);
        console.log("SUCCESS! Status:", response.status);
    } catch (error) {
        console.log("FAILURE!");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.log("Error Message:", error.message);
        }
    }
};

const runTests = async () => {
    await testLogin(50001, "http");
    await testLogin(50000, "https");
};

runTests();
