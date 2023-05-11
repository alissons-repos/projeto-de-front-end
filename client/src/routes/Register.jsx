import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

import api from '../apis/axios';
import path from '../apis/endpoints';

import style from './Register.module.css';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

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

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
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
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg(''); // Limpar o erro sempre que houver alguma alteração em "email" e "pwd" e "matchPwd"
	}, [email, pwd, matchPwd]);

	const handleSubmit = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do formulário ao recarregar a página
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('E-mail ou senha inválido!');
			return;
		}
		try {
			const response = await api.post(path.REGISTER_URL, JSON.stringify({ email, pwd }), {
				withCredentials: true,
			});
			console.log(response?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(response?.accessToken); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(JSON.stringify(response)); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			setSuccess(true);
			setEmail('');
			setPwd('');
			setMatchPwd('');
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
								className='form-control'
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
							<div className='form-text' style={{ color: '#909090' }} id='emailHelp'>
								Não compartilharemos seu email com ninguém
							</div>
							<p
								id='uidnote'
								className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}
							>
								<FaInfoCircle />
								Deve ser um e-mail válido.
								{/* TODO: MELHORAR A DESCRIÇÃO DE ERRO DO E-MAIL */}
							</p>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='password' className='form-label'>
								Senha:
								<FaCheck className={validPwd ? 'valid' : 'hide'} />
								<FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
							</label>
							<input
								className='form-control'
								placeholder='**********'
								type='password'
								id='password'
								onChange={(event) => setPwd(event.target.value)}
								value={pwd}
								required
								onFocus={() => setPwdFocus(true)}
								onBlur={() => setPwdFocus(false)}
							/>
							<div className='col-12 form-text' style={{ color: '#909090' }} id='passwordHelp'>
								A senha deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma minúscula,
								um número e um símbolo especial. Símbolos especiais permitidos: ? ! @ # $ % & * , . ; :
								/
							</div>
							<p
								id='pwdnote'
								className={pwdFocus && !validPwd ? 'form-text instructions' : 'form-text offscreen'}
							>
								<FaInfoCircle />A senha deve conter 8 ou mais caracteres, pelo menos uma letra
								maiúscula, uma minúscula, um número e um símbolo especial. Símbolos especiais
								permitidos: ? ! @ # $ % & * , . ; : /
							</p>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='confirm_pwd' className='form-label'>
								Confirmar Senha:
								<FaCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
								<FaTimes className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
							</label>
							<input
								className='form-control'
								placeholder='**********'
								type='password'
								id='confirm_pwd'
								onChange={(event) => setMatchPwd(event.target.value)}
								value={matchPwd}
								required
								onFocus={() => setMatchFocus(true)}
								onBlur={() => setMatchFocus(false)}
							/>
							<p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
								<FaInfoCircle />A confirmação deve coincidir com o campo senha.
							</p>
						</div>

						<div className='col-12 col-lg-6 my-2'>
							<label htmlFor='firstName' className='form-label'>
								Nome:
							</label>
							<input
								className='form-control'
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
								className='form-control'
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
								disabled={!validEmail || !validPwd || !validMatch ? true : false}
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
