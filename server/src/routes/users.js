const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyID = require('../middlewares/verifyID');
const uploads = require('../middlewares/uploads');

// ROTAS PÚBLICAS
router
	// GET -> Permite que qualquer pessoa consulte todos os usuários (sem correspondência no front)
	.route('/users')
	.get(usersController.getAllUsers);

router
	// GET -> Permite que qualquer pessoa consulte um usuário específico com seu ID (sem correspondência no front)
	.route('/users/:id')
	.get(verifyID, usersController.getUserID);

// ROTAS PRIVADAS
router
	// GET -> Permite que o usuário logado consulte seus próprios dados (requisição da rota profile)
	// PATCH -> Permite que o usuário logado atualize seus próprios dados (requisição do botão editar na rota profile)
	// DELETE -> Permite que o usuário logado detele sua própria conta (requisição do botão deletar na rota profile)
	.route('/auth/users')
	.get(verifyJWT, usersController.getTheUser)
	.patch(verifyJWT, usersController.updateTheUser)
	.put(verifyJWT, usersController.updateTheUserPassword)
	.delete(verifyJWT, usersController.deleteTheUser);

router
	// PATCH -> Permite que o usuário logado adicione/atualize sua foto de perfil (...)
	.route('/auth/users/upload/:id')
	.patch(verifyJWT, verifyID, uploads.single('profileImage'), usersController.uploadTheUserAvatar);

module.exports = router;
