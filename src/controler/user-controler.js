'use strict';

const userModel = require('../models/user-model');
const validator = require('../validator/vaalidator');
const authService=require('../services/auth-service');
const md5 = require('md5');
const model = new userModel();

exports.post = (req, res, next) => {
    let user = new validator();
    user.isRequired(req.body.Senha, 'Campo Senha é obrigatorio!');
    user.isRequired(req.body.CPF, 'Campo CPF é obrigatorio!');
    user.isRequired(req.body.Nome, 'Campo Nome é obrigatorio!');
    user.isRequired(req.body.idMedico, 'Campo idMedico é obrigatorio!');


    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    req.body.Senha = md5(req.body.Senha + global.KEY_SERVE);

    model.insert(req.body).then(function (x) {
        res.status(201).send({
            message: 'Usuario cadastrados com suscesso!'
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao cadastrar usuario!',
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
            message: 'Falha ao listar usuarios!',
            data: err
        })
    }));
};
exports.getByIdforDoctor = (req, res, next) => {
    model.find(req.params.idUsuario).then(function (x) {
        res.status(201).send({
            message: 'Usuario encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar usuarios!',
            data: err
        })
    }));
};
exports.getById = (req, res, next) => {
    model.find(req.body.idUsuario).then(function (x) {
        res.status(201).send({
            message: 'Usuario encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar usuarios!',
            data: err
        })
    }));
};
exports.put = (req, res, next) => {
    model.update(req.body).then(function (x) {
        res.status(201).send({
            message: 'Usuario alterado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar usuarios!',
            data: err
        })
    }));
};
exports.delete = (req, res, next) => {
    model.delete(req.body.idUsuario).then(function (x) {
        res.status(201).send({
            message: 'Usuario deletado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao deletar usuarios!',
            data: err
        })
    }));
};

exports.login = async (req, res, next) => {
    let user = new validator();

    user.isRequired(req.body.Senha, 'Campo Senha é obrigatorio!');
    user.isRequired(req.body.CPF, 'Campo CPF é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    req.body.Senha = md5(req.body.Senha + global.KEY_SERVE);

    model.login(req.body).then(async function (x) {
        if (x[0]===undefined) {
            res.status(400).send({
                message: 'CPF ou Senha invalidos.'
            })
        } else {
            const jwt= await authService.generateToken({
                idUsuario: x[0].idUsuario,
                Nome: x[0].Nome
            });

            res.status(201).send({
                message: 'Usuario encontrado com suscesso',
                data: {
                    jwt: jwt,
                    data: {
                        idUsuario: x[0].idUsuario,
                        Nome: x[0].Nome
                    }
                }
            });
        }
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao encontrar usuarios!',
            data: err
        })
    }));
};