import { Link } from 'react-router-dom';
import Header from './Header';

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
						<li key={post.id} className={['card', style.cardStyle].join(' ')}>
							<img
								src={post.imagem}
								className='card-img-top bg-secondary text-center'
								style={{ minWidth: '150px', minHeight: '150px' }}
								alt=''
							/>
							<div className='card-body'>
								<div className={style.titleSize}>
									<h5 className='card-title'>{post.titulo}</h5>
								</div>
								<div className={style.descriptionSize}>
									<p className='card-text'>{post.descricao}</p>
								</div>
								<div className='text-center'>
									<button className='btn btn-danger'>Amei</button>
									<Link href='#' className='btn btn-primary'>
										Mostar mais
									</Link>
								</div>
							</div>
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
