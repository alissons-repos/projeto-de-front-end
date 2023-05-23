const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router
	// POST -> Permite que um usuário cadastrado entre na aplicação (requisição da rota login)
	.route('/login')
	.post(loginController.handleLogin);

module.exports = router;
