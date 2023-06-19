import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useLogout from '../hooks/useLogout';
import path from '../apis/endpoints';

const Logout = () => {
	const logout = useLogout();
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(async () => {
			await logout(); // logout por si só já tira a pessoa da aplicação pois apaga o refreshToken armazenado no secure cookie
			navigate(path.LOGIN_URL, { replace: true });
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='vh-100 d-flex flex-column justify-content-center align-items-center text-center'>
			<h1 className='display-font display-3 fw-semibold' style={{ color: '#fd7e14' }}>
				Foi bom te ver por aqui!
			</h1>
			<h2 className='m-4'>
				Esperamos que tenha encontrado o que desejava. <span>&#129309;</span>
			</h2>
			<p className='m-2 lead fs-3'>
				Até a próxima! <span>&#128075;</span>
			</p>
			<p className='m-2 lead fs-1'>
				<span>&#129419;</span>
			</p>
		</div>
	);
};

export default Logout;
