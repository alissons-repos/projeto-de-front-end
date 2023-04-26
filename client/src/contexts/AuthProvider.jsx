import { createContext, useState } from 'react';

const AuthContext = createContext({});
// Estamos criando um contexto chamado de AuthContext que iniciará sendo um objeto vazio
// Poderíamos criar diferentes contextos e transmitilos a partir de um único "provider", porém é melhor deixar em arquivos separados para manter a organização

export const AuthProvider = ({ children }) => {
	// AuthProvider será um "provedor" do contexto AuthContext, basicamente uma ferramenta para transmitir o contexto para seus componentes filhos
	// AuthProvider = AuthContext.Provider
	const [auth, setAuth] = useState({});
	const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
	// persist...
	// O localStorage não está sendo utilizado para armazenar token JWT, apenas um boolean que indica se o dispositivo é ou não confiável
	// Armazenar tokens no localStorage ou Cookie do browser não é um boa prática, pois compromete a segurança da aplicação

	return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
