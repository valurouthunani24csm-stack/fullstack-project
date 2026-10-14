const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/status", (req, res) => {
    res.json({
        message: "Student Task Management System is running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});