import express, { json } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors()); // habilita CORS para todos los orígenes

// Rutas que lee los JSON y los envía al cliente
app.get("/skins", (req, res) => {
  const data = fs.readFileSync("data/skins.json", "utf-8");
  res.json(JSON.parse(data));
});

app.get("/crates", (req, res) => {
  const data = fs.readFileSync("data/crates.json", "utf-8");
  const crates = JSON.parse(data);
  res.json(crates);
});

// Endpoint para solicitar imagen por id
app.get("/images/skin/:id", (req, res) => {
  const { id } = req.params;
  
  // Definimos la ruta del archivo
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "images/skin", "skin.png");
  
  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "images/skin", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }

  // Enviar el archivo
  res.sendFile(imagePath);
});

app.get("/images/crate/:id", (req, res) => {
  const { id } = req.params;
  
  // Definimos la ruta del archivo
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "images/crate", "crate.png");
  
  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "images/crate", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }

  // Enviar el archivo
  res.sendFile(imagePath);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});