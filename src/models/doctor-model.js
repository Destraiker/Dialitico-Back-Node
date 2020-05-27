'use strict';

const connection = require('./connection');

module.exports = class Doctor extends connection {
    idMedico;
    Nome;
    Crm;
    Login;
    Senha;

    async insert(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "INSERT INTO medico (Nome, Crm, Login, Senha) VALUES ?";
        var values = [[[req.Nome, req.Crm, req.Login, req.Senha]]];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async update(req) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "UPDATE medico SET Nome=?,Login=?,Crm=? WHERE idMedico=?";
        var values = [req.Nome,req.Login,req.Crm];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async find(idMedico) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM medico WHERE idMedico=?";
        var values = [idMedico];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async delete(idMedico) {
        var con = new connection();
        const conexao=con.conexao();

        var sql = "DELETE FROM medico WHERE idMedico=?";
        var values = [idMedico];
        
        return await con.executarQuery(sql, values,conexao);
    }
    async findAll() {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT * FROM medico";

        return await con.executarQuery(sql, null, conexao);
    }

    async login(req) {
        const con=new connection();
        const conexao=con.conexao();

        var sql = "SELECT idMedico,Nome,Crm,Senha FROM medico WHERE Login=? AND Senha=? LIMIT 1";
        var values = [req.Login,req.Senha];

        return await con.executarQuery(sql, values, conexao);
    }
}