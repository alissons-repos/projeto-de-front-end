import api from '../api/axios';
import useAuth from './useAuth';

// O hook useRefreshToken será utilizado para manter o token de acesso sempre atualizado
// A API entrega a princípio um accessToken que expira em um tempo curto
// Quando esse primeiro token expirar teremos que substituí-lo por um novo token
// Esse refresh token expirará em um tempo maior permitindo que o usuário permaneça conectado com a aplicação
// Essa alteração de tokens não será visível para o usuário
const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		// A função refresh busca dentro da API o Refresh Token através do endpoint "/refresh"
		// A API define um cookie não acessível, não visível por meio de código JS vanilla
		// Essa estratégia permite enviarmos cookies seguros como resposta da requisição
		const response = await api.get('/refresh', {
			withCredentials: true,
		});

		// Após obter o Refresh Token, iremos adicioná-lo ao AuthContext por meio de sua função setAuth
		// Manteremos o estado anterior, porém adicionaremos em accessToken esse novo Refresh Token
		// Tanto access como refresh são tokens, a diferença entre eles é seu propósito e eles serão armazenados no contexto
		setAuth((prev) => {
			console.log(JSON.stringify(prev));
			console.log(response.data.accessToken);
			return { ...prev, roles: response.data.roles, accessToken: response.data.accessToken };
			// Override the previus access token with the new access/refresh token
		});
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
