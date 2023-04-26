import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../apis/axios';
import path from '../apis/endpoints';

const USER_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PWD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Register = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const userRef = useRef(); // Necessário para por o foco no campo e-mail quando a tela recarregar
	const errRef = useRef(); // Necessário para por o foco em erros para auxiliar na acessibilidade

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus(); // Por o foco no input de email
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg(''); // Limpar o erro sempre que houver alguma alteração em "user" e "pwd" e "matchPwd"
	}, [user, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault(); // Previne o comportamento padrão do formulário ao recarregar a página
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('E-mail ou senha inválido!');
			return;
		}
		try {
			const response = await api.post(path.REGISTER_URL, JSON.stringify({ user, pwd }), {
				withCredentials: true,
			});
			console.log(response?.data); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(response?.accessToken); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			console.log(JSON.stringify(response)); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			setSuccess(true);
			setUser('');
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
				<section>
					<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
						{errMsg}
					</p>
					<h1>Cadastre-se</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor='username'>
							E-mail:
							<FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
							<FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
						</label>
						<input
							type='text'
							id='username'
							ref={userRef}
							autoComplete='off'
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Deve ser um e-mail válido.
							{/* TODO: MELHORAR A DESCRIÇÃO DE ERRO DO E-MAIL */}
						</p>

						<label htmlFor='password'>
							Senha:
							<FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
							<FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
						</label>
						<input
							type='password'
							id='password'
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />A senha deve conter 8 ou mais caracteres, pelo menos
							uma letra maiúscula, uma minúscula, um número e um símbolo especial.
							<br />
							Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
						</p>

						<label htmlFor='confirm_pwd'>
							Confirmar Senha:
							<FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
							<FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
						</label>
						<input
							type='password'
							id='confirm_pwd'
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
							<FontAwesomeIcon icon={faInfoCircle} />A confirmação deve coincidir com o campo senha.
						</p>

						<button disabled={!validName || !validPwd || !validMatch ? true : false}>Registre-se</button>
					</form>
					<p>
						Já possui um cadastro?
						<br />
						<span className='line'>
							<Link to='/login'>Entrar</Link>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Register;
