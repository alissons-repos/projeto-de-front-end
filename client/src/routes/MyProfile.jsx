import Header from '../components/Header';
import Navigation from '../components/Navigation';
import UserData from '../components/UserData';
import UserAvatar from '../components/UserAvatar';
import DeleteUser from '../components/DeleteUser';

const MyProfile = ({ isLarge, component }) => {
	return (
		<div className='container-fluid'>
			<div className='row'>
				<Header isLarge={isLarge} />
				{isLarge ? <Navigation isLarge={isLarge} /> : null}
				{component === 'data' && <UserData />}
				{component === 'avatar' && <UserAvatar />}
				{component === 'delete' && <DeleteUser />}
			</div>
		</div>
	);
};

export default MyProfile;
