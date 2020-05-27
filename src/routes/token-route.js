'use strict';

const express = require('express');
const router = express.Router();
const authService=require('../services/auth-service');

router.post('/user', authService.verifyGuardUser);
router.post('/doctor', authService.verifyGuardDoctor);

module.exports=router;