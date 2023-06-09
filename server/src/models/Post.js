const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const DIRECTORY = path.resolve('public');

// Mongoose Schema
const postSchema = new Schema(
	{
		image: {
			type: String,
			required: false,
			trim: true,
			default: `default_image_0`,
			// get: (fileName) => `'${DIRECTORY}/${fileName}`,
		},
		owner: {
			type: mongoose.Schema.Types.String,
			ref: 'User',
			required: true,
			immutable: true,
		},
		title: {
			type: String,
			required: [true, 'O título do anúncio é obrigatório!'],
			trim: true,
			lowercase: true,
		},
		description: {
			type: String,
			required: [true, 'O título do anúncio é obrigatório!'],
			trim: true,
			lowercase: true,
		},
		category: {
			type: String,
			required: [true, 'A categoria do post é obrigatória!'],
			trim: true,
			lowercase: true,
			enum: {
				values: ['adoção', 'cruzamento', 'evento'],
				message: 'O tipo do anúncio deve ser: adoção, cruzamento ou evento!',
			},
		},
		sex: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			default: 'ambos',
			enum: {
				values: ['ambos', 'fêmea', 'macho'],
				message: 'O sexo deve ser: fêmea, macho ou ambos (em caso de adoção)!',
			},
		},
		breeds: {
			type: [
				{
					type: String,
					trim: true,
					lowercase: true,
				},
			],
			required: false,
			default: [],
		},
		amount: {
			type: Number,
			required: false,
			min: 0,
			default: 0,
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Post', postSchema);
