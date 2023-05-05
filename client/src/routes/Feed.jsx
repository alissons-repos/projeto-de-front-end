import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

import style from './Feed.module.css';

const Feed = () => {
	const message = 'Não há nenhuma postagem no momento!';
	return (
		<div className='container-fluid'>
			<div className='row'>
				<Header />
				<Navigation />
				<Postings message={message} />
			</div>
		</div>
	);
};

export default Feed;
