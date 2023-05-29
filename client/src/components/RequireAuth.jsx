import { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
// import useApiPrivate from '../hooks/useApiPrivate';
// import path from '../apis/endpoints';

// const { auth, setAuth } = useAuth();
// const apiPrivate = useApiPrivate();

// const getCurrentData = async () => {
// 	try {
// 		const reqGetUser = await apiPrivate.get(path.USER_URL);
// 		const loggedUser = reqGetUser.data.find((user) => user.email === auth.email);
// 		setAuth({ ...auth, userData: loggedUser });
// 	} catch (error) {
// 		console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
// 	}
// };

// Aqui estamos sobrescrevendo o estado do contexto "Auth". Ao logar o contexto é definido com o email do usuário logado, logo em seguida ao acessar qualquer rota privada o contexto será sobrescrito com os dados do usuário logado.

// useEffect(() => {
// 	getCurrentData();
// 	console.log(auth);
// }, []);

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();
	// console.log(auth);

	// useEffect(() => {
	// 	console.log('Houve alteração no contexto da aplicação!');
	// }, [auth]);

	return auth?.accessToken ? (
		// <Outlet isLarge={isLarge} />
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuth;
