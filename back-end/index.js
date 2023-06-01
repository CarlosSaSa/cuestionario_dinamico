const express = require('express');
const { PORT } = require('./config/config');
const { connection } = require('./config/db');
const { conexionDB } = require('./utils/connectiondb');
const { query } = require('./utils/query');

// Inicializacion
const app = express();

// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use( express.json() );

// rutas
app.get('/cuestionario/:id', async (req, res) => {

    // Obtenemos el id del body
    const { id } = req.params;
   
    // Si es undefined 
    if(!id) return res.status(400).json({ estado: false, mensaje: "Inserte el ID" });

    // El id tiene que ser un numero
    if (Number.isNaN(parseInt(id))) {
        return res
          .status(400)
          .json({ estado: false, mensaje: "Verifique bien el ID" });
    }

    const idDB = parseInt(id);

    // Hacemos una consulta a la base de datos
    const sql = 'SELECT idPregunta, tema, activo, nombre, tipo, opciones FROM cuestionario cu JOIN pregunta pr ON cu.idCuestionario = pr.idCuestionario WHERE cu.idCuestionario = ?';
    const resultDB = await query(sql, connection, [idDB]);
    let resultados = [];

    if ( resultDB.length > 0 ) {
        let meta = {};
        let opcionesDB = [];
        resultDB.forEach( ({ idPregunta, tema, activo, nombre, tipo, opciones }) => {
            meta = { tema, activo }
            opcionesDB.push( { idPregunta, nombre, tipo, opciones: JSON.parse( opciones ).map( data => { delete data.isCorrect; return data } ) } );
        });
        resultados = [{ ...meta, preguntas: opcionesDB }];
    }

    return res.status(200).json({ estado: true, mensaje: 'Ok', resultado: resultados });

});


// Conexion a la base de datos
conexionDB( connection )
.then( conexion => {
    // Si todo ha salido bien entonces  iniciamos el servidor
    app.listen(PORT, () => {
        console.log(conexion);
        console.log('Servidor iniciado en el puerto: ', PORT);
    });
})
.catch( (err) => { throw Error(err) } );