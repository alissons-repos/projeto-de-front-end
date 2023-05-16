const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');
const verifyJWT = require('../middlewares/verifyJWT');

router
	// GET -> Permite que o usuário logado saia da aplicação (requisição do botão sair no componente navigation)
	.route('/logout')
	.get(verifyJWT, logoutController.handleLogout);

module.exports = router;
