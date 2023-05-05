import { Link } from 'react-router-dom';
import Header from './Header';
import Card from './Card';

import postagens from '../data/postagens.json';

import style from './Postings.module.css';

const Postings = ({ message }) => {
	return (
		<div className='col-12 col-xl-10'>
			<div className='row'>
				<div className='col-12 col-xl-10 position-fixed' style={{ backgroundColor: '#FE9A2E' }}>
					<nav className='d-flex justify-content-center gap-5 list-unstyled p-2'>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Adoção
							</Link>
						</li>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Cruzamento
							</Link>
						</li>
						<li className='fs-4 text-decoration-none fw-semibold'>
							<Link className='linkStyle' to='#'>
								Eventos?
							</Link>
						</li>
					</nav>
				</div>
			</div>
			<br />
			<ul className='row list-unstyled mt-5'>
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
