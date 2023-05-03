const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ Erro: 'Token não informado!' });

	const token = authHeader.split(' ')[1]; // Estamos dividindo ao meio, onde há um espaço em branco, e pegando a segunda parte

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
		if (error) return res.status(403).json({ Erro: 'Token inválido!' }); // Forbidden (proibido)
		req.user = decoded.userData.username;
		// Estamos agregando um nome de usuário a requisição, assim teremos acesso fácil a esse dado
	});

	next();
};

module.exports = verifyJWT;
