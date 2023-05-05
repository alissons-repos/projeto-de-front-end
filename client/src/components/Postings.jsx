import { Link } from 'react-router-dom';
import Header from './Header';
import Card from './Card';

import postagens from '../data/postagens.json';

import style from './Postings.module.css';

const Postings = ({ message }) => {
	return (
		<div className='col-12 col-xl-10'>
			<ul className='d-flex justify-content-center gap-5 list-unstyled p-3 bg-success'>
				<li>
					<Link className={style.linkStyle} to='#'>
						Adoção
					</Link>
				</li>
				<li>
					<Link className={style.linkStyle} to='#'>
						Cruzamento
					</Link>
				</li>
				<li>
					<Link className={style.linkStyle} to='#'>
						Eventos?
					</Link>
				</li>
			</ul>
			<ul className='row list-unstyled'>
				{postagens.length !== 0 ? (
					postagens.map((post) => (
						// card col-12 col-md-6 col-lg-4
						<li key={post.id} className='col-12 col-md-6 col-lg-4'>
							<Card data={post} />
							<br />
						</li>
					))
				) : (
					<p>{message}</p>
				)}
			</ul>
		</div>
	);
};

export default Postings;
