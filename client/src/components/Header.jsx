import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className='d-flex gap-5 p-2 align-items-center' style={{ backgroundColor: '#ffbe5c' }}>
			<span>
				<Link className='fs-4 ms-5 text-decoration-none link-light fw-semibold' to='/feed'>
					Meu Amigo PET
				</Link>
			</span>
		</nav>
	);
};

export default Header;
