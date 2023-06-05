import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';
import FaveButton from './FaveButton';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Card = ({ data }) => {
	const apiPrivate = useApiPrivate();
	const [imagePath, setImagePath] = useState(`${path.BASE_URL}${path.PUBLIC_URL}/${data?.image}`);
	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_image.jpg`;

	const drawGenderIcon = () => {
		switch (data?.sex) {
			case 'macho':
				return (
					<Tag sex='male'>
						<BsGenderMale />
					</Tag>
				);
			case 'fêmea':
				return (
					<Tag sex='female'>
						<BsGenderFemale />
					</Tag>
				);
			case 'ambos':
				return (
					<Tag sex='ambiguous'>
						<BsGenderAmbiguous />
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
		<div className='customCard'>
			<div className='cardImageBox'>
				{imagePath ? (
					<img
						src={imagePath}
						className='cardImage d-flex justify-content-center align-items-center'
						alt='imagem da postagem enviada pelo usuário'
					/>
				) : (
					<img
						src={imagePlaceHolder}
						alt='imagem padrão reservada pelo site'
						className='cardImage d-flex justify-content-center align-items-center'
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
				<FaveButton /> {data?.likes.length ? data?.likes.length : 0}
			</div>
		</div>
	);
};

export default Card;
