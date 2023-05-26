import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

const Feed = ({ isLarge }) => {
	const message = 'Não há nenhuma postagem no momento!';
	const usersPosts = false;
	return (
		<div className='container-fluid'>
			<div className='row'>
				<Header isLarge={isLarge} />
				{isLarge ? <Navigation isLarge={isLarge} /> : <></>}
				<Postings message={message} usersPosts={usersPosts} isLarge={isLarge} />
			</div>
		</div>
	);
};

export default Feed;
