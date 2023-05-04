const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleRegister = async (req, res) => {
	const { email, pwd } = req.body;
	if (!email || !pwd) return res.status(422).json({ Erro: 'E-mail e senha são obrigatórios!' }); // Unprocessable Entity

	const duplicate = await User.findOne({ email: email }).exec(); // Nem todos os métodos do mongoose precisam do .exec()
	if (duplicate) return res.status(409).json({ Erro: 'O email informado já existe!' }); // Conflict

	try {
		// Precisamos agora encriptar a senha para salvá-la no DB com os demais dados do novo usuário
		const hashedPwd = await bcrypt.hash(pwd, 10);

		// const newUser = { email: email, password: hashedPwd };
		const result = await User.create({ email: email, password: hashedPwd });
		// const result = await User.create(newUser);
		console.log(result);

		return res.status(201).json({ Mensagem: 'Novo usuário registrado com sucesso!' }); // Created
	} catch (error) {
		return res.status(500).json({ Erro: error.message }); // Internal Server Error
	}
};

module.exports = { handleRegister };
