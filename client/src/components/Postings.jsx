import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Card from './Card';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Postings = ({ message, isLarge }) => {
	const [posts, setPosts] = useState([]);

	const apiPrivate = useApiPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getPosts = async () => {
			try {
				const response = await apiPrivate.get(path.POSTS_URL, {
					signal: controller.signal,
					// Esse propriedade permite que possamos cancelar a requisição utilizando utilizando métodos da classe AbortController()
				});
				console.log(response.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
				isMounted && setPosts(response.data); // Estrutura condicional, se isMounted for true então executa setPosts()
			} catch (error) {
				console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
				navigate(path.LOGIN_URL, { state: { from: location }, replace: true });
			}
		};

		getPosts();

		// Cleanup function é utilizada para parar ou desfazer o processo definido no corpo do useEffect antes do return
		return () => {
			isMounted = false;
			isMounted && controller.abort();
			// A explicação do erro está no link abaixo e está relacionado com ao StrictMode do React que monta e desmonta os componentes 2 vezes
			// https://stackoverflow.com/questions/73140563/axios-throwing-cancelederror-with-abort-controller-in-react
			// controller.abort(); // AXIOS 'ERR_CANCELED'
			// Estamos cancelando qualquer requisição após o refresh da página
		};
	}, []);

	// style={{ backgroundColor: '#fe9a2e' }}
	return (
		<div className='col-12 col-xl-10'>
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
								Eventos
							</Link>
						</li>
					</nav>
				</div>
			</div>
			<br />
			{posts?.length ? (
				<ul className='row list-unstyled mt-xl-5'>
					{posts.map((post) => (
						<li key={post._id} className='col-12 col-md-6 col-xxl-4'>
							<Card data={post} />
							<br />
						</li>
					))}
				</ul>
			) : (
				<p>{message}</p>
			)}
		</div>
	);
};

export default Postings;
