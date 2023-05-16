import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Navigation = ({ isLarge }) => {
	// const { auth } = useAuth();

	return (
		<div className='col-12 col-lg-12 col-xl-2 d-flex justify-content-center mt-5'>
			<div className={isLarge ? 'position-fixed' : 'position-static'}>
				<div className='d-flex flex-row flex-xl-column gap-4 align-items-center p-3'>
					<img className='avatar' src='' alt='' />
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
							<Link to='/logout'>Sair</Link>
						</li>
					</div>
					{/* <div className='position-absolute bottom-0'>Footer</div> */}
				</div>
			</div>
		</div>
	);
};

export default Navigation;
