import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

import { apiPrivate } from '../apis/axios';
import path from '../apis/endpoints';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Register = () => {
	const navigate = useNavigate();

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
	const [successMsg, setSuccessMsg] = useState('');

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
			await apiPrivate.post(path.REGISTER_URL, JSON.stringify({ email, password, firstName, lastName }));
			setEmail('');
			setPassword('');
			setMatchPassword('');
			setFirstName('');
			setLastName('');
			setSuccessMsg('Cadastro concluído com sucesso!');
			setTimeout(() => {
				setSuccessMsg('');
				navigate('/login');
			}, 5000);
		} catch (error) {
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 409) {
				setErrorMsg('O e-mail informado já está em uso, tente outro!');
			} else {
				setErrorMsg('Algo deu errado!');
			}
		}
	};

	return (
		<section className='container vh-100 d-flex flex-column justify-content-center'>
			<section className='row'>
				<h1 className='text-center display-2 p-3 m-0'>Cadastre-se</h1>
			</section>
			<form onSubmit={handleSubmit} className='row'>
				<div className='col-12 my-2 father'>
					<label
						htmlFor='email'
						className={!email ? 'form-label' : validEmail ? 'form-label valid' : 'form-label invalid'}
					>
						E-mail:
					</label>
					<input
						className={
							!email
								? 'form-control'
								: validEmail
								? 'form-control input-valid'
								: 'form-control input-invalid'
						}
						placeholder='fulano123@email.com'
						type='email'
						id='email'
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

				<div className='col-12 col-lg-6 my-2 father'>
					<label
						htmlFor='password'
						className={!password ? 'form-label' : validPassword ? 'form-label valid' : 'form-label invalid'}
					>
						Senha:
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
						Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um
						símbolo especial. <br />
						<FaInfoCircle />
						Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
					</div>
				</div>

				<div className='col-12 col-lg-6 my-2 father'>
					<label
						htmlFor='match'
						className={
							!matchPassword ? 'form-label' : validMatch ? 'form-label valid' : 'form-label invalid'
						}
					>
						Confirmar Senha:
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
					<label htmlFor='firstName' className={!firstName ? 'form-label' : 'form-label valid'}>
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
					<label htmlFor='lastName' className={!lastName ? 'form-label' : 'form-label valid'}>
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
							!validEmail || !validPassword || !validMatch || !firstName || !lastName ? true : false
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
				{successMsg && (
					<p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>
						{successMsg} <span className='align-middle fs-4'>&#128521;</span>
					</p>
				)}
				{errorMsg && (
					<p className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
						{errorMsg} <span className='align-middle fs-4'>&#128533;</span>
					</p>
				)}
			</section>
		</section>
	);
};

export default Register;
