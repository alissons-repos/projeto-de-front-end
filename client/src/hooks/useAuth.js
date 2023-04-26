import { useContext } from 'react';
import AuthContext from '../contexts/AuthProvider';

const useAuth = () => {
	// Esse hook personalizado elimina a necessidade de importar e definir o contexto em todos os arquivos que ele for necessário.
	// Sem ele teríamos que repetir o mesmo código diversas vezes em diferentes arquivos/componentes.
	return useContext(AuthContext);
};

export default useAuth;
