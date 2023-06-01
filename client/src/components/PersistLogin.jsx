import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useRefresh from '../hooks/useRefreshToken';
// import useApiPrivate from '../hooks/useApiPrivate';
// import path from '../apis/endpoints';

const PersistLogin = () => {
	const { auth, setAuth, persist } = useAuth();
	const refresh = useRefresh();
	// const apiPrivate = useApiPrivate();

	const [isLoading, setIsLoading] = useState(true);
	// const persistRefresh = localStorage.getItem('refresh');

	useEffect(() => {
		let isMounted = true; // Utilizado para resolver o problema de memory liking

		const verifyRefreshToken = async () => {
			try {
				await refresh();
				// Busca por meio de uma requisição get na rota "/refresh" um novo access token por meio do refresh
			} catch (error) {
				console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			} finally {
				isMounted && setIsLoading(false);
				// Estrutura condicional para resolver o problema de memory liking
			}
		};

		// const persistUserData = async () => {
		// 	try {
		// 		const resGetUsers = await apiPrivate.get(path.USER_URL);
		// 		const userData = resGetUsers?.data?.find((user) => user.refreshToken === persistRefresh);
		// 		setAuth((previous) => ({ ...previous, userData }));
		// 	} catch (error) {
		// 		console.error(error);
		// 	} finally {
		// 		isMounted && setIsLoading(false);
		// 	}
		// };

		// !auth?.userData ? persistUserData() : setAuth((previous) => previous);
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
		// A função verifyRefreshToken() deve ser executada apenas uma vez ao recarregar a página, pois se houver um usuário logado e seu token estiver válido, não é necessário ir buscar um novo refreshtoken na rota "/refresh"

		return () => {
			isMounted = false; // A cleanup function foi necessária para resolver um problema de memory leaking
		};
	}, []);

	return <>{!persist ? <Outlet /> : isLoading ? <p>Carregando...</p> : <Outlet />}</>;
	// Outlet renderizará todos os componentes filhos dentro do componente PersistLogin
};

export default PersistLogin;
