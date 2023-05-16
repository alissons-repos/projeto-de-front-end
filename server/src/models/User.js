const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Mongoose Schema
const userSchema = new Schema(
	{
		avatar: {
			type: String,
			required: false,
			trim: true,
			// default: `https://www.gravatar.com/avatar/${emailHash}?s=200`,
			get: (v) => `${root}${v}`,
		},
		email: {
			type: String,
			required: [true, 'O email é obrigatório!'],
			trim: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'A senha é obrigatória!'],
			trim: true,
			select: false,
		},
		firstName: {
			type: String,
			required: [true, 'O nome é obrigatório!'],
			trim: true,
			lowercase: true,
		},
		lastName: {
			type: String,
			required: [true, 'O sobrenome é obrigatório!'],
			trim: true,
			lowercase: true,
		},
		refreshToken: {
			type: String,
			required: false,
			trim: true,
			select: false,
		},
		postings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
			},
		],
	},
	{
		timestamps: true,
	}
);

// DB SQL e NoSQL: no mongoose temos documents ao invés de records e collections ao invés de tables
// O mongoose criará automaticamente uma collection para um novo schema
// Automaticamente será criado um id cujo tipo é "ObjectId" e uma versão desse documento que é um Number
// Exemplo: _id: new ObjectId("6451115d4a7da0e36a9ca9c2"), __v: 0

// Mongoose Model (data model)
module.exports = mongoose.model('User', userSchema);
