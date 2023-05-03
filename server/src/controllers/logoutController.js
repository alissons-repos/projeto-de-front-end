const User = require('../model/User');
// const fsPromises = require('fs').promises;
// const path = require('path');

// const usersDB = {
// 	users: require('../model/users.json'),
// 	setUsers: function (data) {
// 		this.users = data;
// 	},
// };

const handleLogout = async (req, res) => {
	// No cliente, devemos também deletar o accessToken
	// A condição abaixo verifica se existe um cookie salvo como o nome jwt
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204); // No content (sem conteúdo para ser entregue)
	const refreshToken = cookies.jwt;

	// A condição abaixo procura pelo refreshToken armazenado junto com o usuário
	const foundUser = await User.findOne({ refreshToken }).exec();
	// Apagando o cookie jwt salvo no browser mesmo se não encontrarmos o usuário
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		// O objeto de configuração do médoto clearCookie não precisa dos atributos "maxAge" e "expires", de resto deve ser tudo igual
		return res.sendStatus(204); // No content (sem conteúdo para ser entregue)
	}

	// Apagando o refreshToken do usuário no "banco de dados" simulado
	// const otherUsers = usersDB.users.filter((person) => person.refreshToken !== foundUser.refreshToken);
	// const currentUser = { ...foundUser, refreshToken: '' };
	// usersDB.setUsers([...otherUsers, currentUser]);
	// // Depois de apagar o refreshToken do usuário devemos atualizar o "banco de dados" simulado
	// await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

	// foundUser recebe o documento do banco de dados que estávamos procurando, então podemos fazer as alterações necessárias e salvar
	foundUser.refreshToken = '';
	const result = await foundUser.save();
	console.log(result);

	// Apagando o cookie jwt salvo no browser depois de apagar o refreshToken salvo com o usuário
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	// O objeto de configuração do médoto clearCookie não precisa dos atributos "maxAge" e "expires", de resto deve ser tudo igual
	// O atributo "secure" é necessário para https
	// O atributo "sameSite" com valor "None" é necessário para habilitar o uso entre sites (uso do cookie?)
	res.sendStatus(204); // No content (sem conteúdo para ser entregue)
};

module.exports = { handleLogout };
