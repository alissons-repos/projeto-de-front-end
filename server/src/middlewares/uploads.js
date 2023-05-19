const multer = require('multer');
const path = require('path');

const DIRECTORY = path.resolve('public');

const storageConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, DIRECTORY);
	},
	filename: (req, file, callback) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		const timeStamp = new Date().getTime();
		callback(null, `${timeStamp}_${fileName}`);
	},
});

const uploads = multer({ storage: storageConfig });

module.exports = uploads;
