const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefresh = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).json({ Erro: 'Token não informado!' }); // Unauthorized
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
	if (!foundUser) return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
		// decoded recebe o objeto payload decodificado guardado no jwt
		if (error || foundUser._id.toString() !== decoded.userID)
			return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden
		const accessToken = jwt.sign({ userData: { userID: decoded.userID } }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15s',
		});
		return res.status(200).json({ Mensagem: 'Refresh realizado com sucesso!', Token: accessToken });
	});
};

module.exports = { handleRefresh };
