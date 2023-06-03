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
	// mimetype: () => {},
	// size: () => {},
});

const limitsConfig = {
	files: 1,
	fileSize: 5000000, // 5MB
	fieldSize: 5000000, // 5MB
};

const fileFilterConfig = (req, file, callback) => {
	const EXTENSIONS_REGEX = /.(jpg|jpeg)$/;
	const MIMETYPE_REGEX = /^image.(jpg|jpeg)$/;
	// /.(jpg|png|jpeg)$/
	// /^image\/(png|p?jpeg|gif)$/
	if (!EXTENSIONS_REGEX.test(file.originalname)) {
		return callback(new Error('Apenas imagens .jpg e .jpeg são permitidas!'));
	}
	if (!MIMETYPE_REGEX.test(file.mimetype)) {
		return callback(new Error('Apenas imagens .jpg e .jpeg são permitidas!'));
	}
	callback(null, true);
};

const uploads = multer({ storage: storageConfig, limits: limitsConfig, fileFilter: fileFilterConfig });

module.exports = uploads;
