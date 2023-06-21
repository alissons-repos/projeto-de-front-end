import { useState, useEffect } from 'react';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

import Tag from './Tag';
import FaveButton from './FaveButton';
import ModalPost from './ModalPost';
import ModalMyPost from './ModalMyPost';
import ModalDelete from './ModalDelete';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Card = ({ data, myposts }) => {
	const apiPrivate = useApiPrivate();
	const deleteMessage = 'Você confirma a exclusão da postagem?';

	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_image.jpg`;
	const [imagePath, setImagePath] = useState(`${path.BASE_URL}${path.PUBLIC_URL}/${data?.image}`);
	const [wasClicked, setWasClicked] = useState(false);
	const [clickedPost, setClickedPost] = useState({});
	const [modalType, setModalType] = useState('');

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
		// document.body.classList.remove('overflow-hidden');
		setWasClicked(false);
		setModalType('');
	};

	const handleClick = (data, modal) => {
		// document.body.classList.add('overflow-hidden');
		setClickedPost(data);
		setWasClicked(true);
		switch (modal) {
			case 'modalPost':
				setModalType('modalPost');
				break;
			case 'modalMyPost':
				setModalType('modalMyPost');
				break;
			case 'modalDelete':
				setModalType('modalDelete');
				break;
		}
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
					{modalType === 'modalPost' && <ModalPost post={clickedPost} />}
					{modalType === 'modalMyPost' && <ModalMyPost post={clickedPost} />}
					{modalType === 'modalDelete' && <ModalDelete post={clickedPost} message={deleteMessage} />}
				</div>
			) : null}
			<div className='customCard'>
				<div className='cardImageBox' onClick={() => handleClick(data, 'modalPost')}>
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
				<div className={['cardFooter', `${myposts ? 'justify-content-between' : ''}`].join(' ')}>
					{myposts ? (
						<div className='cardBadges'>
							<div className='mx-1' onClick={() => handleClick(data, 'modalMyPost')}>
								<FaRegEdit size={20} className='edit-button pointer' />
							</div>
							<div className='mx-1' onClick={() => handleClick(data, 'modalDelete')}>
								<FaRegTrashAlt size={20} className='delete-button pointer' />
							</div>
						</div>
					) : null}
					<FaveButton postID={data?._id} likesLength={data?.likes.length} />
				</div>
			</div>
		</>
	);
};

export default Card;
