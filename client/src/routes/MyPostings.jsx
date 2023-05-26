import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

const MyPostings = ({ isLarge }) => {
	const message = 'Você não possui nenhuma postagem!';
	const usersPosts = true;
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

export default MyPostings;
