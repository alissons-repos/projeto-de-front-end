import { Link } from 'react-router-dom';
// import { MdDarkMode } from 'react-icons/md';
// <Link to='/login'>
// <MdDarkMode color='yellow' size={'56px'} />
// </Link>

import useAuth from '../hooks/useAuth';

import style from './Navigation.module.css';

const Navigation = () => {
	// const { auth } = useAuth();

	return (
		<div className='col-3 bg-dark'>
			<img className={style.avatar} src='' alt='' />
			<div className={style.text}>
				{/* <h2>{auth?.user.userName}</h2> */}
				<h2>Fulano de Tal</h2>
				<Link to='/profile'>Meu Perfil</Link>
				<Link to='/postings'>Meus Posts</Link>
				<Link to='/logout'>Sair</Link>
			</div>
		</div>
	);
};

export default Navigation;
