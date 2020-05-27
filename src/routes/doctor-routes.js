'use strict';

const express = require('express');
const router = express.Router();
const controler=require('../controler/doctor-controler');
const authService=require('../services/auth-service');

//Free
router.post('/', controler.post);
router.post('/login', controler.login);
//Doctor
router.get('/',authService.authorizeDoctor, controler.getById);
router.put('/',authService.authorizeDoctor, controler.put);
router.delete('/',authService.authorizeDoctor, controler.delete);

module.exports=router;