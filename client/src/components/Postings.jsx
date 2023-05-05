import { Link } from 'react-router-dom';
import Header from './Header';
import Card from './Card';

import postagens from '../data/postagens.json';

import style from './Postings.module.css';

const Postings = ({ message }) => {
	return (
		<div className='col-12 col-lg-10 pt-lg-5' style={{ backgroundColor: '#F2F2F2' }}>
			<div className=''>
				<ul className='d-flex justify-content-center gap-5 p-2 list-unstyled'>
					<li className='h3'>
						<Link className={[style.linkStyle, style.fontSize].join(' ')} to='#'>
							Adoção
						</Link>
					</li>
					<li className='h3'>
						<Link className={style.linkStyle} to='#'>
							Cruzamento
						</Link>
					</li>
					<li className='h3'>
						<Link className={style.linkStyle} to='#'>
							Eventos?
						</Link>
					</li>
				</ul>
			</div>
			<div className='d-flex flex-wrap justify-content-center gap-3'>
				{postagens.length !== 0 ? (
					postagens.map((post) => (
						// card col-12 col-md-6 col-lg-4
						<li key={post.id} style={{ listStyle: 'none' }}>
							<Card data={post} />
						</li>
					))
				) : (
					<p>{message}</p>
				)}
			</div>
		</div>
	);
};

export default Postings;
