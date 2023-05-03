const allowedOrigins = ['http://localhost:3500', 'http://127.0.0.1:5500'];
// Lista de domínios permitidos para acessar o backend
// Utilizando um servidor local não possuímos um domínio, então "origin" vem como "undefined", portanto precisamos permitir que nosso localhost tenha acesso a aplicação, apesar de nossa "rota" já estar especificada na

// Cross Origin Resource Sharing (CORS) ou Compartilhamento de recursos entre origens
export default corsOptions = {
	// Configurações que passaremos para o middleware cors
	origin: (origin, callback) => {
		// Se o domínio estiver em "allowedOrigins", permitiremos seu acesso ao backend
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			// The method .indexOf() returns the index of the first occurrence of a value in an array, or -1 if it is not present
			callback(null, true);
			// O primeiro parâmetro da callback é o erro que será definido como null
			// O segundo parâmetro retorna true para o middleware que permitirá a comunicação com o domínio
		} else {
			callback(new Error('Não permitido pelas definições de CORS!'));
		}
	},
	optionsSuccessStatus: 200,
};
