import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import logo from '../public/map-logo-grad.svg';

import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const emailRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const from = location.state?.from?.pathname || '/feed';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		emailRef.current.focus(); // Por o foco no input de e-mail
	}, []);

	useEffect(() => {
		setErrorMsg(''); // Limpar o erro sempre que houver alguma alteração em "email" e "password"
	}, [email, password]);

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do formulário ao recarregar a página

		try {
			const resLogin = await apiPrivate.post(path.LOGIN_URL, JSON.stringify({ email, password }));
			const resGetUsers = await apiPrivate.get(path.USER_URL);
			const userData = resGetUsers?.data?.find((user) => user.email === email);
			const accessToken = resLogin?.data?.Token;
			// console.log(resLogin?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			// console.log(resGetUsers?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			if (JSON.parse(localStorage.getItem('persist'))) {
				localStorage.setItem('refresh', userData.refreshToken);
			}
			setAuth({ userData, accessToken });
			setEmail('');
			setPassword('');
			navigate(from, { state: { from: location }, replace: true });
		} catch (error) {
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 400) {
				setErrorMsg('E-mail e senha são obrigatórios!');
			} else if (error.response?.status === 401) {
				setErrorMsg('Email ou senha inválidos!');
			} else {
				setErrorMsg('Algo deu errado!');
			}
		}
	};

	const togglePersist = () => {
		setPersist((previous) => !previous);
	};

	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<section className='container-fluid'>
			<div className='row'>
				<div className={`grassBG col-12 col-lg-7 vh-100 px-0 text-white`}>
					<div className={`dogsBG d-flex flex-column justify-content-center px-4 h-100`}>
						<div className={`d-flex flex-column justify-content-center h-100 p-5`}>
							<h1 className='display-font display-5 fw-normal'>
								Adote um pet ou encontre um companheiro para o seu!
							</h1>
							<p className='lead fs-5 py-4'>
								Somos uma rede social voltada para a socialização de pets e seus donos. Junte-se a nós e
								faça parte de nossa calorosa comunidade!
							</p>
							<Link className='btn btn-outline-light btn-lg' to='/register'>
								Faça parte
							</Link>
						</div>
					</div>
				</div>
				<div className='col-12 col-lg-5 vh-100 px-4'>
					<div className='d-flex flex-column justify-content-center h-100'>
						<img
							src={logo}
							alt='Meu Amigo PET'
							width='250'
							style={{ paddingBottom: '30px', paddingTop: '30px', margin: '0 auto' }}
						/>
						<form onSubmit={handleSubmit}>
							<div className='px-2 mb-3'>
								<label className='form-label' htmlFor='email'>
									E-mail:
								</label>
								<input
									className='form-control'
									placeholder='emailbacana@mail.com'
									type='email'
									id='email'
									autoComplete='off'
									ref={emailRef}
									value={email} // Torna o valor do input controlável e assim podemos limpar o campo quando necessário
									required
									onChange={(event) => setEmail(event.target.value.toLowerCase())}
								/>
							</div>
							<div className='px-2 mb-3'>
								<label className='form-label' htmlFor='password'>
									Senha:
								</label>
								<input
									className='form-control'
									placeholder='**********'
									type='password'
									id='password'
									value={password}
									required
									onChange={(event) => setPassword(event.target.value)}
								/>
							</div>
							<div className='px-2 mb-3'>
								<input
									className='me-2'
									type='checkbox'
									id='persist'
									onChange={togglePersist}
									checked={persist}
								/>
								<label htmlFor='persist'>Manter-se conectado</label>
							</div>
							<div className='px-2 mb-3 d-flex flex-column gap-4'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fd7e14', border: 'none' }}
									type='submit'
									disabled={!email || !password ? true : false}
								>
									Entrar
								</button>
								<span className='text-center'>
									<Link className='linkStyle' to='/recover'>
										Esqueci minha senha
									</Link>
								</span>
								<span className='text-center'>
									Ainda não possui uma conta?{' '}
									<Link className='linkStyle' to='/register'>
										Cadastre-se
									</Link>
								</span>
							</div>
						</form>
						<section className='text-center'>
							<p className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>&nbsp;{errorMsg}</p>
						</section>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
