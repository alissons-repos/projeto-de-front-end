import { useState, useEffect } from 'react';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';
import FaveButton from './FaveButton';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Card = ({ data, clickFunction }) => {
	const apiPrivate = useApiPrivate();
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

	useEffect(() => {
		const getCardImage = () => {
			apiPrivate.get(imagePath).catch(() => setImagePath(''));
		};
		getCardImage();
	}, []);

	return (
		<div className='customCard'>
			{/* <div>  Div que será utilizada como caixa para o abrir o modal*/}
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
			{/* </div> */}
			<div className='cardFooter'>
				<FaveButton postID={data._id} likes={data?.likes.length} />
			</div>
		</div>
	);
};

export default Card;
