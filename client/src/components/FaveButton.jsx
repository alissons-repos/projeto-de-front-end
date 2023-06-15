import { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const FaveButton = ({ postID, likesLength }) => {
	const { auth, setAuth } = useAuth();
	const apiPrivate = useApiPrivate();

	const liked = auth.userData.favorites.includes(postID);

	const [qtdLikes, setQtdLikes] = useState(likesLength);
	const [icon, fillIcon] = useState(false);
	const [favedFlag, setFavedFlag] = useState(false);

	const handleLikeUnlike = async () => {
		try {
			if (liked) {
				await apiPrivate.patch(`${path.AUTH_POSTS_UNLIKE_ID_URL}${postID}`);
				fillIcon(false);
				setFavedFlag(false);
			} else {
				await apiPrivate.patch(`${path.AUTH_POSTS_LIKE_ID_URL}${postID}`);
				fillIcon(true);
				setFavedFlag(true);
			}
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
		} finally {
			const response = await apiPrivate.get(`${path.USER_ID_URL}${auth.userData._id}`);
			setAuth((previous) => ({ ...previous, userData: response?.data }));
		}
	};

	useEffect(() => {
		const updateComponent = async () => {
			const response = await apiPrivate.get(`${path.POSTS_ID_URL}${postID}`);
			setQtdLikes(response?.data.likes.length);
			fillIcon(liked);
			setFavedFlag(liked);
		};
		updateComponent();
	}, [auth]);

	return (
		<div className='d-flex justify-content-center align-items-center gap-2'>
			<div>{qtdLikes}</div>
			<div onClick={handleLikeUnlike}>
				{icon ? (
					<AiFillHeart
						className='pointer'
						color={favedFlag ? '#dc3545' : '#909090'}
						size='1.5em'
						onMouseOver={favedFlag ? null : () => fillIcon(true)}
						onMouseLeave={favedFlag ? null : () => fillIcon(false)}
					/>
				) : (
					<AiOutlineHeart
						className='pointer'
						color='#909090'
						size='1.5em'
						onMouseOver={favedFlag ? null : () => fillIcon(true)}
						onMouseLeave={favedFlag ? null : () => fillIcon(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default FaveButton;
