'use strict';

const dataModel = require('../models/data-model');
const validator = require('../validator/vaalidator');
const model = new dataModel();

exports.post = (req, res, next) => {
    let user = new validator();
    user.isRequired(req.body.idUsuario, 'Campo idUsuario é obrigatorio!');
    user.isRequired(req.body.Data_2, 'Campo Data_2 é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }

    model.insert(req.body).then(function (x) {
        res.status(201).send({
            message: 'Dados cadastrados com suscesso!'
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao cadastrar Dados!',
            data: err
        })
    }));
};

exports.get = (req, res, next) => {
    let user = new validator();
    var idUsuario = req.body.idUsuario || req.params.idUsuario;

    user.isRequired(idUsuario, 'Campo idUsuario é obrigatorio!');

    if (!user.isValid()) {
        res.status(400).send(user.errors()).end();
        return;
    }
    model.findAllByUser(idUsuario).then(function (x) {
        res.status(201).send({
            message: 'Dados encontrado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar Dados!',
            data: err
        })
    }));
};

exports.getById = (req, res, next) => {
    model.find(req.params.idDados).then(function (x) {
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
            message: 'Dados alterado com suscesso',
            data: x
        });
    }).catch((err) => setImmediate(() => {
        res.status(400).send({
            message: 'Falha ao listar Dados!',
            data: err
        })
    }));
};
exports.delete = (req, res, next) => {
    model.delete(req.body.idDados).then(function (x) {
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
