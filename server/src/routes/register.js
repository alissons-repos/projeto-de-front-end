const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router
	// POST -> Permite cadastrar um novo usuário na aplicação (requisição da rota register)
	.route('/register')
	.post(registerController.handleRegister);

module.exports = router;
