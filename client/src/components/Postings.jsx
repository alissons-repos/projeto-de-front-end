import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ModalPost from './ModalPost';
import Card from './Card';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Postings = ({ message, usersPosts, isLarge }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const apiPrivate = useApiPrivate();

	const [posts, setPosts] = useState([]);
	const [wasClicked, setWasClicked] = useState(false);
	const [clickedPost, setClickedPost] = useState({});

	const closeModal = () => {
		document.body.classList.remove('overflow-hidden');
		setWasClicked(false);
	};

	const handleClick = (post) => {
		document.body.classList.add('overflow-hidden');
		setClickedPost(post);
		setWasClicked(true);
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
		<>
			{wasClicked ? (
				<div id='modalPost'>
					<div className='my-fade' onClick={closeModal}></div>
					<ModalPost post={clickedPost} />
				</div>
			) : null}
			<div className='col-12 col-xl-9 me-auto'>
				<div className={isLarge ? 'col-12 col-xl-9 position-fixed index' : 'col-12 col-xl-9 position-static'}>
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
							<li className='col-12 col-md-6 col-xxl-4' key={post._id} onClick={() => handleClick(post)}>
								<Card data={post} />
								<br />
							</li>
						))}
					</ul>
				) : (
					<div className='d-flex justify-content-center align-items-center h-100 m-5 py-5'>
						<p className='m-5 py-5'>{message}</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Postings;
