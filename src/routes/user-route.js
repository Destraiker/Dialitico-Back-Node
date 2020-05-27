'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/user-controler');
const authService=require('../services/auth-service');

//Doctor
router.get('/doctor',authService.authorizeDoctor, controler.get);
router.get('/doctor/:idUsuario',authService.authorizeDoctor, controler.getByIdforDoctor);
router.post('/', authService.authorizeDoctor,controler.post);
router.put('/',authService.authorizeDoctor, controler.put);
router.delete('/',authService.authorizeDoctor, controler.delete);

//User
router.get('/',authService.authorizeUser, controler.getById);

//Free
router.post('/login', controler.login);

module.exports=router;