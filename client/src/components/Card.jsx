import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

import style from './Card.module.css';

const Card = ({ data }) => {
	return (
		<div className={style.card}>
			<img src={data.imagem} className={style.cardImage} alt='' />
			<div className={style.cardBody}>
				<h5 className={style.cardTitle}>{data.titulo}</h5>
				<p className={style.cardText}>{data.descricao}</p>
			</div>
			<div className={style.cardFooter}>
				<button className='btn btn-danger'>
					<FaHeart /> {!data.likes ? 0 : data.likes}
				</button>
				<NavLink to='#' className='btn btn-primary'>
					Mostar mais
				</NavLink>
			</div>
		</div>
	);
};

export default Card;
