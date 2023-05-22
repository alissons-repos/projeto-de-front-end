const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleRefresh = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.status(401).json({ Erro: 'Token não informado!' }); // Unauthorized
	// console.log(cookies.jwt);

	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
		// decoded recebe o objeto payload decodificado guardado no jwt
		if (error || foundUser._id !== decoded.userID) return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden
		const accessToken = jwt.sign({ userData: { userID: decoded.id } }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '30s',
			// 1m
		});
		res.status(200).json({ Token: accessToken });
	});
};

module.exports = { handleRefresh };
