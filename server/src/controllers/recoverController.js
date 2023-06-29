const bcrypt = require('bcrypt');
const User = require('../models/User');

const handleRecover = async (req, res) => {
	const { email, userId, newPassword } = req.body;
	if (!email || !userId || !newPassword)
		return res.status(400).json({ Erro: 'Dados obrigatórios não foram informados!' }); // Bad Request

	try {
		const user = await User.findOne({ email: email }).exec();
		if (!user) return res.status(400).json({ Erro: 'E-mail ou ID inválido!' }); // Bad Request
		if (req.body.userId !== user._id.toString()) return res.status(400).json({ Erro: 'E-mail ou ID inválido!' }); // Bad Request
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		await user.save();
		return res.status(200).json({ Mensagem: 'Senha alterada com sucesso!' }); // OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ Erro: 'Erro interno na aplicação!' }); // Internal Server Error
	}
};

module.exports = { handleRecover };
