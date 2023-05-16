import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className='position-fixed list-unstyled p-2' style={{ backgroundColor: '#FE9A2E' }}>
			<li className='ps-3 fs-4 text-decoration-none fw-semibold'>
				<Link className='linkStyle' to='/feed'>
					Meu Amigo PET
				</Link>
			</li>
		</nav>
	);
};

export default Header;
