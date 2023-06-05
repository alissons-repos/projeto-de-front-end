// import { apiPrivate } from '../apis/axios';
import useAuth from './useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const useLogout = () => {
	const { setAuth } = useAuth();
	const apiPrivate = useApiPrivate();

	const logout = async () => {
		try {
			// withCredentials, já configurado em apiPrivate, é necessário para que o secure cookie seja retornado na resposta da requisição
			const response = await apiPrivate.get(path.LOGOUT_URL);
			console.log('Resultado logout:', response); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			setAuth({});
		} catch (error) {
			console.error(error);
		}
	};

	return logout;
};

export default useLogout;
