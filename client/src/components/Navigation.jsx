import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import path from '../apis/endpoints';

const Navigation = ({ isLarge }) => {
	const { auth } = useAuth();
	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	return (
		<div className='col-xl-2 d-flex justify-content-center pt-5 vh-100 ms-auto'>
			<div className={isLarge ? 'position-fixed' : 'position-static'}>
				<div className='d-flex flex-column gap-3 align-items-center p-3'>
					<Link className='avatar link-secondary' to='/profile/myavatar'>
						<img src={imagePath} alt='foto do usuário logado' />
					</Link>
					<div className='navbar d-flex flex-column text-center'>
						<h2 className='display-font text-capitalize'>{auth.userData.firstName}</h2>
						<ul className='navbar-nav list-unstyled'>
							<li className='dropdown py-2'>
								<Link
									className='dropdown-toggle linkStyle d-inline'
									role='button'
									data-bs-toggle='dropdown'
								>
									Meu Perfil
								</Link>
								<ul className='dropdown-menu text-center'>
									<li>
										<Link className='dropdown-item' to='/profile/mydata'>
											Alterar dados e senha
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' to='/profile/myavatar'>
											Alterar foto de perfil
										</Link>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<Link className='dropdown-item' to='/profile/deleteaccount'>
											Deletar minha conta
										</Link>
									</li>
								</ul>
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
				</div>
			</div>
		</div>
	);
};

export default Navigation;
