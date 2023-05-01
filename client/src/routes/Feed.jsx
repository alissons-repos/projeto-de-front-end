import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

import style from './Feed.module.css';

const Feed = () => {
	return (
		<div className='container-fluid'>
			<div className='row d-flex'>
				<Navigation className='bg-dark' />
				<Postings className='bg-danger' />
			</div>
		</div>
	);
};

export default Feed;
