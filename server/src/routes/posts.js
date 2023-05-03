const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyID = require('../middlewares/verifyID');

// ROTAS PÚBLICAS
router
	// GET -> Permite que qualquer pessoa consulte todos os posts (requisição da rota feed)
	.route('/posts')
	.get(postsController.getAllPosts);

router
	// GET -> Permite que qualquer pessoa consulte um post específico com seu ID (requisição do modal na rota feed)
	.route('/posts/:id')
	.get(verifyID, postsController.getThePostID);

// ROTAS PRIVADAS
router
	// GET -> Permite que o usuário logado consulte seus próprios posts (requisição da rota postings)
	// POST -> Permite que o usuário logado crie um novo post (requisição do botão criar na rota postings)
	.route('/auth/posts')
	.get(verifyJWT, postsController.getAllUserPosts)
	.post(verifyJWT, postsController.createNewUserPost);

router
	// PATCH -> Permite que o usuário logado atualize um de seus posts (requisição do botão editar)
	// DELETE -> Permite que o usuário logado detele um de seus posts (requisição do botão deletar)
	.route('/auth/posts/:id')
	.patch(verifyJWT, verifyID, postsController.updateTheUserPost)
	.delete(verifyJWT, verifyID, postsController.deleteTheUserPost);

module.exports = router;
