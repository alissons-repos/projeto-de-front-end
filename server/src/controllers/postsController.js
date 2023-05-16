const Post = require('../models/Post');
const User = require('../models/User');

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().exec();
		if (!posts) return res.status(204).json({ Mensagem: 'Nenhuma postagem encontrada!' }); // No Content
		return res.status(200).json(posts); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const getPostID = async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id }).exec();
		if (!post) return res.status(404).json({ Erro: 'Postagem não localizada!' }); // Bad Request
		return res.status(200).json(post); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const getAllUserPosts = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		const postings = (await user.populate('postings')).$getPopulatedDocs();
		if (!postings) return res.status(204).json({ Mensagem: 'Nenhuma postagem encontrada!' }); // No Content
		return res.status(200).json(postings); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const createNewUserPost = async (req, res) => {
	const { title, description, category, sex, breeds, amount } = req.body;
	if (!title || !description || !category) {
		return res.status(400).json({ Message: 'Título, descrição e categoria são obrigatórios!' }); // Bad Request
	}
	if (
		String(category).toLowerCase() !== 'adoção' &&
		String(category).toLowerCase() !== 'cruzamento' &&
		String(category).toLowerCase() !== 'evento'
	) {
		return res.status(400).json({ Erro: 'Categoria da postagem inválida!' });
	}
	if (
		sex &&
		String(sex).toLowerCase() !== 'ambos' &&
		String(sex).toLowerCase() !== 'fêmea' &&
		String(sex).toLowerCase() !== 'macho'
	) {
		return res.status(400).json({ Erro: 'Sexo da postagem inválida!' });
	}
	if (amount && isNaN(Math.trunc(amount))) {
		return res.status(400).json({ Erro: 'Quantidade da postagem inválida!' });
	}
	// Falta implementar a parte de adicionar a imagem do post ???
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		const result = await Post.create({
			title,
			description,
			category,
			sex,
			breeds,
			amount: Math.trunc(amount),
			owner: req.user.userID,
		});
		user.postings.push(result);
		user.save();
		return res.status(201).json({ Mensagem: 'Postagem criada com sucesso!' }); // Created
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const updateTheUserPost = async (req, res) => {
	// if (!req?.body) return res.status(400).json({ Erro: 'Nenhum dado informado para ser atualizado!' }); // Bad Request
	const { title, description, category, sex, breeds, amount } = req.body;
	if (!title && !description && !category && !sex && !breeds && !amount) {
		return res.status(400).json({ Erro: 'Nenhum dado informado para ser atualizado!' }); // Bad Request
	}
	if (
		category &&
		String(category).toLowerCase() !== 'adoção' &&
		String(category).toLowerCase() !== 'cruzamento' &&
		String(category).toLowerCase() !== 'evento'
	) {
		return res.status(400).json({ Erro: 'Categoria da postagem inválida!' });
	}
	if (
		sex &&
		String(sex).toLowerCase() !== 'ambos' &&
		String(sex).toLowerCase() !== 'fêmea' &&
		String(sex).toLowerCase() !== 'macho'
	) {
		return res.status(400).json({ Erro: 'Sexo da postagem inválida!' });
	}
	if (amount && isNaN(Math.trunc(amount))) {
		return res.status(400).json({ Erro: 'Quantidade da postagem inválida!' });
	}
	// Falta implementar a parte de alterar a imagem do post ???
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Not Found
		const post = await Post.findOne({ _id: req.params.id }).exec();
		if (!post) return res.status(404).json({ Erro: 'Postagem não localizada!' }); // Not Found
		const includes = user.postings.includes(req.params.id);
		if (!includes) return res.status(404).json({ Erro: 'Postagem não existente!' }); // Bad Request
		if (title) post.title = title;
		if (description) post.description = description;
		if (category) post.category = category;
		if (sex) post.sex = sex;
		if (breeds) post.breeds = breeds;
		if (amount) post.amount = Math.trunc(amount);
		const result = await post.save();
		return res.status(200).json(result); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const deleteTheUserPost = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Not Found
		const post = await Post.findOne({ _id: req.params.id }).exec();
		if (!post) return res.status(404).json({ Erro: 'Postagem não localizada!' }); // Not Found
		const postIndex = user.postings.indexOf(req.params.id);
		if (postIndex === -1) return res.status(404).json({ Erro: 'Postagem não existente!' }); // Not Found
		user.postings.splice(postIndex, 1);
		user.save();
		const result = await post.deleteOne({ _id: req.params.id });
		return res.status(200).json(result); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

module.exports = {
	getAllPosts,
	getPostID,
	getAllUserPosts,
	createNewUserPost,
	updateTheUserPost,
	deleteTheUserPost,
};
