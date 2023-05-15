import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Postings from '../components/Postings';

const MyPostings = () => {
	const message = 'Você não possui nenhuma postagem!';
	return (
		<div className='container-fluid'>
			<div className='row d-flex'>
				<Header />
				<Navigation />
				<Postings message={message} />
			</div>
		</div>
	);
};

export default MyPostings;
