import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

import style from './Feed.module.css';

const Feed = () => {
	return (
		<div className='container-fluid'>
			<div className='row d-flex'>
				<Navigation className='col-6 bg-dark' />
				<Postings className='col-6 bg-danger' />
			</div>
		</div>
	);
};

export default Feed;
