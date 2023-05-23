import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Profile from '../components/Profile';

const MyProfile = ({ isLarge }) => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<Header isLarge={isLarge} />
				{isLarge ? <Navigation isLarge={isLarge} /> : <></>}
				<Profile />
			</div>
		</div>
	);
};

export default MyProfile;
