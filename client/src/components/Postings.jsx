import { Link } from 'react-router-dom';
import Card from './Card';

import postagens from '../data/postagens.json';

const Postings = ({ message, isLarge }) => {
	// style={{ backgroundColor: '#fe9a2e' }}
	return (
		<div className='col-12 col-xl-10'>
			{/* <div className='row'> */}
			<div className={isLarge ? 'col-12 col-xl-10 position-fixed' : 'col-12 col-xl-10 position-static'}>
				<div className='row' style={{ backgroundColor: '#fe9a2e' }}>
					<nav className='d-flex justify-content-center gap-5 list-unstyled p-2'>
						<li className='fs-4'>
							<Link className='navlinkStyle' to='#'>
								Adoção
							</Link>
						</li>
						<li className='fs-4'>
							<Link className='navlinkStyle' to='#'>
								Cruzamento
							</Link>
						</li>
						<li className='fs-4'>
							<Link className='navlinkStyle' to='#'>
								Eventos?
							</Link>
						</li>
					</nav>
				</div>
			</div>
			{/* </div> */}
			<br />
			<ul className='row list-unstyled mt-xl-5'>
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
