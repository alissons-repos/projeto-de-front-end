const { validate: isUuid } = require('uuid');

const verifyID = async (req, res, next) => {
	if (!req?.params?.id) return res.status(400).json({ Erro: 'ID não informado!' }); // Bad Request
	const index = req.params.id;
	if (!isUuid(index)) return res.status(400).json({ Erro: 'ID inválido!' }); // Bad Request
	next();
};

module.exports = verifyID;
