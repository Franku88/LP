import express from "express"
import path from "path";
import url from "url";

const pages = express.Router()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

pages.get("/header", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/layout/header.html"))
})

pages.get("/footer", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/layout/footer.html"))
})

pages.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"))
})

pages.get("/skins", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/skins.html"))
})

pages.get("/skin", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/skin.html"))
})

pages.get("/tienda", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/tienda.html"))
})

pages.get("/case", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/case.html"))
})

pages.get("/openCase", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/openCase.html"))
})

pages.get("/inventario", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/inventario.html"))
})

pages.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"))
})

pages.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"))
})

export default pages