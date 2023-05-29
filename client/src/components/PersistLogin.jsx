import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useRefresh from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefresh();
	const { auth, persist } = useAuth();

	useEffect(() => {
		let isMounted = true; // Utilizado para resolver o problema de memory liking

		const verifyRefreshToken = async () => {
			try {
				await refresh();
				// Busca por meio de uma requisição get na rota "/refresh" um novo access token por meio do refresh
			} catch (error) {
				// console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			} finally {
				isMounted && setIsLoading(false);
				// Estrutura condicional para resolver o problema de memory liking
			}
		};

		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
		// A função verifyRefreshToken() deve ser executada apenas uma vez ao recarregar a página, pois se houver um usuário logado e seu token estiver válido, não é necessário ir buscar um novo refreshtoken na rota "/refresh"

		return () => (isMounted = false); // A cleanup function foi necessária para resolver um problema de memory leaking
	}, []);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
		console.log(`authJWT: ${JSON.stringify(auth?.accessToken)}`); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
	}, [isLoading]);

	return (
		<>{!persist ? <Outlet /> : isLoading ? <p>Carregando...</p> : <Outlet />}</>
		// <>{!persist ? <Outlet isLarge={isLarge} /> : isLoading ? <p>Carregando...</p> : <Outlet isLarge={isLarge} />}</>
	);
	// Outlet renderizará todos os componentes filhos dentro do componente PersistLogin
};

export default PersistLogin;
