const queryPromise = (consulta, conexion, valores ) => {
    return new Promise( (resolve, reject) => {
        if ( !valores ) {
            conexion.query(consulta, (error, results) => {
                if(error) throw new Error('Ha ocurrido un error mientras se realizaba la consulta' + error );
                return resolve( results )
            })
        } else {
            conexion.query(consulta, valores ,(error, results) => {
                if(error) throw new Error('Ha ocurrido un error mientras se realizaba la consulta' + error );
                return resolve( results )
            })
        }
    })
}

exports.query = queryPromise;