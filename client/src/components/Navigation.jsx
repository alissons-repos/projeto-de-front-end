import { Link } from 'react-router-dom';
import { MdDarkMode } from 'react-icons/md';

import style from './Navigation.module.css';

const Navigation = () => {
	return (
		<div className={style.active}>
			<h1>Navigation</h1>
			<Link to='/login'>
				<MdDarkMode color='yellow' size={'56px'} />
			</Link>
		</div>
	);
};

export default Navigation;
