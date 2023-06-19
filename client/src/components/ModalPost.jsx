import { useState, useEffect } from 'react';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';
import FaveButton from './FaveButton';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const ModalPost = ({ post }) => {
	const apiPrivate = useApiPrivate();

	const [imagePath, setImagePath] = useState(`${path.BASE_URL}${path.PUBLIC_URL}/${post?.image}`);
	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_image.jpg`;

	const drawGenderIcon = () => {
		switch (post?.sex) {
			case 'macho':
				return (
					<Tag sex='male'>
						<BsGenderMale size={20} />
					</Tag>
				);
			case 'fêmea':
				return (
					<Tag sex='female'>
						<BsGenderFemale size={20} />
					</Tag>
				);
			case 'ambos':
				return (
					<Tag sex='ambiguous'>
						<BsGenderAmbiguous size={20} />
					</Tag>
				);
			default:
				return '';
		}
	};

	useEffect(() => {
		const getCardImage = () => {
			apiPrivate.get(imagePath).catch(() => setImagePath(''));
		};
		getCardImage();
	}, []);

	return (
		<div className='my-modal-box col-11 col-xxl-8 d-flex flex-column flex-lg-row'>
			<div className='modalImageBox'>
				{imagePath ? (
					<img
						src={imagePath}
						className='modalImage d-flex justify-content-center align-items-center'
						alt='imagem da postagem enviada pelo usuário'
					/>
				) : (
					<img
						src={imagePlaceHolder}
						className='modalImage d-flex justify-content-center align-items-center'
						alt='imagem padrão reservada pelo site'
					/>
				)}
			</div>
			<div className='modalInfo'>
				<h5 className='modalTitle'>{post?.title}</h5>
				<p className='modalText'>{post?.description}</p>
				<div className='modalFooter'>
					<div className='modalBadges modalText text-capitalize'>
						<Tag>{post?.category}</Tag>
						{drawGenderIcon()}
					</div>
					<FaveButton postID={post?._id} likesLength={post?.likes.length} />
				</div>
			</div>
		</div>
	);
};

export default ModalPost;
