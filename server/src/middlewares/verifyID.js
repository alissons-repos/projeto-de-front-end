const { validate: isUuid } = require('uuid');

const verifyID = async (req, res, next) => {
	const index = req.params.id;

	if (!isUuid(index)) return res.status(400).json({ Erro: 'ID inválido!' });

	next();
};

module.exports = verifyID;
