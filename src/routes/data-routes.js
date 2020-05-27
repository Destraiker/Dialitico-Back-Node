'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/data-controler');
const authService=require('../services/auth-service');

//Doctor
router.get('/doctor/:idUsuario',authService.authorizeDoctor, controler.get);
router.get('/doctor/:dados',authService.authorizeDoctor, controler.getById);

//User
router.post('/',authService.authorizeUser, controler.post);
router.put('/',authService.authorizeUser, controler.put);
router.delete('/',authService.authorizeUser, controler.delete);
router.get('/',authService.authorizeUser, controler.get);
router.get('/:dados',authService.authorizeUser, controler.getById);

module.exports=router;