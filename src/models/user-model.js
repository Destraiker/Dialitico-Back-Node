'use strict';

const connection = require('./connection');

module.exports = class User extends connection {
    idUsuario;
    Nome;
    CPF;
    Medico_idMedico;
    Senha;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO usuario (Nome, CPF, Medico_idMedico, Senha) VALUES ?";
        var values = [[[req.Nome, req.CPF, req.idMedico, req.Senha]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE usuario SET Nome=?,CPF=? WHERE idUsuario=?";
        var values = [req.Nome,req.CPF,req.idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idUsuario) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario WHERE idUsuario=?";
        var values = [idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idUsuario) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM usuario WHERE idUsuario=?";
        var values = [idUsuario];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAllforDoctor(idMedico) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM usuario WHERE Medico_idMedico=?";
        var values = [idMedico];

        return await con.executarQuery(sql, values, conexao);
    }

    async login(req) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT idUsuario,Nome,CPF,Senha FROM usuario WHERE CPF=? AND Senha=? LIMIT 1";
        var values = [req.CPF,req.Senha];

        return await con.executarQuery(sql, values, conexao);
    }
}