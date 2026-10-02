const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello! Jenkins CI/CD Pipeline is Working 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).send("Application is healthy");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});