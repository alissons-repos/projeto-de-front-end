const User = require('../models/User');
const Post = require('../models/Post');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().exec();
		if (!users) return res.status(204).json({ Mensagem: 'Nenhum usuário encontrado!' }); // No Content
		return res.status(200).json(users); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const getUserID = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }).select('-password').exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		return res.status(200).json(user); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const getTheUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		return res.status(200).json(user); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const updateTheUser = async (req, res) => {
	// if (!req?.params?.id) return res.status(400).json({ Erro: 'ID não informado!' }); // Bad Request
	// if (!req.body) return res.status(400).json({ Erro: 'Nenhum dado informado para ser atualizado!' }); // Bad Request
	const { email, firstName, lastName } = req.body;
	if (!email && !firstName && !lastName) {
		return res.status(400).json({ Erro: 'Nenhum dado informado para ser atualizado!' }); // Bad Request
	}
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		if (req.body?.email) {
			const emailExist = await User.findOne({ email: req.body.email }).exec();
			if (emailExist) return res.status(409).json({ Erro: 'O email informado já existe!' }); // Conflict
			user.email = req.body.email;
		}
		if (req.body?.firstName) user.firstName = req.body.firstName;
		if (req.body?.lastName) user.lastName = req.body.lastName;
		// Falta implementar a parte de alterar o próprio avatar ???
		const result = await user.save();
		return res.status(200).json(result); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const deleteTheUser = async (req, res) => {
	// if (!req?.params?.id) return res.status(400).json({ Erro: 'ID não informado!' }); // Bad Request
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		// user.postings.forEach(async (post) => await Post.deleteOne({ _id: post._id }));
		for (let i = 0; i < user.postings.length; i++) {
			await Post.deleteOne({ _id: user.postings[i] });
		}
		const result = await user.deleteOne({ _id: req.user.userID });
		return res.status(200).json(result); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

module.exports = {
	getAllUsers,
	getUserID,
	getTheUser,
	updateTheUser,
	deleteTheUser,
};
