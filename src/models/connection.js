'use strict';

const mysql = require('mysql');
const config= require('../config');

module.exports=class Conexao{
    conexao(){
        return mysql.createConnection(config.BDConetionArray);
    }
    executarQuery(sql, values, con) {
        return new Promise(function (resolve, reject) {
            console.log("Teste");
            con.connect(function (err) {
                console.log("Teste56");
                if (err) {
                    console.log("Teste2");
                    reject(err);

                }
                console.log("Connected!");
                con.query(sql, values, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    console.log("Resultado: ");
                    resolve(result);
                    con.end();
                });
            })
        });
    }
}

