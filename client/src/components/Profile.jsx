import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Profile = () => {
	const { auth } = useAuth();

	const [active, setActive] = useState(false);

	const [firstName, setFirstName] = useState(auth.userData.firstName);
	const [lastName, setLastName] = useState(auth.userData.lastName);

	const [email, setEmail] = useState(auth.userData.email);
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState('');
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [currentUser, setCurrentUser] = useState(auth.userData);

	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	// const handleDataSubmit = (event) => {
	// 	event.preventDefault();
	// };

	useEffect(() => {
		// console.log(active);
	}, [active]);

	return (
		<div className='col-12 col-xl-10 '>
			<div className='row mt-5 px-4'>
				<h1 className='text-center display-4 mt-5 mb-3'>Meu Perfil</h1>
				<div className='d-flex flex-column flex-lg-row align-items-md-start'>
					<div className='px-3' style={{ width: '100%' }}>
						<form>
							<div className='my-2'>
								<label htmlFor='firstName' className='form-label'>
									Nome:
								</label>
								<input
									className='form-control text-capitalize'
									placeholder={currentUser.firstName}
									type='text'
									id='firstName'
									onChange={(event) => setFirstName(event.target.value)}
									value={firstName}
									disabled={!active}
									required
								/>
							</div>
							<div className='my-2'>
								<label htmlFor='lastName' className='form-label'>
									Sobrenome:
								</label>
								<input
									type='text'
									className='form-control text-capitalize'
									value={lastName}
									onChange={(event) => setLastName(event.target.value)}
									readOnly={!active ? true : false}
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
							</div>
							<div className='my-2 d-flex justify-content-end gap-2'>
								<button
									className={active ? 'btn btn-primary' : 'btn btn-outline-primary'}
									// style={{ border: 'none' }}
									type='button'
									onClick={() => setActive(!active)}
								>
									Habilitar Formulário
								</button>

								<button
									className='btn btn-outline-success'
									style={{}}
									type='reset'
									// onClick={}
									disabled={!active}
								>
									Enviar Formulário
								</button>
							</div>
						</form>

						<form>
							<div className='my-2'>
								<label htmlFor='currentpassword' className='form-label'>
									Nova Senha:
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
							<div className='my-2'>
								<label htmlFor='newpassword' className='form-label'>
									Nova Senha:
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
									id='newpassword'
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
							<div className='my-2'>
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
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='submit'
									disabled={false ? true : false}
								>
									Alterar Senha
								</button>
							</div>
						</form>
					</div>

					<div className='px-3' style={{ width: '100%' }}>
						<form>
							<div className='my-2'>
								<label htmlFor='avatar' className='form-label'>
									Avatar:
								</label>
								<input type='file' className='form-control' />
							</div>
							<div className='text-center'>
								<img
									src={imagePath}
									alt=''
									className='preview'
									// style={{ width: '100%', height: '100%' }}
								/>
							</div>
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='submit'
									disabled={false ? true : false}
								>
									Alterar Foto de Perfil
								</button>
							</div>
						</form>
						<button
							className='btn btn-danger'
							style={{ border: 'none' }}
							type='button'
							onClick={() => setActive(!active)}
						>
							Exluir Conta
						</button>
					</div>
				</div>
			</div>

			<section className='row px-5 text-center my-2'>
				<p>Mensagens em caso de Erro</p>
				{/* <p ref={errorRef} className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
								&nbsp;{errorMsg}
							</p> */}
			</section>
		</div>
	);
};

export default Profile;
