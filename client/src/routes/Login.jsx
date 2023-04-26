import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import api from '../api/axios';
import path from '../api/endpoints';

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef(); // Por o foco no campo usuário quando a tela recarregar
	const errRef = useRef(); // Por o foco em erros para auxiliar na acessibilidade

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	// const [success, setSuccess] = useState(false); // Esse estado só está aqui para mostrar uma mensagem de sucesso
	// Devemos em seguida redirecionar o usuário para "dentro da aplicação"

	useEffect(() => {
		userRef.current.focus(); // Por o foco no input do usuário
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
			// setSuccess(true);
			navigate(from, { replace: true });
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing E-mail or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
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
		// {success ? (
		// 	<section>
		// 		<h1>Você está logado</h1>
		// 		{/* Colocar um placeholder de carregamento aqui */}
		// 	</section>
		// ) : (
		// 	<section>A SEÇÃO ABAIXO</section>
		// )}
		<section>
			<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
				{errMsg}
			</p>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>E-mail:</label>
				<input
					type='email'
					id='email'
					autoComplete='off'
					ref={userRef}
					value={user} // Torna o valor do input controlável e assim podemos limpar o campo quando necessário
					required
					onChange={(e) => setUser(e.target.value)}
				/>
				<label htmlFor='password'>Senha:</label>
				<input type='password' id='password' value={pwd} required onChange={(e) => setPwd(e.target.value)} />
				<button type='submit'>Entrar</button>
				<div className='persistCheck'>
					<input type='checkbox' id='persist' onChange={togglePersist} checked={persist} />
					<label htmlFor='persist'>Manter-se conectado</label>
				</div>
			</form>
			<p>
				Ainda não possui uma conta?
				<br />
				<span className='line'>
					<Link to='/register'>Cadastre-se</Link>
				</span>
			</p>
		</section>
	);
};

export default Login;
