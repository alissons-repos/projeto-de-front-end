import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import style from './Card.module.css';

const Card = ({ data }) => {
	return (
		<div className={['card', style.card].join(' ')}>
			<img
				src={data.imagem}
				className={['card-img-top bg-secondary text-center', style.cardImage].join(' ')}
				alt=''
			/>
			<div className={['card-body', style.cardBody].join(' ')}>
				<h5 className={['card-title', style.cardTitle].join(' ')}>{data.titulo}</h5>
				<p className={['card-text', style.cardText].join(' ')}>{data.descricao}</p>
			</div>
			<hr />
			<div className={['', style.cardFooter].join(' ')}>
				<button className='btn btn-danger'>
					<FaHeart />
					{!data.likes ? 0 : data.likes}
				</button>
				<NavLink to='#' className='btn btn-primary'>
					Mostar mais
				</NavLink>
			</div>
		</div>
	);
};

export default Card;
