const bcrypt = require('bcrypt');
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
		for (let i = 0; i < user.postings.length; i++) {
			await Post.deleteOne({ _id: user.postings[i] });
		}
		await user.deleteOne({ _id: req.user.userID });
		return res.status(200).json({ Mensagem: 'Usuário deletado com sucesso!' }); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const updateTheUserPassword = async (req, res) => {
	const { password, newPassword, matchPassword } = req.body;
	if (!password || !newPassword || !matchPassword) {
		return res.status(400).json({ Erro: 'Nenhum dado informado para ser atualizado!' }); // Bad Request
	}
	try {
		const user = await User.findOne({ _id: req.user.userID }).select('+password').exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Bad Request
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ Erro: 'A senha informada não confere com a senha atual!' }); // Bad Request
		if (newPassword !== matchPassword) {
			return res.status(400).json({ Erro: 'A confirmação deve coincidir com o campo nova senha!' }); // Bad Request
		}
		if (match && newPassword === matchPassword) {
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			user.password = hashedPassword;
		}
		await user.save();
		return res.status(200).json({ Mensagem: 'Senha alterada com sucesso!' }); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

const uploadTheUserAvatar = async (req, res) => {
	if (!req.file) return res.status(400).json({ Erro: 'Nenhum arquivo de imagem enviado!' }); // Bad Request
	try {
		const user = await User.findOne({ _id: req.user.userID }).exec();
		if (!user) return res.status(404).json({ Erro: 'Usuário não localizado!' }); // Not Found
		if (req.file.filename) user.avatar = req.file.filename;
		const result = await user.save();
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
	updateTheUserPassword,
	uploadTheUserAvatar,
};
