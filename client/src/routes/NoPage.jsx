import { Link } from 'react-router-dom';

import style from './NoPage.module.css';

const NoPage = () => {
	return (
		<section className={style.box}>
			<div className='d-flex flex-column justify-content-center align-items-center text-center'>
				<h1 className='display-2 fw-semibold'>Erro 404</h1>
				<h2 className='m-4'>Oops, página não encontrada!</h2>
				<p className='m-2 lead'>
					Faça login <Link to='/login'>login</Link> para ter acesso a aplicação.
					<br />
					Ou <Link to='/register'>cadastre-se</Link>, caso ainda não possua uma conta.
				</p>
			</div>
		</section>
	);
};

export default NoPage;
