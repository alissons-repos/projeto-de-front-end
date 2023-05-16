const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	// Se a "origem" que está enviando a request estiver incluída em "allowedOrigins" então definiremos o atributo que CORS requer como true
	if (allowedOrigins.includes(origin)) {
		// CORS precisa de uma propriedade chamada "Access-Control-Allow-Credentials", por isso estamos a definindo como true
		res.header('Access-Control-Allow-Credentials', true);
	}
	next();
};

// Ao utilizarmos Fetch no código front end devemos passar no objeto de configuração do fetch o atributo "credentials" com o valor "includes"
// Ao utilizarmos axios devemos definir o atributo "withCredentials" com o valor true
// Ao fazermos requisições em uma aplicação "que utiliza CORS" também devemos definir o atributo "Access-Control-Allow-Credentials" como true, uma vez que definimos o atributo "credentials ou withCredentials" como "includes" ou true

module.exports = credentials;
