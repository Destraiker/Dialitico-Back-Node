'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.KEY_SERVE, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.KEY_SERVE);
    return data;
}

exports.authorizeUser = function (req, res, next) {
    var token = req.body.tokenUser || req.query.tokenUser || req.headers['x-access-token-user'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.KEY_SERVE, function (error, decoded) {
            if (error || decoded.idUsuario===undefined) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                req.body.idUsuario=decoded.idUsuario;
                next();
            }
        });
    }
};

exports.authorizeDoctor = function (req, res, next) {
    var token = req.body.tokenDoctor || req.query.tokenDoctor || req.headers['x-access-token-doctor'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.KEY_SERVE, function (error, decoded) {
            if (error || decoded.idMedico===undefined) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                req.body.idMedico=decoded.idMedico;
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.KEY_SERVE, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};

exports.verifyGuardUser = function (req, res, next) {
    var token = req.body.tokenUser || req.query.tokenUser || req.headers['x-access-token-user'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.KEY_SERVE, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                res.status(201).json({
                    message: 'Token Valido'
                });
            }
        });
    }
};

exports.verifyGuardDoctor = function (req, res, next) {
    var token = req.body.tokenDoctor || req.query.tokenDoctor || req.headers['x-access-token-doctor'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.KEY_SERVE, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                res.status(201).json({
                    message: 'Token Valido'
                });
            }
        });
    }
};