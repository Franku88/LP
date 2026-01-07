import fs from "fs/promises";

//Realiza carga asincrónica de los datos de un JSON, retorna un objeto
export async function loadJson(jsonPath) {
    try {
        const content = await fs.readFile(jsonPath, "utf-8");
        return JSON.parse(content);
    } catch (err) {
        console.error("Error leyendo JSON:", err);
        throw err;
    }
}

//Realiza la modificación asincrónica de los datos de un JSON
export async function saveJson(jsonPath, data) {
    try {
        await fs.writeFile(
            jsonPath,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
    } catch (err) {
        console.error("Error escribiendo JSON:", err);
        throw err;
    }
}