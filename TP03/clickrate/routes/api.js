import express from "express"
import path from "path";
import url from "url";
import fs from "fs";

const api = express.Router()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas que lee los JSON y los envía al cliente
api.get("/skins", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/skins.json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = data.slice(start, end);

  res.json({
    page,
    limit,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginated
  });
});

api.get("/skins/:id", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/skins.json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const id = req.params.id;
  const skin = data.find(s => String(s.id) === String(id));

  if (!skin) {
    return res.status(404).json({ error: "Skin no encontrada" });
  }

  res.json(skin);
});

api.get("/crates", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/crates.json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = data.slice(start, end);

  res.json({
    page,
    limit,
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    data: paginated
  });
});

api.get("/crates/:id", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/crates.json");
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const crateId = req.params.id;

  const crate = data.find(c => c.id === crateId);

  if (!crate) {
    return res.status(404).json({ error: "Crate no encontrado" });
  }

  res.json(crate);
});

api.get("/crates/:id/skins", (req, res) => {
  const crateId = req.params.id;

  const cratesPath = path.join(__dirname, "../data/crates.json");
  const skinsPath = path.join(__dirname, "../data/skins.json");

  const crates = JSON.parse(fs.readFileSync(cratesPath, "utf-8"));
  const skins = JSON.parse(fs.readFileSync(skinsPath, "utf-8"));

  const crate = crates.find(c => c.id === crateId);

  if (!crate) {
    return res.status(404).json({ error: "Crate no encontrada" });
  }

  // Filtrar skins cuyo crateid coincide
  const crateSkins = skins.filter(s => s.crateid === crateId);

  res.json(crateSkins);
});


// Endpoint para solicitar imagen por id
api.get("/skin-img/:id", (req, res) => {
  const { id } = req.params;

  // Definimos la ruta del archivo
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "../public/img/skin", "skin.png");

  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "../public/img/skin", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }
  // Enviar el archivo
  res.sendFile(imagePath);
});

api.get("/crate-img/:id", (req, res) => {
  const { id } = req.params;

  // Definimos la ruta del archivo
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "../public/img/crate", "crate.png");

  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "../public/img/crate", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }
  // Enviar el archivo
  res.sendFile(imagePath);
});

export default api