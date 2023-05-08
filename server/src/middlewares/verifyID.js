const mongoose = require('mongoose');

const verifyID = async (req, res, next) => {
	if (!req?.params?.id) return res.status(400).json({ Erro: 'ID não informado!' }); // Bad Request
	const validID = mongoose.Types.ObjectId.isValid(req.params.id);
	// const id = req.params.id;
	// const result = id.match(/^[0-9a-fA-F]{24}$/);
	if (!validID) return res.status(400).json({ Erro: 'ID inválido!' }); // Bad Request
	next();
};

module.exports = verifyID;
