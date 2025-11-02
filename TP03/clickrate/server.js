import express from "express"
import path from "path"
import url from "url";
import cors from "cors";
import pageRoutes from "./routes/pages.js";
import apiRoutes from "./routes/api.js";

const app = express()
const PORT = 3000
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors()); // habilita CORS para todos los orígenes

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "public")))

// Rutas de pages
app.use("/", pageRoutes)

// endpoints de datos
app.use("/api", apiRoutes)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});