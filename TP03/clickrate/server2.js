import express, { json } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT= 3000;
//servir archivos estaticos desde la carpeta frontend
 app.use(express.static(path.join(__dirname, "../clickrate-frontend")));
 
 //ruta principal redirige a index.html de una
 app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, "../clickrate-frontend/index.html"));
 });
 
//API: leer json y mandarlos al cliente
app.get("/skins", (req, res) => {
  const dataPath = path.join(__dirname, "data/skins.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});
app.get("/crates", (req, res) => {
  const dataPath = path.join(__dirname, "data/crates.json");
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

//img de skin por id 
app.get("/images/skin/:id", (req, res) => {
  const { id } = req.params;
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "images/skin", "skin.png"); // default

  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "images/skin", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }

  res.sendFile(imagePath);
});
// Imagen de la caja por id
app.get("/images/crate/:id", (req, res) => {
  const { id } = req.params;
  const possibleExtensions = [".png"];
  let imagePath = path.join(__dirname, "images/crate", "crate.png"); // default

  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, "images/crate", id + ext);
    if (fs.existsSync(fullPath)) {
      imagePath = fullPath;
      break;
    }
  }

  res.sendFile(imagePath);
});

//iniciamos el servidor
 app.listen(PORT, () =>{
    console.log(`servidor corriendo en http://localhost:${PORT}`);
 });

