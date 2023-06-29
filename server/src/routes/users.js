const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyID = require('../middlewares/verifyID');
const { errorHandlerProfileImage } = require('../middlewares/uploads');

// ROTAS PÚBLICAS
router
	// GET -> Permite que qualquer pessoa consulte todos os usuários
	.route('/users')
	.get(usersController.getAllUsers);

router
	// GET -> Permite que qualquer pessoa consulte um usuário específico com seu ID
	.route('/users/:id')
	.get(verifyID, usersController.getUserID);

// ROTAS PRIVADAS
router
	// GET -> Permite que o usuário logado consulte seus próprios dados
	// PATCH -> Permite que o usuário logado atualize seus próprios dados
	// DELETE -> Permite que o usuário logado detele sua própria conta
	.route('/auth/users')
	.get(verifyJWT, usersController.getTheUser)
	.patch(verifyJWT, usersController.updateTheUser)
	.put(verifyJWT, usersController.updateTheUserPassword)
	.delete(verifyJWT, usersController.deleteTheUser);

router
	// PATCH -> Permite que o usuário logado adicione/atualize sua foto de perfil
	.route('/auth/users/upload')
	.patch(verifyJWT, errorHandlerProfileImage, usersController.uploadTheUserAvatar);

module.exports = router;
