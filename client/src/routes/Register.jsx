import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

import api from '../apis/axios';
import path from '../apis/endpoints';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Register = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const emailRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const errorRef = useRef(); // Necessário para por o foco em erros para auxiliar na acessibilidade

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus(); // Por o foco no input de email
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setErrorMsg(''); // Limpar o erro sempre que houver alguma alteração em "email" e "password" e "matchPassword"
	}, [email, password, matchPassword]);

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do browser de recarregar a página ao enviar o formulário
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PASSWORD_REGEX.test(password);
		if (!v1 || !v2) {
			setErrorMsg('E-mail ou senha inválido!');
			return;
		}
		try {
			const response = await api.post(path.REGISTER_URL, JSON.stringify({ email, password }), {
				withCredentials: true,
			});
			console.log(response?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(response?.accessToken); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(JSON.stringify(response)); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			setSuccess(true);
			setEmail('');
			setPassword('');
			setMatchPassword('');
			navigate(from, { replace: true });
		} catch (error) {
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 409) {
				setErrorMsg('O e-mail informado já está em uso, tente outro!');
			} else {
				setErrorMsg('Algo deu errado!');
			}
			errorRef.current.focus(); // Por o foco na mensagen de erro
		}
	};

	return (
		<div>
			{success ? (
				<section>
					{/* Colocar um placeholder de carregamento aqui */}
					<h1>Cadastro realizado com sucesso!</h1>
					{navigate('/login')};
				</section>
			) : (
				<section className='container vh-100 d-flex flex-column justify-content-center'>
					<section className='row'>
						<h1 className='text-center display-2 p-3 m-0'>Cadastre-se</h1>
					</section>
					<form onSubmit={handleSubmit} className='row'>
						<div className='col-12 my-2'>
							<label htmlFor='email' className='form-label'>
								E-mail:
								<FaCheck className={validEmail ? 'ms-2 valid' : 'hide'} />
								<FaTimes className={validEmail || !email ? 'hide' : 'ms-2 invalid'} />
							</label>
							<input
								className={
									!email
										? 'form-control'
										: validEmail
										? 'form-control input-valid'
										: 'form-control input-invalid'
								}
								placeholder='emailbacana@mail.com'
								type='email'
								id='email'
								ref={emailRef}
								autoComplete='off'
								onChange={(event) => setEmail(event.target.value)}
								value={email}
								required
								onFocus={() => setEmailFocus(true)}
								onBlur={() => setEmailFocus(false)}
							/>
							<div className={emailFocus && email && !validEmail ? 'p-2 instructions' : 'offscreen'}>
								<FaInfoCircle />
								Deve ser um e-mail válido.
							</div>
							<div className='form-text'>Não compartilharemos seu email com ninguém</div>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='password' className='form-label'>
								Senha:
								<FaCheck className={validPassword ? 'ms-2 valid' : 'hide'} />
								<FaTimes className={validPassword || !password ? 'hide' : 'ms-2 invalid'} />
							</label>
							<input
								className={
									!password
										? 'form-control'
										: validPassword
										? 'form-control input-valid'
										: 'form-control input-invalid'
								}
								placeholder='**********'
								type='password'
								id='password'
								onChange={(event) => setPassword(event.target.value)}
								value={password}
								required
								onFocus={() => setPasswordFocus(true)}
								onBlur={() => setPasswordFocus(false)}
							/>
							<div className={passwordFocus && !validPassword ? 'p-2 instructions' : 'offscreen'}>
								<FaInfoCircle />
								Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma minúscula, um
								número e um símbolo especial. <br />
								<FaInfoCircle />
								Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
							</div>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='match' className='form-label'>
								Confirmar Senha:
								<FaCheck className={validMatch && matchPassword ? 'ms-2 valid' : 'hide'} />
								<FaTimes className={validMatch || !matchPassword ? 'hide' : 'ms-2 invalid'} />
							</label>
							<input
								className={
									!matchPassword
										? 'form-control'
										: validMatch
										? 'form-control input-valid'
										: 'form-control input-invalid'
								}
								placeholder='**********'
								type='password'
								id='match'
								onChange={(event) => setMatchPassword(event.target.value)}
								value={matchPassword}
								required
								onFocus={() => setMatchFocus(true)}
								onBlur={() => setMatchFocus(false)}
							/>
							<div className={matchFocus && !validMatch ? 'p-2 instructions' : 'offscreen'}>
								<FaInfoCircle />A confirmação deve coincidir com o campo senha.
							</div>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='firstName' className='form-label'>
								Nome:
							</label>
							<input
								className={!firstName ? 'form-control' : 'form-control input-valid'}
								placeholder='Fulano Beltrano'
								type='text'
								id='firstName'
								onChange={(event) => setFirstName(event.target.value)}
								value={firstName}
								required
							/>
							<div className='form-text'>Pode utilizar também nomes compostos</div>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='lastName' className='form-label'>
								Sobrenome:
							</label>
							<input
								className={!lastName ? 'form-control' : 'form-control input-valid'}
								placeholder='Sicrano de Souza'
								type='text'
								id='lastName'
								onChange={(event) => setLastName(event.target.value)}
								value={lastName}
								required
							/>
						</div>

						<div className='my-3 d-flex flex-column'>
							<button
								className='btn btn-secondary'
								style={{ backgroundColor: '#fe9a2e', border: 'none' }}
								type='submit'
								disabled={
									!validEmail || !validPassword || !validMatch || !firstName || !lastName
										? true
										: false
								}
							>
								Registre-se
							</button>
						</div>
					</form>
					<section className='text-center'>
						<p>
							Já possui um cadastro? <Link to='/login'>Entrar</Link>
						</p>
						<p ref={errorRef} className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
							&nbsp;{errorMsg}
						</p>
					</section>
				</section>
			)}
		</div>
	);
};

export default Register;
