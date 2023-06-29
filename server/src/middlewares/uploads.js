const multer = require('multer');
const path = require('path');
const DIRECTORY = path.resolve('public');

const storageConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, DIRECTORY);
	},
	filename: (req, file, callback) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		if (file.fieldname === 'profileImage') {
			const userID = req.user.userID;
			callback(null, `${userID}_${fileName}`);
		} else if (file.fieldname === 'postImage') {
			const postID = req.params.id;
			callback(null, `${postID}_${fileName}`);
		}
	},
});

const limitsConfig = { files: 1, fileSize: 2000000, fieldSize: 2000000 }; // 2MB 2000000

const fileFilterConfig = (req, file, callback) => {
	const EXTENSIONS_REGEX = /.(jpg|jpeg|gif)$/;
	const MIMETYPE_REGEX = /^image\/(jpeg|gif)$/;
	if (!EXTENSIONS_REGEX.test(file.originalname)) {
		return callback(new Error('Apenas imagens jpg, jpeg e gif são permitidas!'));
	}
	if (!MIMETYPE_REGEX.test(file.mimetype)) {
		return callback(new Error('Apenas imagens jpg, jpeg e gif são permitidas!'));
	}
	callback(null, true);
};

const uploads = multer({ storage: storageConfig, limits: limitsConfig, fileFilter: fileFilterConfig });

const uploadPostImage = uploads.single('postImage');
const uploadProfileImage = uploads.single('profileImage');

const errorHandlerPostImage = (req, res, next) => {
	uploadPostImage(req, res, (error) => {
		next(error);
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res.status(400).json({ Erro: 'O tamanho máximo da imagem deve ser 2MB!' }); // Bad Request
			} else {
				return res.status(400).json({ Erro: 'Erro ao enviar o arquivo!' }); // Bad Request
			}
		} else if (error) {
			return res.status(400).json({ Erro: 'Apenas imagens jpg, jpeg e gif são permitidas!' }); // Bad Request
		}
	});
};

const errorHandlerProfileImage = (req, res, next) => {
	uploadProfileImage(req, res, (error) => {
		next(error);
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res.status(400).json({ Erro: 'O tamanho máximo da imagem deve ser 2MB!' }); // Bad Request
			} else {
				return res.status(400).json({ Erro: 'Erro ao enviar o arquivo!' }); // Bad Request
			}
		} else if (error) {
			return res.status(400).json({ Erro: 'Apenas imagens jpg, jpeg e gif são permitidas!' }); // Bad Request
		}
	});
};

module.exports = { errorHandlerPostImage, errorHandlerProfileImage };
