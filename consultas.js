//conexión con base de datos.
const { Pool } = require("pg");
const pool = new Pool ({
user: "postgres",
host: "localhost",
database: "repertorio",
password: "110580",
port: 5432,
});
//Funcion para verificar la conexion a la base de datos
const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}
//Llamar a la funcion de conectarDB
conectarDB();
//insertar
const insertar = async (datos) => {
    const consulta = {
      text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
      values: datos,
    };
    const result = await pool.query(consulta);
    return result;
  };
//Consultar.
//Paso 1.
const consultar = async () => {
//Paso 2.
const result = await pool.query("SELECT * FROM canciones");
return result.rows;
};

//Editar
//Paso 1
const editar = async (id, titulo, artista, tono) => {
//Paso 2
const consulta = {
    text: "UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *",
    values: [id, titulo, artista, tono,],
  };
  const result = await pool.query(consulta);
  return result;
};

//Eliminar
// Paso 1
const eliminar = async (id) => {
    //Paso 2
    const result = await pool.query(
        `DELETE FROM canciones WHERE id = '${id}'`
    );
    return result;
}
    //Exportar
module.exports = { insertar, consultar, editar, eliminar };