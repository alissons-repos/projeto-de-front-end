const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyID = require('../middlewares/verifyID');
const uploads = require('../middlewares/uploads');

// ROTAS PÚBLICAS
router
	// GET -> Permite que qualquer pessoa consulte todos os posts (requisição da rota feed)
	.route('/posts')
	.get(postsController.getAllPosts);

router
	// GET -> Permite que qualquer pessoa consulte um post específico com seu ID (requisição do modal na rota feed)
	.route('/posts/:id')
	.get(verifyID, postsController.getPostID);

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

router
	// PATCH -> Permite que o usuário logado adicione/atualize uma foto ao seu post (...)
	.route('/auth/posts/upload/:id')
	.patch(verifyJWT, verifyID, uploads.single('file'), postsController.uploadImgTheUserPost);

router
	// PATCH -> Permite que o usuário logado favorite um post (...)
	.route('/auth/posts/like/:id')
	.patch(verifyJWT, verifyID, postsController.likeTheUserPost);

router
	// PATCH -> Permite que o usuário logado desfavorite um post (...)
	.route('/auth/posts/unlike/:id')
	.patch(verifyJWT, verifyID, postsController.unlikeTheUserPost);

module.exports = router;
