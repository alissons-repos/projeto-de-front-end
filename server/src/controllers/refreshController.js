const User = require('../model/User');
const jwt = require('jsonwebtoken');

// const usersDB = {
// 	users: require('../model/users.json'),
// 	setUsers: function (data) {
// 		this.users = data;
// 	},
// };

const handleRefreshToken = async (req, res) => {
	// A condição abaixo verifica se existe um cookie salvo como o nome jwt
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
	// console.log(cookies.jwt);
	const refreshToken = cookies.jwt;
	// As condições abaixo procuram pelo usuário no banco de dados que possui o refreshToken
	// const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) return res.sendStatus(403); // Forbidden
	// Devemos agora verificar o jwt armazenado junto com o usuário
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		// decoded recebe o objeto payload decodificado guardado no jwt
		if (err || foundUser.username !== decoded.username) return res.sendStatus(403); // Forbidden
		const roles = Object.values(foundUser.roles);
		const accessToken = jwt.sign(
			{ userInfo: { username: decoded.username, roles: roles } },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '1m',
			}
		);
		res.json({ Token: accessToken });
	});
};

module.exports = { handleRefreshToken };
