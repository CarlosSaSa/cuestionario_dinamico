const conexionDB = (conexion) => new Promise( (resolve, reject) => {
    conexion.connect( (err) => {
        if (err) return reject('Ha ocurrido un error mientras se conectaba a la base de datos: ' + err);
        return resolve('Conexión establecida correctamente a la base de datos');
    })
});

exports.conexionDB = conexionDB;