import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import Tag from './Tag';

import FaveButton from './FaveButton';

import style from './Card.module.css';

// import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';

const Card = ({ data }) => {
	const drawGenderIcon = () => {
		switch (data.sex) {
			case "macho":
				return (<Tag sex="male">
					<BsGenderMale />
				</Tag>);
			case "fêmea":
				return (<Tag sex="female">
					<BsGenderFemale />
				</Tag>);
			case "ambos":
				return (<Tag sex="ambiguous">
					<BsGenderAmbiguous />
				</Tag>);
			default:
				return ("");
		}
	}

	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${data.image}`;

	return (
		<div className={style.card}>
			<img src={imagePath} className={style.cardImage} alt='' />
			<div className={style.cardBody}>
				<h5 className={style.cardTitle}>{data.title}</h5>
				<div className={`${style.cardBadges} ${style.cardText}`}>
					<Tag>{data.category}</Tag>
					{drawGenderIcon()}
				</div>
				<p className={['text-truncate', style.cardText].join(' ')} style={{ lineClamp: 2 }}>
					{data.description}
				</p>
			</div>
			<div className={style.cardFooter}>
				<div className={style.cardBadges}>
					{/* <span className='badge text-bg-danger fw-normal fs-5'>{data.category}</span> */}
					{/* <Tag>{data.category}</Tag>
					{drawGenderIcon()} */}
					{/* {!data.sex ? (
						''
					) : data.sex === 'ambos' ? (
						<span className='badge text-bg-danger fw-normal fs-5'>
							<BsGenderAmbiguous />
						</span>
					) : data.sex === 'fêmea' ? (
						<span className='badge text-bg-danger fw-normal fs-5'>
							<BsGenderFemale />
						</span>
					) : (
						<span className='badge text-bg-danger fw-normal fs-5'>
							<BsGenderMale />
						</span>
					)} */}
					{/* {!data.amount ? '' : <span className='badge text-bg-danger fw-normal fs-5'>{data.amount}</span>} */}
				</div>
				<div className={style.cardButtons}>
					<button className='btn btn-danger'>
						<FaHeart /> {data.likes.length ? data.likes.length : 0}
					</button>
					{/* <NavLink to='#' className='btn btn-primary'>
						Mostar mais
					</NavLink> */}
				</div>
			</div>
		</div>
	);
};

export default Card;
