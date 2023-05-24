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
	const from = location.state?.from?.pathname || '/feed';

	const emailRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const errorRef = useRef(); // Necessário para por o foco em erros para auxiliar na acessibilidade

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false); // Necessário para mandar uma mensagem de sucesso e um placeholder de carregamento
	// Devemos em seguida redirecionar o usuário para "dentro da aplicação"

	useEffect(() => {
		emailRef.current.focus(); // Por o foco no input de e-mail
	}, []);

	useEffect(() => {
		setErrorMsg(''); // Limpar o erro sempre que houver alguma alteração em "email" e "password"
	}, [email, password]);

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do formulário ao recarregar a página

		try {
			const response = await apiPrivate.post(path.LOGIN_URL, JSON.stringify({ email, password }));
			console.log(response?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			const accessToken = response?.data?.Token;
			setAuth({ email, accessToken });
			setEmail('');
			setPassword('');
			setSuccess(true);
			navigate(from, { state: { from: location }, replace: true });
			// setTimeout(navigate(from, { replace: true }), 2000); // FIXME:
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
			errorRef.current.focus(); // Por o foco na mensagen de erro
		}
	};

	const togglePersist = () => {
		setPersist((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<>
			{success ? (
				<section>
					{/* Colocar um placeholder de carregamento aqui */}
					<h1>Login efetuado com sucesso!</h1>
				</section>
			) : (
				<section className='container-fluid'>
					{/* Página inteira */}
					<div className='row'>
						{/* Direita */}
						<div className={`grassBG col-12 col-lg-7 vh-100 px-0 text-white`}>
							<div className={`dogsBG d-flex flex-column justify-content-center px-4 h-100`}>
								<div className={`d-flex flex-column justify-content-center h-100 p-5`}>
									<h1 className='display-font display-5 fw-normal'>
										Arranje um companheiro para o seu pet!
									</h1>
									<p className='lead fs-5 py-4'>
										{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt sed quisquam
										voluptates aliquam quas nostrum, ipsa minus in voluptatum animi id quos esse quia
										voluptate beatae. Cupiditate, laborum dolorum? */}
										Somos uma rede social voltada para a socialização de pets e seus donos. Junte-se
										a nós e faça você também parte de nossa calorosa comunidade!
									</p>
									<Link className='btn btn-outline-light btn-lg' to='/register'>
										Faça parte
									</Link>
								</div>
							</div>
						</div>
						{/* Esquerda */}
						<div className='col-12 col-lg-5 vh-100 px-4'>
							<div className='d-flex flex-column justify-content-center h-100'>
								{/* <h1 className='text-center display-2'>Meu Amigo PET</h1> */}
								<img
									src={logo}
									alt='Meu Amigo PET'
									width='250'
									style={{ paddingBottom: '30px', margin: '0 auto' }}
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
											onChange={(event) => setEmail(event.target.value)}
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
										<div className='persistCheck'>
											<input
												className='me-2'
												type='checkbox'
												id='persist'
												onChange={togglePersist}
												checked={persist}
											/>
											<label htmlFor='persist'>Manter-se conectado</label>
										</div>
									</div>
									<div className='px-2 mb-3 d-flex flex-column gap-4'>
										<button
											className='btn btn-secondary'
											style={{ backgroundColor: '#fe9a2e', border: 'none' }}
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
									<p ref={errorRef} className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
										&nbsp;{errorMsg}
									</p>
								</section>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Login;
