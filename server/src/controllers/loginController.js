const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd) return res.status(422).json({ Erro: 'E-mail e senha são obrigatórios!' });

	const foundUser = await User.findOne({ username: user }).exec();
	if (!foundUser) return res.sendStatus(401); // Unauthorized

	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles);
		// É nesse momento em que devemos criar os token JWT para serem utilizados nas outras rotas
		const accessToken = jwt.sign(
			{ userInfo: { username: foundUser.username, roles: roles } },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '1m',
			}
		);
		// No payload do JWT estamos guardando um objeto "userInfo" que conterá seu nome de usuário e seus cargos
		const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '10m',
		});
		// Salvando o refresh token com o usuário logado, não é necessário passar muitas coias no payload do refreshToken

		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		console.log(result);

		// const otherUsers = usersDB.users.filter((person) => person.username !== foundUser.username);
		// const currentUser = { ...foundUser, refreshToken };
		// usersDB.setUsers([...otherUsers, currentUser]);
		// Reescrevendo, salvando, os dados no "banco de dados" simulado
		// await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
		// O token não deve ser armazenado em cookies ou no localStorage de modo que fique disponível para o JS. O token deve ficar apenas na memória.
		// Deixaremos o token salvo em um cookie utilizando a propriedade "http only", tornando-o inacessível para JS.

		res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 600000 }); // secure: true
		// Para testes com o Thunder Client precisamos tirar o atributo "segure" do cookie
		res.json({ Message: `User ${user} is logged in!`, Token: accessToken });
		// Estamos armazenando o refreshToken e entregando o accessToken para o usuário utilizar nas outras requisições.
		// Porém o accessToken expira muito rápido, então precisamos "trocar" o token de verificação. Para isso criamos uma rota refresh que possui um método GET que aciona o refreshTokenController.
	} else {
		res.sendStatus(401); // Unauthorized
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
