'use strict';

const doctorModel = require('../models/doctor-model');
const validator = require('../validator/vaalidator');
const authService=require('../services/auth-service');
const md5 = require('md5');
const model = new doctorModel();

exports.post = (req, res, next) => {
    let user = new validator();
    user.isRequired(req.body.Senha, 'Campo Senha é obrigatorio!');
    user.isRequired(req.body.Crm, 'Campo Crm é obrigatorio!');
    user.isRequired(req.body.Nome, 'Campo Nome é obrigatorio!');
    user.isRequired(req.body.Login, 'Campo Login é obrigatorio!');


    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    req.body.Senha = md5(req.body.Senha + global.KEY_SERVE);

    model.insert(req.body).then(function (x) {
        res.status(201).send({
            message: 'Medico cadastrados com suscesso!'
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao cadastrar medico!',
            data: err
        })
    }));
};

exports.get = (req, res, next) => {
    model.findAllforDoctor(req.body.idMedico).then(function (x) {
        res.status(201).send({
            message: 'Usuario encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar medico!',
            data: err
        })
    }));
};

exports.getById = (req, res, next) => {
    model.find(req.body.idMedico).then(function (x) {
        res.status(201).send({
            message: 'medicos encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar medicos!',
            data: err
        })
    }));
};
exports.put = (req, res, next) => {
    model.update(req.body).then(function (x) {
        res.status(201).send({
            message: 'medicos alterado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar medicos!',
            data: err
        })
    }));
};
exports.delete = (req, res, next) => {
    model.delete(req.body.idMedico).then(function (x) {
        res.status(201).send({
            message: 'medico deletado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao deletar medico!',
            data: err
        })
    }));
};

exports.login = async (req, res, next) => {
    let user = new validator();

    user.isRequired(req.body.Senha, 'Campo Senha é obrigatorio!');
    user.isRequired(req.body.Login, 'Campo Login é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    req.body.Senha = md5(req.body.Senha + global.KEY_SERVE);

    model.login(req.body).then(async function (x) {
        if (x[0]===undefined) {
            res.status(400).send({
                message: 'Login ou Senha invalidos.'
            })
        } else {
            const jwt= await authService.generateToken({
                idMedico: x[0].idMedico,
                Nome: x[0].Nome
            });

            res.status(201).send({
                message: 'Medico encontrado com suscesso',
                data: {
                    jwt: jwt,
                    data: {
                        idMedico: x[0].idMedico,
                        Nome: x[0].Nome
                    }
                }
            });
        }
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao encontrar medico!',
            data: err
        })
    }));
};