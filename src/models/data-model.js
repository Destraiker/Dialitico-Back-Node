'use strict';

const connection = require('./connection');

module.exports = class Doctor extends connection {
    idDados;
    Usuario_idUsuario;
    Dreneagem_inicial;
    Dreneagem_final;
    Liquido;
    Data_2;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO dados (Usuario_idUsuario, Dreneagem_inicial, Dreneagem_final, Liquido, Data_2) VALUES ?";
        var values = [[[req.idUsuario, req.Dreneagem_inicial, req.Dreneagem_final, 0,req.Data_2]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE dados SET Dreneagem_inicial=?,Dreneagem_final=?,Liquido=?,Data_2=? WHERE idDados=?";
        var values = [req.Dreneagem_inicial, req.Dreneagem_final, req.Liquido,req.Data_2];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async updateLiquido(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE dados SET Liquido=Liquido+? WHERE idDados=?";
        var values = [req.Liquido,req.idDados];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idDados) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM dados WHERE idDados=?";
        var values = [idDados];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findByDate(idUsuario,data) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM dados WHERE Data_2=? AND Usuario_idUsuario=? LIMIT 1";
        var values = [data,idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idDados) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM dados WHERE idDados=?";
        var values = [idDados];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAllByUser(idUsuario) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM dados WHERE Usuario_idUsuario=?";
        var values = [idUsuario];

        return await con.executarQuery(sql, values, conexao);
    }

}