import { Link } from 'react-router-dom';

import style from './NoPage.module.css';

const NoPage = () => {
	return (
		<section>
			<h1>Erro 404</h1>
			<h3>Oops, página não encontrada!</h3>
			<div className='#'>
				<p>
					Faça login<Link to='/login'>login</Link>para ter acesso a aplicação.
				</p>
				<p>
					Ou<Link to='/register'>cadastre-se</Link>, caso ainda não possua uma conta.
				</p>
			</div>
		</section>
	);
};

export default NoPage;
