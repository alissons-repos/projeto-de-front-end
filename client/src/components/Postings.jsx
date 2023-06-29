import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Card from './Card';
import AddPostButton from './AddPostButton';

import usePosts from '../hooks/usePosts';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Postings = ({ message, usersPosts, isLarge }) => {
	const apiPrivate = useApiPrivate();
	const { posts, setPosts } = usePosts();
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [active, setActive] = useState([0, 0, 0]);
	const [filtered, setFiltered] = useState(false);
	const [category, setCategory] = useState('');
	const filterMessage = 'Você não possui nenhuma postagem com essa categoria!';

	const filterPosts = (filter) => {
		let newList = [];
		let prevCategory = category;

		const checkActive = () => {
			if (active.filter((state) => !!state === true).length === 0) return setFiltered(true);
			if (filter === prevCategory) return setFiltered(false);
		};

		switch (filter) {
			case 'adoção':
				newList = [...posts].filter((post) => post.category === 'adoção');
				setCategory('adoção');
				setFilteredPosts(newList);
				setActive([!active[0], 0, 0]);
				break;
			case 'cruzamento':
				newList = [...posts].filter((post) => post.category === 'cruzamento');
				setCategory('cruzamento');
				setFilteredPosts(newList);
				setActive([0, !active[1], 0]);
				break;
			case 'evento':
				newList = [...posts].filter((post) => post.category === 'evento');
				setCategory('evento');
				setFilteredPosts(newList);
				setActive([0, 0, !active[2]]);
				break;
		}

		checkActive();
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
					<nav className='d-flex justify-content-center gap-2 gap-md-5 list-unstyled p-2'>
						<li className='fs-4'>
							<Link
								className={active[0] ? 'filterActive' : 'navlinkStyle'}
								to='#'
								onClick={() => filterPosts('adoção')}
							>
								Adoção
							</Link>
						</li>
						<li className='fs-4'>
							<Link
								className={active[1] ? 'filterActive' : 'navlinkStyle'}
								to='#'
								onClick={() => filterPosts('cruzamento')}
							>
								Cruzamento
							</Link>
						</li>
						<li className='fs-4'>
							<Link
								className={active[2] ? 'filterActive' : 'navlinkStyle'}
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
			{posts.length ? (
				filtered ? (
					filteredPosts.length !== 0 ? (
						<ul className='row list-unstyled mt-xl-5 d-flex align-items-center'>
							{filteredPosts.map((post) => (
								<li className='col-12 col-md-6 col-xxl-4' key={post._id}>
									<Card data={post} myposts={usersPosts} />
									<br />
								</li>
							))}
							{usersPosts && (
								<li className='col-12 col-md-6 col-xxl-4'>
									<AddPostButton />
									<br />
								</li>
							)}
						</ul>
					) : (
						<div className='d-flex flex-column align-items-center my-5 py-5'>
							<p className='my-5 text-center'>{filterMessage}</p>
							{usersPosts && (
								<div className='col-12 col-md-6 col-xxl-4'>
									<AddPostButton />
									<br />
								</div>
							)}
						</div>
					)
				) : (
					<ul className='row list-unstyled mt-xl-5 d-flex align-items-center'>
						{posts.map((post) => (
							<li className='col-12 col-md-6 col-xxl-4' key={post._id}>
								<Card data={post} myposts={usersPosts} />
								<br />
							</li>
						))}
						{usersPosts && (
							<li className='col-12 col-md-6 col-xxl-4'>
								<AddPostButton />
								<br />
							</li>
						)}
					</ul>
				)
			) : (
				<div className='d-flex flex-column align-items-center my-5 py-5'>
					<p className='my-5 text-center'>{message}</p>
					{usersPosts && (
						<div className='col-12 col-md-6 col-xxl-4'>
							<AddPostButton />
							<br />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Postings;
