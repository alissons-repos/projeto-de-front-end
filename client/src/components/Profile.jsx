import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Profile = () => {
	const { auth } = useAuth();
	const errorRef = useRef();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [file, setFile] = useState('');

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [newPassword, setNewPassword] = useState('');
	const [validNewPassword, setValidNewPassword] = useState(false);
	const [newPasswordFocus, setNewPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	function handleChange(event) {
		console.log(event.target.files);
		setFile(URL.createObjectURL(e.target.files[0]));
	}

	const [errorMsg, setErrorMsg] = useState('');
	const [currentUser, setCurrentUser] = useState(auth.userData);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(password === 'test2'); // FIXME: comparar com a senha atual do usuário
	}, [password]);

	useEffect(() => {
		setValidNewPassword(PASSWORD_REGEX.test(newPassword));
		setValidMatch(newPassword === matchPassword);
	}, [newPassword, matchPassword]);

	useEffect(() => {
		setErrorMsg(''); // Limpar o erro sempre que houver alguma alteração nos estados abaixo
	}, [email, password, newPassword, matchPassword]);

	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	const handleDataSubmit = (event) => {
		event.preventDefault();
	};
	const handlePassSubmit = (event) => {
		event.preventDefault();
	};
	const handleFileSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className='col-12 col-xl-10 '>
			<div className='row mt-5 px-4'>
				<h1 className='text-center display-4 mt-5 mb-3'>Meu Perfil</h1>
				<div className='d-flex flex-column flex-lg-row align-items-md-start'>
					<div className='px-3' style={{ width: '100%' }}>
						<form onSubmit={handleDataSubmit}>
							<div className='my-2'>
								<label htmlFor='firstName' className='form-label'>
									Nome:
								</label>
								<input
									className={
										!firstName
											? 'form-control text-capitalize'
											: 'form-control text-capitalize input-valid'
									}
									placeholder={currentUser.firstName}
									type='text'
									id='firstName'
									value={firstName}
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</div>
							<div className='my-2'>
								<label htmlFor='lastName' className='form-label'>
									Sobrenome:
								</label>
								<input
									className={
										!lastName
											? 'form-control text-capitalize'
											: 'form-control text-capitalize input-valid'
									}
									placeholder={currentUser.lastName}
									type='text'
									id='lastName'
									value={lastName}
									onChange={(event) => setLastName(event.target.value)}
								/>
							</div>
							<div className='my-2'>
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
									placeholder={currentUser.email}
									type='email'
									id='email'
									value={email}
									autoComplete='off'
									onChange={(event) => setEmail(event.target.value)}
									onFocus={() => setEmailFocus(true)}
									onBlur={() => setEmailFocus(false)}
								/>
								<div className={emailFocus && email && !validEmail ? 'p-2 instructions' : 'offscreen'}>
									<FaInfoCircle />
									Deve ser um e-mail válido.
								</div>
							</div>
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='reset'
									disabled={!validEmail && !firstName && !lastName ? true : false}
								>
									Alterar Dados
								</button>
							</div>
						</form>

						<form onSubmit={handlePassSubmit}>
							<div className='my-2'>
								<label htmlFor='currentpassword' className='form-label'>
									Senha Atual:
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
									id='currentpassword'
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									onFocus={() => setPasswordFocus(true)}
									onBlur={() => setPasswordFocus(false)}
									required
								/>
								<div className={passwordFocus && !validPassword ? 'p-2 instructions' : 'offscreen'}>
									<FaInfoCircle />A senha informada não confere com a senha atual!
								</div>
							</div>
							<div className='my-2'>
								<label htmlFor='newpassword' className='form-label'>
									Nova Senha:
									<FaCheck className={validNewPassword ? 'ms-2 valid' : 'hide'} />
									<FaTimes className={validNewPassword || !newPassword ? 'hide' : 'ms-2 invalid'} />
								</label>
								<input
									className={
										!newPassword
											? 'form-control'
											: validNewPassword
											? 'form-control input-valid'
											: 'form-control input-invalid'
									}
									placeholder='**********'
									type='password'
									id='newpassword'
									value={newPassword}
									onChange={(event) => setNewPassword(event.target.value)}
									onFocus={() => setNewPasswordFocus(true)}
									onBlur={() => setNewPasswordFocus(false)}
									required
								/>
								<div
									className={newPasswordFocus && !validNewPassword ? 'p-2 instructions' : 'offscreen'}
								>
									<FaInfoCircle />
									Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma minúscula, um
									número e um símbolo especial. <br />
									<FaInfoCircle />
									Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
								</div>
							</div>
							<div className='my-2'>
								<label htmlFor='match' className='form-label'>
									Confirmar Nova Senha:
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
									value={matchPassword}
									onChange={(event) => setMatchPassword(event.target.value)}
									onFocus={() => setMatchFocus(true)}
									onBlur={() => setMatchFocus(false)}
									required
								/>
								<div className={matchFocus && !validMatch ? 'p-2 instructions' : 'offscreen'}>
									<FaInfoCircle />A confirmação deve coincidir com o campo nova senha.
								</div>
							</div>
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='submit'
									disabled={!validPassword || !validNewPassword || !validMatch ? true : false}
								>
									Alterar Senha
								</button>
							</div>
						</form>
					</div>

					<div className='px-3' style={{ width: '100%' }}>
						<form onSubmit={handleFileSubmit}>
							<div className='my-2'>
								<label htmlFor='avatar' className='form-label'>
									Avatar:
								</label>
								<input type='file' className='form-control' />
							</div>
							<div className='text-center'>
								<img src={imagePath} alt='' className='preview' />
							</div>
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='submit'
									// disabled={!validFile || !file ? true : false}
								>
									Alterar Foto de Perfil
								</button>
							</div>
						</form>
						<div className='my-2 d-flex justify-content-end'>
							<button className='btn btn-danger' style={{ border: 'none' }} type='button'>
								Exluir Conta
							</button>
						</div>
					</div>
				</div>
			</div>

			<section className='row px-5 text-center my-2'>
				{/* <p>Mensagens em caso de Erro</p> */}
				<p ref={errorRef} className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
					&nbsp;{errorMsg}
				</p>
			</section>
		</div>
	);
};

export default Profile;
