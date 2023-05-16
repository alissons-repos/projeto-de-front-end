import { useEffect } from 'react';
import { apiPrivate } from '../apis/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

// O hook useApiPrivate retorna uma instância especial/privada do Axios para permitir requisições privadas a API
// Ele anexará interceptadores nas requisições e nas respostas para validar o token na requisições e tratar erros nas respostas por falta de token
// Se houver erro na resposta por falta token o hook useRefreshToken fará a substituição dos tokens
const useApiPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		// Interceptadores são como ouvintes de eventos, event Listeners, de JS vanilla
		const requestIntercept = apiPrivate.interceptors.request.use(
			(config) => {
				// Estamos adicionando um interceptador na instância privada do axios para verificar se há ou não um parâmetro "Authorization"
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				// Aqui dentro podemos definir alguma coisa para ser executada antes da requisição ser enviada, no caso estamos definindo uma nova configuração para as requisições da instância apiPrivate
				return config;
			},
			(error) => Promise.reject(error)
			// Não é necessário utilizar as chaves e o return já que a instrução possui apenas uma linha
		);

		const responseIntercept = apiPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					// O erro 403, Forbidden, está sendo utilizado para informar que não houve resposta por causa de um token expirado
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return apiPrivate(prevRequest);
					// Estamos retornando a API privada adicionando novas configurações: um Bearer token em Authorization e um novo parâmetro "sent" para indicar se essa requisição já foi feita ou não
				}
				return Promise.reject(error);
			}
		);

		// Cleanup function
		return () => {
			apiPrivate.interceptors.request.eject(requestIntercept);
			apiPrivate.interceptors.response.eject(responseIntercept);
			// Estamos retirando os interceptadores, voltando ao estado inicial da instância apiPrivate do axios, após utilizá-los nas requisições que demandavam o parâmetro "Authorization" no header
		};
	}, [auth, refresh]);

	return apiPrivate;
};

export default useApiPrivate;
