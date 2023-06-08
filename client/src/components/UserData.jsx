import { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const UserData = () => {
	const { auth, setAuth } = useAuth();
	const apiPrivate = useApiPrivate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [newPassword, setNewPassword] = useState('');
	const [validNewPassword, setValidNewPassword] = useState(false);
	const [newPasswordFocus, setNewPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidNewPassword(PASSWORD_REGEX.test(newPassword));
		setValidMatch(newPassword === matchPassword);
	}, [newPassword, matchPassword]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setErrorMsg('');
	}, [email, password, newPassword, matchPassword]);

	const handleDataSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await apiPrivate.patch(path.AUTH_USER_URL, JSON.stringify({ firstName, lastName, email }));
			const userData = response?.data;
			setAuth((previous) => ({ ...previous, userData }));
			setSuccessMsg('Dados alterados com sucesso!');
			setEmail('');
			setFirstName('');
			setLastName('');
			setTimeout(() => {
				setSuccessMsg('');
			}, 5000);
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 409) {
				setErrorMsg('O e-mail informado já existe!');
			} else if (error.response?.status === 400) {
				setErrorMsg('Nenhum dado informado para ser atualizado!');
			} else {
				setErrorMsg('Algo deu errado!');
			}
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
		}
	};

	const handlePassSubmit = async (event) => {
		event.preventDefault();
		try {
			await apiPrivate.put(path.AUTH_USER_URL, JSON.stringify({ password, newPassword, matchPassword }));
			setSuccessMsg('Senha alterada com sucesso!');
			setPassword('');
			setNewPassword('');
			setMatchPassword('');
			setTimeout(() => {
				setSuccessMsg('');
			}, 5000);
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			if (!error?.response) {
				setErrorMsg('Sem resposta do servidor!');
			} else if (error.response?.status === 400) {
				setErrorMsg(`${error.response?.data?.Erro}`);
			} else {
				setErrorMsg('Algo deu errado!');
			}
			setTimeout(() => {
				setErrorMsg('');
			}, 5000);
		}
	};

	return (
		<div className='col-12 col-xl-9 me-auto'>
			<div className='row mt-5 px-4'>
				<h1 className='text-center display-4 mt-xl-5 mb-3'>Meus Dados</h1>
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
									placeholder={auth.userData.firstName}
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
									placeholder={auth.userData.lastName}
									type='text'
									id='lastName'
									value={lastName}
									onChange={(event) => setLastName(event.target.value)}
								/>
							</div>
							<div className='my-2'>
								<label htmlFor='email' className='form-label'>
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
									placeholder={auth.userData.email}
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
									type='submit'
									disabled={!validEmail && !firstName && !lastName ? true : false}
								>
									Alterar Dados
								</button>
							</div>
						</form>
					</div>
					<div className='px-3' style={{ width: '100%' }}>
						<form onSubmit={handlePassSubmit}>
							<div className='my-2'>
								<label htmlFor='currentpassword' className='form-label'>
									Senha Atual:
								</label>
								<input
									className='form-control'
									placeholder='**********'
									type='password'
									id='currentpassword'
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
							</div>
							<div className='my-2'>
								<label htmlFor='newpassword' className='form-label'>
									Nova Senha:
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
									<FaInfoCircle /> Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula,
									uma minúscula, um número e um símbolo especial. <br />
									<FaInfoCircle /> Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
								</div>
							</div>
							<div className='my-2'>
								<label htmlFor='match' className='form-label'>
									Confirmar Nova Senha:
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
									<FaInfoCircle /> A confirmação deve coincidir com o campo nova senha!
								</div>
							</div>
							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-secondary'
									style={{ backgroundColor: '#fe9a2e', border: 'none' }}
									type='submit'
									disabled={!password || !validNewPassword || !validMatch ? true : false}
								>
									Alterar Senha
								</button>
							</div>
						</form>
						<form>
							<div className='my-2'>
								<label htmlFor='identification' className='form-label'>
									ID da sua conta:
								</label>
								<input
									className='form-control'
									placeholder={auth.userData._id}
									type='text'
									id='identification'
									value={auth.userData._id}
									readOnly
								/>
							</div>
						</form>
					</div>
				</div>
			</div>

			<section className='row px-5 text-center my-2'>
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
		</div>
	);
};

export default UserData;
