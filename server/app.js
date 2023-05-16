require('dotenv').config();

// Importando dependências
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Importando configurações, middlewares e rotas
const corsOptions = require('./src/config/corsOptions');
const connectDB = require('./src/config/dbConnection');
const credentials = require('./src/middlewares/credentials');
const refreshRoute = require('./src/routes/refresh');
const userRoute = require('./src/routes/users');
const postRoute = require('./src/routes/posts');
const registerRoute = require('./src/routes/register');
const loginRoute = require('./src/routes/login');
const logoutRoute = require('./src/routes/logout');

// Instanciando a aplicação e definido sua porta
const app = express();
const PORT = process.env.PORT || 3500;

// Conectando App ao MongoDB
connectDB();

// Utilizando middlewares
app.use(express.json());
app.use(cookieParser());
app.use(credentials); // credentials é necessário para permitir o correto funcionamento de CORS e deve ser chamado antes de sua utilização
app.use(cors(corsOptions));

// Utilizando rotas
app.use(refreshRoute);
app.use(userRoute);
app.use(postRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(logoutRoute);

// Inicializando a aplicação
mongoose.connection.once('open', () => {
	console.log('MongoDB conectado com sucesso');
	app.listen(PORT, () => console.log(`App rodando em http://localhost:${PORT}`));
});
