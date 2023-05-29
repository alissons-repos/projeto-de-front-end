const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ Erro: 'Token não informado!' }); // Unauthorized

	const accessToken = authHeader.split(' ')[1]; // Estamos dividindo ao meio, onde há um espaço em branco, e pegando a segunda parte

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		if (error) return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden (proibido)
		req.user = decoded.userData;
		// Estamos agregando um usuário a requisição
		next();
	});
};

module.exports = verifyJWT;
