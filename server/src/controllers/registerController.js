const User = require('../model/User');
const bcrypt = require('bcrypt');
// const fsPromises = require('fs').promises;
// const path = require('path');

// const usersDB = {
// 	users: require('../model/users.json'),
// 	setUsers: function (data) {
// 		this.users = data;
// 	},
// };
// O objeto "usersDB" está sendo utilizado para simular um BD. Ele possui uma propriedade que armazena os dados propriamente ditos e uma função setter para definir esses dados. Estamos utilizando módulos built-in do Node.js para reescrever o arquivo users.json na pasta model para manter o "banco de dados" sempre atualizado.
// Alguns BDs possuem métodos nativos que salvam ou deletam dados (MongoDB com seu Driver Nativo ou com Mongoose)

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	// A condição abaixo verifica se as informações foram passadas no corpo da requisição
	if (!user || !pwd) return res.status(400).json({ Message: 'Username and Password are required!' });
	// A condição abaixo verifica se o usuário já existe
	// const duplicate = usersDB.users.find((person) => person.username === user);
	const duplicate = await User.findOne({ username: user }).exec();
	// Nem todos os métodos do mongoose precisam do .exec() ao final, porém o findOne em particular precisa
	if (duplicate) return res.sendStatus(409);
	// O status de resposta 409 Conflict indica que a solicitação atual conflitou com o recurso que está no servidor.
	try {
		// Precisamos agora encriptar a senha e salvar o novo usuário
		const hashedPwd = await bcrypt.hash(pwd, 10);

		// const newUser = { username: user, password: hashedPwd, roles: { user: 2001 } };
		// usersDB.setUsers([...usersDB.users, newUser]);
		// await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
		// console.log(usersDB.users);

		// Com o MongoDB podemos criar e salvar no DB de uma vez só com o método .create()
		const result = await User.create({ username: user, password: hashedPwd }); // Não precisamos passar a role de user, pois já está como default
		console.log(result);
		// Outras formas de criar e salvar um documento no MongoDB
		// const newUser = new User(); newUser.username = user; newUser.password = hashedPwd; const result2 = await newUser.save()
		// const newUser = new User({ username: user, password: hashedPwd }); const result2 = await newUser.save();

		res.status(201).json({ Message: `New user ${user} created!` });
	} catch (err) {
		res.status(500).json({ Message: err.message });
	}
};

module.exports = { handleNewUser };
