import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';

import style from './Card.module.css';

const Card = ({ data }) => {
	return (
		<div className={style.card}>
			<img src={data.imagem} className={style.cardImage} alt='' />
			<div className={style.cardBody}>
				<h5 className={style.cardTitle}>{data.title}</h5>
				<p className={['text-truncate', style.cardText].join(' ')} style={{ lineClamp: 2 }}>
					{data.description}
				</p>
			</div>
			<div className={style.cardFooter}>
				<div className={style.cardBadges}>
					<span className='badge text-bg-danger fw-normal fs-5'>{data.category}</span>
					{!data.sex ? (
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
					)}
					{/* {!data.amount ? '' : <span className='badge text-bg-danger fw-normal fs-5'>{data.amount}</span>} */}
				</div>
				<div className={style.cardButtons}>
					<button className='btn btn-danger'>
						<FaHeart /> {!data.likes ? 0 : data.likes}
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
