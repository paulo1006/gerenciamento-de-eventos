const mongoose = require("mongoose");

// Definindo o modelo Event
const EventSchema = new mongoose.Schema({
    NomeEvento: { type: String, required: true },
    Data: { type: String, required: true }, // Considere usar Date se necessário
    Horario: { type: String, required: true },
    NomeOrg: { type: String, required: true },
    Descricao: { type: String, required: true },
    Progamacao: { type: String, required: true },
    Local: { type: String, required: true }
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
