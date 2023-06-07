import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const FaveButton = ({ postID, likes }) => {
	const { auth, setAuth } = useAuth();
	const apiPrivate = useApiPrivate();

	const liked = auth.userData.favorites.includes(postID);

	const [qtdLikes, setQtdLikes] = useState(likes);
	const [icon, fillIcon] = useState(liked);
	const [favedFlag, setFavedFlag] = useState(liked);

	const handleClick = () => {
		if (favedFlag) {
			fillIcon(false);
			setFavedFlag(false);
		} else {
			fillIcon(true);
			setFavedFlag(true);
		}
		// console.log('Faved?: ' + favedFlag); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
	};

	const handleLikeUnlike = async () => {
		try {
			if (liked) {
				await apiPrivate.patch(`${path.AUTH_POSTS_UNLIKE_ID_URL}${postID}`);
			} else {
				await apiPrivate.patch(`${path.AUTH_POSTS_LIKE_ID_URL}${postID}`);
			}
		} catch (error) {
			console.error(error);
		} finally {
			const response1 = await apiPrivate.get(`${path.USER_ID_URL}${auth.userData._id}`);
			const response2 = await apiPrivate.get(`${path.POSTS_ID_URL}${postID}`);
			setAuth((previous) => ({ ...previous, userData: response1?.data }));
			setQtdLikes(response2?.data.likes.length);
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center gap-2'>
			<div>{qtdLikes}</div>
			<div onClick={handleLikeUnlike}>
				{icon ? (
					<AiFillHeart
						className='pointer'
						color={favedFlag ? '#dc3545' : '#909090'}
						size='1.5em'
						onClick={handleClick}
						onMouseOver={favedFlag ? null : () => fillIcon(true)}
						onMouseLeave={favedFlag ? null : () => fillIcon(false)}
					/>
				) : (
					<AiOutlineHeart
						className='pointer'
						color='#909090'
						size='1.5em'
						onClick={handleClick}
						onMouseOver={favedFlag ? null : () => fillIcon(true)}
						onMouseLeave={favedFlag ? null : () => fillIcon(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default FaveButton;
