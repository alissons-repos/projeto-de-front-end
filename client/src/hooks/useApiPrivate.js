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
		// Interceptadores são como ouvintes de eventos, event listeners, de JS vanilla
		const requestIntercept = apiPrivate.interceptors.request.use(
			(config) => {
				// Estamos adicionando um interceptador na instância privada do axios para verificar se há ou não um parâmetro "Authorization"
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
				}
				// console.log(config.headers); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
				// Aqui dentro podemos definir alguma coisa para ser executada antes da requisição ser enviada, no caso estamos definindo uma nova configuração para as requisições da instância apiPrivate
				return config;
			},
			(error) => Promise.reject(error)
			// Não é necessário utilizar as chaves no return já que a instrução possui apenas uma linha
		);

		const responseIntercept = apiPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					// O erro 403, Forbidden, está sendo utilizado para informar que não houve resposta por causa de um token expirado
					// prevRequest?.sent é uma propriedade customizada para verificar se a requisição já foi feita anteriormente
					// A princípio essa propriedade não existe, então !prevRequest?.sent retornará true, executando o código baixo
					// Definindo como true essa propriedade customizada, garantiremos que o refresh será feito apenas uma vez
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					// console.log(prevRequest); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
					// console.log(newAccessToken); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
					return apiPrivate(prevRequest);
					// Estamos retornando a API privada adicionando novas configurações: um Bearer token em Authorization e um novo parâmetro "sent" para indicar se essa requisição já foi feita
				}
				// Outra alternativa para solucionar o erro sem ter que adaptar o código para uma "dupla renderização"
				// if (error?.code === 'ERR_CANCELED') {
				// 	// aborted in useEffect cleanup
				// 	return Promise.resolve({ status: 499 });
				// }
				// A explicação do erro está no link abaixo e está relacionado com ao StrictMode do React que monta e desmonta os componentes 2 vezes
				// https://stackoverflow.com/questions/73140563/axios-throwing-cancelederror-with-abort-controller-in-react
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
