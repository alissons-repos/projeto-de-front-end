import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import useRefresh from '../hooks/useRefreshToken';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const PersistLogin = () => {
	const { auth, setAuth, persist } = useAuth();
	const refresh = useRefresh();
	const apiPrivate = useApiPrivate();

	const [isLoadingToken, setIsLoadingToken] = useState(true);
	const [isLoadingData, setIsLoadingData] = useState(true);
	const persistRefresh = localStorage.getItem('refresh');

	useEffect(() => {
		let isMounted = true; // Utilizado para resolver o problema de memory leaking

		const verifyRefreshToken = async () => {
			try {
				await refresh();
				// Busca por meio de uma requisição get na rota "/refresh" um novo access token por meio do refresh
			} catch (error) {
				console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			} finally {
				isMounted && setIsLoadingToken(true);
				// setIsLoadingToken(false);
				// Estrutura condicional para resolver o problema de memory leaking
			}
		};

		const persistUserData = async () => {
			try {
				const resGetUsers = await apiPrivate.get(path.USER_URL);
				const userData = resGetUsers?.data?.find((user) => user.refreshToken === persistRefresh);
				setAuth((previous) => ({ ...previous, userData }));
			} catch (error) {
				console.error(error);
			} finally {
				isMounted && setIsLoadingData(true);
				// setIsLoadingData(false);
			}
		};

		// !auth?.userData ? persistUserData() : setAuth((previous) => previous);
		!auth?.userData ? persistUserData() : setIsLoadingData(true);
		!auth?.accessToken ? verifyRefreshToken() : setIsLoadingToken(true);
		// A função verifyRefreshToken() deve ser executada apenas uma vez ao recarregar a página, pois se houver um usuário logado e seu token estiver válido, não é necessário ir buscar um novo refreshtoken na rota "/refresh"

		return () => {
			isMounted = false; // A cleanup function foi necessária para resolver um problema de memory leaking
		};
	}, []);

	return (
		<>
			{!persist ? (
				<Outlet />
			) : isLoadingToken || isLoadingData ? (
				<h1 className='vh-100 d-flex justify-content-center align-items-center display-6'>Carregando...</h1>
			) : (
				<Outlet />
			)}
		</>
	);
	// Outlet renderizará todos os componentes filhos dentro do componente PersistLogin
};

export default PersistLogin;
