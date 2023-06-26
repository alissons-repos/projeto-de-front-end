import { Link } from 'react-router-dom';

import logo from '../public/map-logo.svg';

import useAuth from '../hooks/useAuth';
import path from '../apis/endpoints';

const Header = ({ isLarge }) => {
	const { auth } = useAuth();
	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	return (
		<>
			{isLarge ? (
				<nav className='position-fixed list-unstyled p-2' style={{ backgroundColor: '#fd7e14' }}>
					<div className='ps-2 fs-4 text-decoration-none fw-semibold ps-lg-3'>
						<Link to='/feed'>
							<img src={logo} alt='Meu Amigo PET' width='70' />
						</Link>
					</div>
				</nav>
			) : (
				<nav className='navbar navbar-expand-xl' style={{ backgroundColor: '#fd7e14' }}>
					<div className='container-fluid'>
						<div className='ps-2 fs-4 text-decoration-none fw-semibold ps-lg-3'>
							<Link to='/feed'>
								<img src={logo} alt='Meu Amigo PET' width='70' />
							</Link>
						</div>
						<button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#userInfo'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='userInfo'>
							<div className='d-flex flex-column gap-3 align-items-center p-3'>
								<Link className='avatar link-secondary' to='/profile/myavatar'>
									<img src={imagePath} alt='foto do usuário logado' />
								</Link>
								<ul className='navbar-nav'>
									<div className='d-flex flex-column text-center list-unstyled'>
										<h2 className='display-font text-capitalize text-white'>
											{auth.userData.firstName}
										</h2>
										<li className='dropdown py-2'>
											<Link
												className='dropdown-toggle navlinkStyleDropdown d-inline'
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
											<Link className='navlinkStyle' to='/postings'>
												Meus Posts
											</Link>
										</li>
										<li className='py-2'>
											<Link className='navlinkStyle' to='/feed'>
												Feed
											</Link>
										</li>
										<li className='py-2'>
											<Link className='navlinkStyle' to='/logout'>
												Sair
											</Link>
										</li>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
};

export default Header;
