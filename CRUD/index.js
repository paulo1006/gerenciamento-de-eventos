const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect("mongodb+srv://paulo:aCa9hAKK7Q4f4c3C@api.ndkwjk3.mongodb.net/?retryWrites=true&w=majority&appName=API")
    .then(() => {
        console.log("Conectando ao MongoDB");
        const eventRoutes = require("./routes/eventRoutes.js");
        app.use("/event", eventRoutes);

        app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    })
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
