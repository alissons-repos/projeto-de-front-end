const express = require('express');
const router = express.Router();
const recoverController = require('../controllers/recoverController');

router
	// POST -> Permite alterar a senha de um usuário (requisição da rota recover)
	.route('/recover')
	.patch(recoverController.handleRecover);

module.exports = router;
