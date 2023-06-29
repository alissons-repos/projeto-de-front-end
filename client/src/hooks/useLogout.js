import useAuth from './useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const useLogout = () => {
	const { setAuth } = useAuth();
	const apiPrivate = useApiPrivate();

	const logout = async () => {
		try {
			// withCredentials, já configurado em apiPrivate, é necessário para que o secure cookie seja retornado na resposta da requisição
			await apiPrivate.get(path.LOGOUT_URL);
			localStorage.clear('persist');
			localStorage.removeItem('refresh');
		} catch (error) {
			console.error(error);
		} finally {
			setAuth({});
		}
	};

	return logout;
};

export default useLogout;
