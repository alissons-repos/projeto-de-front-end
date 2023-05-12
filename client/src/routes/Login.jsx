import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import api from '../apis/axios';
import path from '../apis/endpoints';

import style from './Login.module.css';

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const errRef = useRef(); // Necessário para por o foco em erros para auxiliar na acessibilidade

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false); // Necessário para mandar uma mensagem de sucesso e um placeholder de carregamento
	// Devemos em seguida redirecionar o usuário para "dentro da aplicação"

	useEffect(() => {
		userRef.current.focus(); // Por o foco no input de e-mail
	}, []);

	useEffect(() => {
		setErrMsg(''); // Limpar o erro sempre que houver alguma alteração em "user" e "pwd"
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault(); // Previne o comportamento padrão do formulário ao recarregar a página

		try {
			const response = await api.post(path.LOGIN_URL, JSON.stringify({ user, pwd }), {
				withCredentials: true,
			});
			console.log(JSON.stringify(response)); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(JSON.stringify(response?.data)); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			const accessToken = response?.data?.accessToken;
			setAuth({ user, accessToken });
			setUser('');
			setPwd('');
			setSuccess(true);
			navigate(from, { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrMsg('Sem resposta do servidor!');
			} else if (err.response?.status === 400) {
				setErrMsg('Está faltando o e-mail ou a senha!');
			} else if (err.response?.status === 401) {
				setErrMsg('Não autorizado!');
			} else {
				setErrMsg('Algo deu errado!');
			}
			errRef.current.focus(); // Por o foco na mensagen de erro
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
					{navigate('/feed')};
				</section>
			) : (
				<section className='container-fluid'>
					{/* Página inteira */}
					<div className='row'>
						{/* Direita */}
						<div className='col-12 col-lg-7 vh-100 px-4 text-white' style={{ backgroundColor: '#ffbe5c' }}>
							<div className='d-flex flex-column justify-content-center h-100'>
								<p className='lead fs-1'>Arranje um companheiro para o seu Pet!</p>
								<hr className='py-4' />
								<p className='fs-5'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt sed quisquam
									voluptates aliquam quas nostrum, ipsa minus in voluptatum animi id quos esse quia
									voluptate beatae. Cupiditate, laborum dolorum?
								</p>
								<Link className='btn btn-outline-light btn-lg' to='/register'>
									Faça parte
								</Link>
							</div>
						</div>
						{/* Esquerda */}
						<div className='col-12 col-lg-5 vh-100 px-4 text-white' style={{ backgroundColor: '#f2f2f2' }}>
							<div
								className='d-flex flex-column justify-content-center h-100'
								style={{ color: '#909090' }}
							>
								<h1 className='text-center display-2' style={{ color: '#ffbe5c' }}>
									Meu Amigo PET
								</h1>
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
											ref={userRef}
											value={user} // Torna o valor do input controlável e assim podemos limpar o campo quando necessário
											required
											onChange={(e) => setUser(e.target.value)}
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
											value={pwd}
											required
											onChange={(e) => setPwd(e.target.value)}
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
											style={{ backgroundColor: '#ffbe5c', border: 'none' }}
											type='submit'
										>
											Entrar
										</button>
										<span className='text-center'>
											<Link to='/recover'>Esqueci minha senha</Link>
										</span>
										<p className='text-center'>
											Ainda não possui uma conta? <Link to='/register'>Cadastre-se</Link>
										</p>
									</div>
								</form>
								<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
									{errMsg}
								</p>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Login;
