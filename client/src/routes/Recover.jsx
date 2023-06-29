import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

import api from '../apis/axios';
import path from '../apis/endpoints';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const UserData = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');
	const [userIdFocus, setUserIdFocus] = useState(false);

	const [newPassword, setNewPassword] = useState('');
	const [validNewPassword, setValidNewPassword] = useState(false);
	const [newPasswordFocus, setNewPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		setValidNewPassword(PASSWORD_REGEX.test(newPassword));
		setValidMatch(newPassword === matchPassword);
	}, [newPassword, matchPassword]);

	useEffect(() => {
		setErrorMsg('');
	}, [email, userId, newPassword, matchPassword]);

	const handlePassSubmit = async (event) => {
		event.preventDefault();
		try {
			await api.patch(path.RECOVER_URL, JSON.stringify({ email, userId, newPassword }));
			setSuccessMsg('Sua senha foi alterada com sucesso!');
			setEmail('');
			setUserId('');
			setNewPassword('');
			setMatchPassword('');
			setTimeout(() => {
				setSuccessMsg('');
				navigate('/login');
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
		}
	};

	return (
		<section className='container vh-100 d-flex flex-column justify-content-center'>
			<section className='row'>
				<h1 className='text-center display-3 p-3 m-0'>Recuperar Senha</h1>
			</section>
			<form onSubmit={handlePassSubmit} className='row'>
				<div className='my-2'>
					<label htmlFor='email' className='form-label'>
						E-mail:
					</label>
					<input
						className='form-control'
						placeholder='fulano123@email.com'
						type='email'
						id='email'
						value={email}
						autoComplete='off'
						onChange={(event) => setEmail(event.target.value)}
						required
					/>
					<div className='form-text'>Informe o e-mail cadastrado em sua conta</div>
				</div>
				<div className='my-2'>
					<label htmlFor='identification' className='form-label'>
						Identificador:
					</label>
					<input
						className='form-control'
						placeholder='6470b901c8f4b3d7d6...'
						type='text'
						id='identification'
						value={userId}
						autoComplete='off'
						onChange={(event) => setUserId(event.target.value)}
						onFocus={() => setUserIdFocus(true)}
						onBlur={() => setUserIdFocus(false)}
						required
					/>
					<div className={userIdFocus ? 'p-2 instructions' : 'offscreen'}>
						<FaInfoCircle /> Informe o ID da sua conta para confirmarmos sua identidade. <br />
						<FaInfoCircle /> O ID deve conter 24 caracteres alfanuméricos.
					</div>
					<div className='form-text'>
						Caso não saiba o ID da sua conta, entre em contato com meferrei@email.com
					</div>
				</div>
				<div className='col-12 col-lg-6 my-2 father'>
					<label
						htmlFor='newpassword'
						className={
							!newPassword ? 'form-label' : validNewPassword ? 'form-label valid' : 'form-label invalid'
						}
					>
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
					<div className={newPasswordFocus && !validNewPassword ? 'p-2 instructions' : 'offscreen'}>
						<FaInfoCircle /> Deve conter 8 ou mais caracteres, pelo menos uma letra maiúscula, uma
						minúscula, um número e um símbolo especial. <br />
						<FaInfoCircle /> Símbolos especiais permitidos: ? ! @ # $ % & * , . ; : /
					</div>
				</div>
				<div className='col-12 col-lg-6 my-2 father'>
					<label
						htmlFor='match'
						className={
							!matchPassword ? 'form-label' : validMatch ? 'form-label valid' : 'form-label invalid'
						}
					>
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
				<div className='my-3 d-flex flex-column'>
					<button
						className='btn btn-secondary'
						style={{ backgroundColor: '#fd7e14', border: 'none' }}
						type='submit'
						disabled={!email || !userId || !validNewPassword || !validMatch ? true : false}
					>
						Alterar Minha Senha
					</button>
				</div>
			</form>
			<section className='text-center'>
				<p>
					Lembrou sua senha? <Link to='/login'>Entrar</Link>
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

export default UserData;
