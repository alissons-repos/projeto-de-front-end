import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';
import FaveButton from './FaveButton';

// import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';

const Card = ({ data }) => {
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

	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${data?.image}`;

	return (
		<div className='customCard'>
			<div className='cardImageBox'>
				<img src={imagePath} className='cardImage' alt='' />
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
