const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyID = require('../middlewares/verifyID');
const { errorHandlerPostImage } = require('../middlewares/uploads');

// ROTAS PÚBLICAS
router
	// GET -> Permite que qualquer pessoa consulte todos os posts
	.route('/posts')
	.get(postsController.getAllPosts);

router
	// GET -> Permite que qualquer pessoa consulte um post específico com seu ID
	.route('/posts/:id')
	.get(verifyID, postsController.getPostID);

// ROTAS PRIVADAS
router
	// GET -> Permite que o usuário logado consulte seus próprios posts
	// POST -> Permite que o usuário logado crie um novo post
	.route('/auth/posts')
	.get(verifyJWT, postsController.getAllUserPosts)
	.post(verifyJWT, postsController.createNewUserPost);

router
	// PATCH -> Permite que o usuário logado atualize um de seus posts
	// DELETE -> Permite que o usuário logado detele um de seus posts
	.route('/auth/posts/:id')
	.patch(verifyJWT, verifyID, postsController.updateTheUserPost)
	.delete(verifyJWT, verifyID, postsController.deleteTheUserPost);

router
	// PATCH -> Permite que o usuário logado adicione/atualize uma foto ao seu post
	.route('/auth/posts/upload/:id')
	.patch(verifyJWT, verifyID, errorHandlerPostImage, postsController.uploadImgTheUserPost);

router
	// PATCH -> Permite que o usuário logado favorite um post
	.route('/auth/posts/like/:id')
	.patch(verifyJWT, verifyID, postsController.likeTheUserPost);

router
	// PATCH -> Permite que o usuário logado desfavorite um post
	.route('/auth/posts/unlike/:id')
	.patch(verifyJWT, verifyID, postsController.unlikeTheUserPost);

module.exports = router;
