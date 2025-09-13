require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/plz", async (req, res) => {
  const { plz } = req.body;
  if (!plz || !/^\d{5}$/.test(plz)) {
    return res.status(400).json({ error: "Ungültige Postleitzahl" });
  }

  try {
    const geoRes = await axios.get(
      `https://nominatim.openstreetmap.org/search?postalcode=${plz}&country=Germany&format=json&limit=1`
    );
    if (!geoRes.data || geoRes.data.length === 0) {
      return res.status(404).json({ error: "PLZ nicht gefunden" });
    }
    const { lat, lon } = geoRes.data[0];

    // Aktuelles Wetter
    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric&lang=de`
    );

    // 3-Stunden-Vorhersage für 5 Tage
    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric&lang=de`
    );

    return res.json({
      current: currentRes.data,
      forecast: forecastRes.data.list, // Array mit 3-Stunden-Schritten für 5 Tage
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Serverfehler", details: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server läuft auf http://localhost:5000");
});
