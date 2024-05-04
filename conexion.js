let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "puerta",
    database: "rsa"
});

conexion.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log("conexion existosa");
    }
});




const usuarios = "SELECT * FROM usuarios";

conexion.query(usuarios, function (error, lista) {
    if (error) {
        throw error;
    } else {
        console.log(lista);
    }

});

// function consultarPalabrasPorUsuario(idUsuario) {
//     const consulta = `SELECT palabra FROM palabras WHERE usuario_id = ${idUsuario}`;
//     conexion.query(consulta, function (error, resultado) {
//         if (error) {
//             throw error;
//         } else {
//             console.log(`Palabras del usuario ${idUsuario}:`);
//             resultado.forEach(row => {
//                 console.log(row.palabra);
//             });
//         }


//     });
// }

// conexion.query(consultarPalabrasPorUsuario(1));



conexion.end();