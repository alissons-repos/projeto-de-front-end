import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';
import path from '../apis/endpoints';

const Navigation = ({ isLarge }) => {
	const { auth } = useAuth();
	// const logout = useLogout();
	// const navigate = useNavigate();

	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	// Poderíamos deslogar imediatamente o usuário quando ele clicasse no link "sair"
	// const signOut = async () => {
	// await logout();
	// navigate(path.LOGIN_URL, { replace: true });
	// };

	return (
		<div className='col-12 col-lg-12 col-xl-2 d-flex justify-content-center mt-5'>
			<div className={isLarge ? 'position-fixed' : 'position-static'}>
				<div className='d-flex flex-column gap-3 align-items-center p-3'>
					<div className='avatar'>
						<img src={imagePath} alt='foto do usuário logado' />
					</div>
					<div className='d-flex flex-column text-center'>
						<h2 className='display-font text-capitalize'>{auth.userData.firstName}</h2>
						{/* <h2 className='display-font'>Fulano de Tal</h2> */}
						<ul className='list-unstyled'>
							<li className='py-2'>
								<Link className='linkStyle' to='/profile'>
									Meu Perfil
								</Link>
							</li>
							<li className='py-2'>
								<Link className='linkStyle' to='/postings'>
									Meus Posts
								</Link>
							</li>
							<li className='py-2'>
								<Link className='linkStyle' to='/feed'>
									Feed
								</Link>
							</li>
							<li className='py-2'>
								<Link className='linkStyle' to='/logout'>
									Sair
								</Link>
							</li>
						</ul>
					</div>
					{/* <div className='position-absolute bottom-0'>Footer</div> */}
				</div>
			</div>
		</div>
	);
};

export default Navigation;
