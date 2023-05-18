import { Link } from 'react-router-dom';

const Header = ({ isLarge }) => {
	return (
		<>
			{isLarge ? (
				<nav className='position-fixed list-unstyled p-2' style={{ backgroundColor: '#FE9A2E' }}>
					<div className='fs-4 text-decoration-none fw-semibold ps-lg-3'>
						<Link className='linkStyle' to='/feed'>
							Meu Amigo PET
						</Link>
					</div>
				</nav>
			) : (
				<nav className='navbar navbar-expand-xl' style={{ backgroundColor: '#FE9A2E' }}>
					<div className='container-fluid'>
						<div className='fs-4 text-decoration-none fw-semibold ps-lg-3'>
							<Link className='linkStyle' to='/feed'>
								Meu Amigo PET
							</Link>
						</div>
						<button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#userInfo'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='userInfo'>
							<div className='d-flex flex-column gap-3 align-items-center p-3'>
								<img className='avatar' src='' alt='' />
								<ul className='navbar-nav'>
									<div className='d-flex flex-column list-unstyled'>
										{/* <h2>{auth?.user.userName}</h2> */}
										<h2 className=''>Fulano de Tal</h2>
										<li>
											<Link to='/profile'>Meu Perfil</Link>
										</li>
										<li>
											<Link to='/postings'>Meus Posts</Link>
										</li>
										<li>
											<Link to='/feed'>Feed</Link>
										</li>
										<li>
											<Link to='/logout'>Sair</Link>
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

{
	/* <nav className='navbar navbar-expand-xl' style={{ backgroundColor: '#FE9A2E' }}>
<div className='container-fluid'>
	<div className='fs-4 text-decoration-none fw-semibold ps-lg-3'>
		<Link className='linkStyle' to='/feed'>
			Meu Amigo PET
		</Link>
	</div>
	<button class='navbar-toggler' data-bs-toggle='offcanvas' data-bs-target='#userInfo'>
		<span class='navbar-toggler-icon'></span>
	</button>
	<div class='offcanvas offcanvas-end' tabindex='-1' id='userInfo'>
		<div class='offcanvas-header'>
			<h5 class='offcanvas-title' id='offcanvasNavbarLabel'>
				Menu
			</h5>
			<button type='button' class='btn-close' data-bs-dismiss='offcanvas'></button>
		</div>
		<div class='offcanvas-body'>
			<div className='d-flex flex-column align-items-end gap-3 p-3'>
				<img className='avatar' src='' alt='' />
				<ul class='navbar-nav'>
					<div className='d-flex flex-column align-items-end list-unstyled'>
						<h2 className=''>Fulano de Tal</h2>
						<li>
							<Link to='/profile'>Meu Perfil</Link>
						</li>
						<li>
							<Link to='/postings'>Meus Posts</Link>
						</li>
						<li>
							<Link to='/feed'>Feed</Link>
						</li>
						<li>
							<Link to='/logout'>Sair</Link>
						</li>
					</div>
				</ul>
			</div>
		</div>
	</div>
</div>
</nav> */
}

export default Header;
