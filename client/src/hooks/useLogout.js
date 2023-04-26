import api from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
	const { setAuth } = useAuth();

	const logout = async () => {
		setAuth({});
		try {
			const response = await api('/logout', {
				withCredentials: true,
				// é necessário para que possamos retornar o secure cookie como resposta dessa requisição
				// o parâmetro withCredentials indica se as requisições de controle de acesso entre sites devem ou não ser feitas utilizando credenciais
			});
		} catch (err) {
			console.error(err);
		}
	};

	return logout;
};

export default useLogout;
