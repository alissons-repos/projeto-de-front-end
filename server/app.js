require('dotenv').config();

// Importando dependências
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import corsOptions from './src/config/corsOptions';
import connectDB from './src/config/dbConnection';

// Instanciando a aplicação e definido sua porta
const app = express();
const PORT = process.env.PORT || 3500;

// Conectando App ao MongoDB
connectDB();

// Middlewares necessários para a execução da aplicação
app.use(express.json());
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

// Declarando as rotas da aplicação
const rotaInicio = require('./content/routes/inicio.router');
const rotaUsuario = require('./content/routes/usuarios.router');

// Utilizando rotas como middlewares
app.use(rotaInicio);
app.use(rotaUsuario);

// Inicializando a aplicação
mongoose.connection.once('open', () => {
	console.log('MongoDB conectado com sucesso');
	app.listen(PORT, () => console.log(`App rodando em http://localhost:${PORT}`));
});
