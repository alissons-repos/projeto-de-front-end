import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import useLogout from '../hooks/useLogout';
// import path from '../apis/endpoints';

const Goodbye = () => {
	const logout = useLogout();
	// const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(async () => {
			await logout(); // logout por si só já tira a pessoa da aplicação pois apaga o refreshToken armazenado no secure cookie
			// navigate(path.LOGIN_URL, { replace: true });
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='vh-100 d-flex flex-column justify-content-center align-items-center text-center'>
			<h1 className='display-font display-3 fw-semibold' style={{ color: '#fe9a2e' }}>
				Foi bom enquanto durou!
			</h1>
			<h2 className='m-4'>
				É uma pena ver você ir embora. <span>&#128546;</span>
			</h2>
			<p className='m-2 lead fs-3'>
				Mas saiba que estaremos sempre de portas abertas! <span>&#128537;</span>
			</p>
			<p className='m-2 lead fs-1'>
				<span>&#129419;</span>
			</p>
		</div>
	);
};

export default Goodbye;
