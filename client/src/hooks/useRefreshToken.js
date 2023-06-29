import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';
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
		const response = await apiPrivate.get(path.REFRESH_URL);
		// console.log('Resposta do Refresh:', response?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO

		// Após obter o um novo accessToken, por meio da requisição GET em /refresh, iremos adicioná-lo ao AuthContext por meio de sua função setAuth
		// Manteremos o estado anterior, porém substituiremos o antigo accessToken pelo novo
		// Tanto access como refresh são tokens, a diferença entre eles está em seu propósito
		setAuth((previous) => {
			// previous recebe o estado atual/anterior do contexto
			// console.log('Estado Anterior:', previous); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			// console.log('Novo accessToken:', response.data.Token); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			return { ...previous, accessToken: response.data.Token };
			// Estamos sobrescrevendo o estado antigo trocando o valor de accessToken
		});
		return response.data.Token;
	};
	return refresh;
};

export default useRefreshToken;
