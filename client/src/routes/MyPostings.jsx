import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

import style from './MyPostings.module.css';

const MyPostings = () => {
	const message = 'Você não possui nenhuma postagem!';
	return (
		<div className='container-fluid'>
			<div className='row d-flex'>
				<Navigation className='bg-dark' />
				<Postings className='bg-danger' message={message} />
			</div>
		</div>
	);
};

export default MyPostings;
