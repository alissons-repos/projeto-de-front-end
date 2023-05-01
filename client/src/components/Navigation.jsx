import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { MdDarkMode } from 'react-icons/md';
// <Link to='/login'>
// <MdDarkMode color='yellow' size={'56px'} />
// </Link>

import useAuth from '../hooks/useAuth';

import style from './Navigation.module.css';

const Navigation = () => {
	// const { auth } = useAuth();

	const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
	const isLarge = windowSize[0] >= 992 ? true : false;

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div className='col-12 col-lg-2 d-flex justify-content-center pt-lg-5'>
			<div className={isLarge ? 'position-fixed' : 'position-static'}>
				<div className='d-flex flex-row flex-lg-column gap-4 gap-lg-2 align-items-center p-3'>
					<img className={style.avatar} src='' alt='' />
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
