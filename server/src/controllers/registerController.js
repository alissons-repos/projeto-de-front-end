const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleRegister = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;
	if (!email || !password || !firstName || !lastName)
		return res.status(400).json({ Erro: 'E-mail, senha, nome e sobrenome são obrigatórios!' }); // Bad Request

	const duplicate = await User.findOne({ email: email }).exec();
	if (duplicate) return res.status(409).json({ Erro: 'O email informado já existe!' }); // Conflict

	try {
		// Precisamos agora encriptar a senha para salvá-la no DB com os demais dados do novo usuário
		const hashedPassword = await bcrypt.hash(password, 10);
		const result = await User.create({
			email: email,
			password: hashedPassword,
			firstName: firstName,
			lastName: lastName,
			avatar: `default_avatar_${Math.floor(Math.random() * 3)}.jpg`,
		});
		// console.log(result); // LIMPAR QUANDO ESTIVER PRONTO
		return res.status(201).json({ Mensagem: 'Novo usuário registrado com sucesso!' }); // Created
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

module.exports = { handleRegister };
