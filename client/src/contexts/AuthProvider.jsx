import { createContext, useState } from 'react';

const AuthContext = createContext({});
// Estamos criando um contexto chamado de AuthContext que iniciará sendo um objeto vazio
// Poderíamos criar diferentes contextos e transmitilos a partir de um único "provider", porém é melhor deixar em arquivos separados para manter a organização

export const AuthProvider = ({ children }) => {
	// AuthProvider será um "provedor" do contexto AuthContext, basicamente uma ferramenta para transmitir o contexto para seus componentes filhos
	// AuthProvider = AuthContext.Provider
	const [auth, setAuth] = useState({});
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
	// O localStorage não está sendo utilizado para armazenar token JWT, apenas um boolean que indica se o dispositivo é ou não confiável
	// Armazenar tokens no localStorage ou Cookie do browser não é um boa prática, pois compromete a segurança da aplicação

	const handleError = (error) => {
		if (!error) {
			return null;
		} else if (!error?.response) {
			setErrorMsg('Sem resposta do servidor!');
		} else if (error.response?.status === 400) {
			setErrorMsg(`${error.response?.data?.Erro}`);
		} else if (error.response?.status === 404) {
			setErrorMsg(`${error.response?.data?.Erro}`);
		} else if (error.response?.status === 409) {
			setErrorMsg(`${error.response?.data?.Erro}`);
		} else {
			setErrorMsg('Algo deu errado!');
		}
		setTimeout(() => {
			setErrorMsg('');
		}, 3000);
	};

	const handleSuccess = (message) => {
		setSuccessMsg(message);
		setTimeout(() => {
			setSuccessMsg('');
		}, 3000);
	};

	const authContextValues = {
		auth,
		setAuth,
		persist,
		setPersist,
		errorMsg,
		handleError,
		successMsg,
		handleSuccess,
	};

	return <AuthContext.Provider value={authContextValues}>{children}</AuthContext.Provider>;
};

export default AuthContext;
