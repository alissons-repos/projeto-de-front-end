const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleLogin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ Erro: 'E-mail e senha são obrigatórios!' }); // Unprocessable Entity

	const foundUser = await User.findOne({ email: email }).select('+password').exec();
	if (!foundUser) return res.status(400).json({ Erro: 'Email ou senha inválidos!' }); // Unprocessable Entity

	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const accessToken = jwt.sign({ userData: { userID: foundUser._id } }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '5m',
		});
		const refreshToken = jwt.sign({ userID: foundUser._id }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '10m',
		});
		// No payload do accessToken estamos guardando um objeto "userData" que conterá seu id

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		// console.log(result); // LIMPAR QUANDO ESTIVER PRONTO

		// O token não deve ser armazenado em cookies ou no localStorage de modo que fique disponível para o JS do browser.
		// O token deve ficar apenas em memória. Porém, deixaremos salvo em um cookie com a propriedade "http only", tornando-o inacessível para JS.

		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 600000 }); // secure: true
		return res.status(200).json({ Mensagem: 'Autenticação realizada com sucesso!', Token: accessToken });
		// Estamos armazenando o refreshToken e entregando o accessToken para o usuário utilizar nas outras requisições.
		// O accessToken expira muito rápido, então precisamos "trocar" o token de verificação. Para isso criamos uma rota refresh que possui um método GET que aciona o refreshController.
	} else {
		return res.status(401).json({ Erro: 'Email ou senha inválidos!' }); // Unprocessable Entity
	}
};

// Autenticação é o processo de verificar se esse usuário é de fato ele mesmo (verificação). Ex.: Login.
// Autorização é o processo de verificar a quais recursos um usuário tem acesso (permissão). Ex.: Controle de acesso com "cargos".
// JWT utiliza o atributo "Authorization" para confirmar autenticações e permitir acesso aos endpoints de uma API.

// Atributos de Autenticação no Header
// WWW-Authenticate: define o método de autenticação que deve ser utilizado para conseguir acesso ao recurso.
// Authorization: contém as credenciais para autenticar um User-Agent com o servidor.
// Proxy-Authenticate: define o método de autenticação que deve ser utilizado para conseguir acesso ao recurso por trás de um servidor Proxy.
// Proxy-Authorization: contém as credenciais para autenticar um User-Agent com o servidor Proxy.

module.exports = { handleLogin };
