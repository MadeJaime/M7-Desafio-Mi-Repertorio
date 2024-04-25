//Servidor. 
const express = require("express");
const app = express();
//Importar const insertar.
const { insertar, consultar, editar, eliminar } = require("./consultas");
app.listen(3000, console.log("Servidor arriba. 👍"))
//Paso 2, usar Json.
app.use(express.json())
//Ruta por defecto.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
//Paso 3, crear ruta Post.
app.post("/cancion", async (req, res) => {
    try {
        //Paso 4.
        const datos = Object.values(req.body)
        //Paso 5.
        const respuesta = await insertar(datos)
        res.json(respuesta)        
    } catch (error) {
        res.status(500).send("Error en ingreso de cancion... 🙀")
    }
});
//Ruta para consultar.
app.get("/canciones", async (req, res) => {
    try {
        const registros = await consultar();
        res.json(registros);
    } catch (error) {
        res.status(500).send("Error al consultar la cancion... 🙀")
    }
});

//Ruta PUT-Editar
app.put("/cancion/:id", async (req, res) => {
    try {
      const id = req.params.id 
      const { titulo, artista, tono } = req.body;
      const respuesta = await editar(id, titulo, artista, tono)

      //Respuesta Json
      res.json(respuesta);
    } catch (error) {
      res.status(500).json("Error cuando edita la cancion...");
    }
  });

  //Eliminar
  //Paso 2
  app.delete("/cancion", async (req, res) => {
    try {
        // Paso 3
        const { id } = req.query
        const respuesta = await eliminar(id)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Error al eliminar cancion:/ ...");    
    }
  })