import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';

const MyProfile = () => {
	return (
		<div className='container-fluid'>
			<div className='row d-flex'>
				<Header />
				<Navigation />
				<Profile />
			</div>
		</div>
	);
};

export default MyProfile;
