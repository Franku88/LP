import express from "express"
import path from "path";
import url from "url";
import fs from "fs";

const api = express.Router()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas que lee los JSON y los envía al cliente
api.get("/skins", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/skins.json")
  const data = fs.readFileSync(jsonPath, "utf-8");
  res.json(JSON.parse(data));
});

api.get("/crates", (req, res) => {
  const jsonPath = path.join(__dirname, "../data/crates.json")
  const data = fs.readFileSync(jsonPath, "utf-8");
  const crates = JSON.parse(data);
  res.json(crates);
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