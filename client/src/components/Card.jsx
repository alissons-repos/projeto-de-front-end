import { useState, useEffect } from 'react';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';
import FaveButton from './FaveButton';
import ModalPost from './ModalPost';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Card = ({ data }) => {
	const apiPrivate = useApiPrivate();

	const [wasClicked, setWasClicked] = useState(false);
	const [clickedPost, setClickedPost] = useState({});
	const [imagePath, setImagePath] = useState(`${path.BASE_URL}${path.PUBLIC_URL}/${data?.image}`);
	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_image.jpg`;

	const drawGenderIcon = () => {
		switch (data?.sex) {
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

	const closeModal = () => {
		document.body.classList.remove('overflow-hidden');
		setWasClicked(false);
	};

	const handleClick = (data) => {
		document.body.classList.add('overflow-hidden');
		setClickedPost(data);
		setWasClicked(true);
	};

	useEffect(() => {
		const getCardImage = () => {
			apiPrivate.get(imagePath).catch(() => setImagePath(''));
		};
		getCardImage();
	}, []);

	return (
		<>
			{wasClicked ? (
				<div id='modalPost'>
					<div className='my-fade' onClick={closeModal}></div>
					<ModalPost post={clickedPost} />
				</div>
			) : null}
			<div className='customCard'>
				<div className='cardImageBox' onClick={() => handleClick(data)}>
					{imagePath ? (
						<img
							src={imagePath}
							className='cardImage d-flex justify-content-center align-items-center'
							alt='imagem da postagem enviada pelo usuário'
						/>
					) : (
						<img
							src={imagePlaceHolder}
							className='cardImage d-flex justify-content-center align-items-center'
							alt='imagem padrão reservada pelo site'
						/>
					)}
				</div>
				<div className='cardBody'>
					<h5 className='cardTitle text-truncate'>{data?.title}</h5>
					<div className='cardBadges cardText text-capitalize'>
						<Tag>{data?.category}</Tag>
						{drawGenderIcon()}
					</div>
					<p className='cardText text-truncate'>{data?.description}</p>
				</div>
				<div className='cardFooter'>
					<FaveButton postID={data?._id} likesLength={data?.likes.length} />
				</div>
			</div>
		</>
	);
};

export default Card;
