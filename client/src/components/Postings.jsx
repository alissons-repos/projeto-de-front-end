import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Card from './Card';
import AddPostButton from './AddPostButton';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Postings = ({ message, usersPosts, isLarge }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const apiPrivate = useApiPrivate();
	const filterMessage = 'Você não possui nenhuma postagem com essa categoria!';

	const [posts, setPosts] = useState([]);
	const [postsVariable, setPostsVariable] = useState([]);

	const [active, setActive] = useState([0, 0, 0]);
	const [filtered, setFiltered] = useState(false);

	const filterPosts = (filter) => {
		const postsCopy = [...posts];
		let newList = [];

		// const checkActive = () => {
		// 	if (active.filter((state) => !!state === true).length === 0) {
		// 		// setFiltered(true); // aqui filtra imediatamente
		// 		if (filtered) {
		// 			setFiltered(false);
		// 		} else {
		// 			setFiltered(true);
		// 		}
		// 		console.log('1º clique');
		// 	}

		// 	if (active.filter((state) => !!state === true).length !== 0) {
		// 		// setFiltered(false); // aqui mantem o estado para os outros filtros
		// 		if (filtered) {
		// 			setFiltered(true);
		// 		} else {
		// 			setFiltered(false);
		// 		}
		// 		console.log('2º clique');
		// 	}
		// };

		switch (filter) {
			case 'adoção':
				newList = postsCopy.filter((post) => post.category === 'adoção');
				setPostsVariable(newList);
				// checkActive();
				setActive([!active[0], 0, 0]);
				setFiltered(!filtered);
				break;
			case 'cruzamento':
				newList = postsCopy.filter((post) => post.category === 'cruzamento');
				setPostsVariable(newList);
				// checkActive();
				setActive([0, !active[1], 0]);
				setFiltered(!filtered);
				break;
			case 'evento':
				newList = postsCopy.filter((post) => post.category === 'evento');
				setPostsVariable(newList);
				// checkActive();
				setActive([0, 0, !active[2]]);
				setFiltered(!filtered);
				break;
		}
	};

	useEffect(() => {
		let isMounted = true; // A variável isMounted está sendo utilizada como um indicador, de modo a permitir ou negar a definição do estado dos posts dependendo se a requisição está aberta ou não não. Estamos fazendo  uma requisição e logo em seguida limpando suas alterações. ???
		const controller = new AbortController();

		const getPosts = async () => {
			try {
				const response = await apiPrivate.get(`${usersPosts ? path.AUTH_POSTS_URL : path.POSTS_URL}`, {
					signal: controller.signal,
					// Esse propriedade permite que possamos cancelar a requisição utilizando métodos da classe AbortController()
				});
				// console.log(response.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
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

	return (
		<div className='col-12 col-xl-9 me-auto'>
			<div className={isLarge ? 'col-12 col-xl-9 position-fixed index' : 'col-12 col-xl-9 position-static'}>
				<div className='row' style={{ backgroundColor: '#fd7e14' }}>
					<nav className='d-flex justify-content-center gap-4 gap-md-5 list-unstyled p-2'>
						<li className='fs-4'>
							<Link
								className={active[0] ? 'bg-white' : 'navlinkStyle'}
								to='#'
								onClick={() => filterPosts('adoção')}
							>
								Adoção
							</Link>
						</li>
						<li className='fs-4'>
							<Link
								className={active[1] ? 'bg-white' : 'navlinkStyle'}
								to='#'
								onClick={() => filterPosts('cruzamento')}
							>
								Cruzamento
							</Link>
						</li>
						<li className='fs-4'>
							<Link
								className={active[2] ? 'bg-white' : 'navlinkStyle'}
								to='#'
								onClick={() => filterPosts('evento')}
							>
								Eventos
							</Link>
						</li>
					</nav>
				</div>
			</div>
			<br />
			{posts ? (
				filtered ? (
					postsVariable.length !== 0 ? (
						<ul className='row list-unstyled mt-xl-5'>
							{postsVariable.map((post) => (
								<li className='col-12 col-md-6 col-xxl-4' key={post._id}>
									<Card data={post} myposts={usersPosts} />
									<br />
								</li>
							))}
							{usersPosts ? (
								<li className='col-12 col-md-6 col-xxl-4'>
									<AddPostButton />
									<br />
								</li>
							) : null}
						</ul>
					) : (
						<div className='d-flex justify-content-center align-items-center h-100 m-5 py-5'>
							<p className='m-5 py-5'>{filterMessage}</p>
						</div>
					)
				) : (
					<ul className='row list-unstyled mt-xl-5'>
						{posts.map((post) => (
							<li className='col-12 col-md-6 col-xxl-4' key={post._id}>
								<Card data={post} myposts={usersPosts} />
								<br />
							</li>
						))}
						{usersPosts ? (
							<li className='col-12 col-md-6 col-xxl-4'>
								<AddPostButton />
								<br />
							</li>
						) : null}
					</ul>
				)
			) : (
				<div className='d-flex justify-content-center align-items-center h-100 m-5 py-5'>
					<p className='m-5 py-5'>{message}</p>
				</div>
			)}
		</div>
	);
};

export default Postings;
