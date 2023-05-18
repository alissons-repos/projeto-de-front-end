import { Link } from 'react-router-dom';

import logo from '../img/map-logo.svg';

const Header = () => {
	return (
		<nav className='position-fixed list-unstyled p-2' style={{ backgroundColor: '#FE9A2E' }}>
			<li className='ps-2 fs-4 text-decoration-none fw-semibold'>
				<Link to='/feed'>
					<img src={logo} alt="Meu Amigo PET" width="70" />
					{/* Meu Amigo PET */}
				</Link>
			</li>
		</nav>
	);
};

export default Header;
