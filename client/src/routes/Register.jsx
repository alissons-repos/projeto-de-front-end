import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

import api from '../apis/axios';
import path from '../apis/endpoints';

import style from './Register.module.css';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Register = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const emailRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const errRef = useRef(); // Necessário para por o foco em erros para auxiliar na acessibilidade

	const [firstName, setFirstName] = useState('');
	const [firstNameFocus, setFirstNameFocus] = useState(false);

	const [lastName, setLastName] = useState('');
	const [lastNameFocus, setLastNameFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
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
		setErrMsg(''); // Limpar o erro sempre que houver alguma alteração em "email" e "password" e "matchPassword"
	}, [email, password, matchPassword]);

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do browser de recarregar a página ao enviar o formulário
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PASSWORD_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg('E-mail ou senha inválido!');
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
		} catch (err) {
			if (!err?.response) {
				setErrMsg('Sem resposta do servidor!');
			} else if (err.response?.status === 409) {
				setErrMsg('O e-mail informado já está em uso, tente outro!');
			} else {
				setErrMsg('Algo deu errado!');
			}
			errRef.current.focus(); // Por o foco na mensagen de erro
		}
	};

	return (
		<>
			{success ? (
				<section>
					{/* Colocar um placeholder de carregamento aqui */}
					<h1>Cadastro realizado com sucesso!</h1>
					{navigate('/login')};
				</section>
			) : (
				<section className='container'>
					<h1 className='text-center'>Cadastre-se</h1>
					<form onSubmit={handleSubmit} className='row'>
						<div className='col-12 my-2'>
							<label htmlFor='email' className='form-label'>
								E-mail:
								<FaCheck className={validEmail ? 'valid' : 'hide'} />
								<FaTimes className={validEmail || !email ? 'hide' : 'invalid'} />
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
							{/* <div className='form-text' style={{ color: '#909090' }}>
								Não compartilharemos seu email com ninguém
							</div> */}
							<p className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
								<FaInfoCircle />
								Deve ser um e-mail válido.
								{/* TODO: MELHORAR A DESCRIÇÃO DE ERRO DO E-MAIL */}
							</p>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='password' className='form-label'>
								Senha:
								<FaCheck className={validPassword ? 'valid' : 'hide'} />
								<FaTimes className={validPassword || !password ? 'hide' : 'invalid'} />
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
							{/* <div className='form-text' style={{ color: '#909090' }}>
								A senha deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma minúscula,
								um número e um símbolo especial.
								<br /> Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
							</div> */}
							<p className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
								<FaInfoCircle />A senha deve conter 8 ou mais caracteres, pelo menos uma letra
								maiúscula, uma minúscula, um número e um símbolo especial. <br />
								<span> Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /</span>
							</p>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='match' className='form-label'>
								Confirmar Senha:
								<FaCheck className={validMatch && matchPassword ? 'valid' : 'hide'} />
								<FaTimes className={validMatch || !matchPassword ? 'hide' : 'invalid'} />
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
							<p className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
								<FaInfoCircle />A confirmação deve coincidir com o campo senha.
							</p>
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
								onFocus={() => setFirstNameFocus(true)}
								onBlur={() => setFirstNameFocus(false)}
							/>
							<div className='form-text' style={{ color: '#909090' }} id='passwordHelp'>
								Pode utilizar também nomes compostos
							</div>
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
								onFocus={() => setLastNameFocus(true)}
								onBlur={() => setLastNameFocus(false)}
							/>
						</div>

						<div className='my-3 d-flex flex-column'>
							<button
								className='btn btn-secondary'
								style={{ backgroundColor: '#ffbe5c', border: 'none' }}
								type='submit'
								disabled={!validEmail || !validPassword || !validMatch ? true : false}
							>
								Registre-se
							</button>
						</div>
					</form>
					<section>
						<p className='text-center'>
							Já possui um cadastro? <Link to='/login'>Entrar</Link>
						</p>
						<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
							{errMsg}
						</p>
					</section>
				</section>
			)}
		</>
	);
};

export default Register;
