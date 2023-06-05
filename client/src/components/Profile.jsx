import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

import Goodbye from '../routes/Goodbye';

import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!@#$%&*,.;:/]).{8,}$/;

const Profile = () => {
	const navigate = useNavigate();
	const logout = useLogout();
	const { auth, setAuth } = useAuth();
	const apiPrivate = useApiPrivate();
	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_avatar.jpg`;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [file, setFile] = useState('');

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
		setErrorMsg(''); // Limpa o erro sempre que houver alguma alteração nos estados abaixo
		// setSuccessMsg(''); // FIXME: Não entendi o que está acontecendo, seria bom ter um timeout pra mostrar a mensagem
	}, [email, password, newPassword, matchPassword, file]);

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

	const handleFileSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await apiPrivate.patchForm(path.AUTH_USER_UPLOAD_URL, { profileImage: file });
			const userData = response?.data;
			setAuth((previous) => ({ ...previous, userData }));
			setSuccessMsg('Foto de perfil alterada com sucesso!');
			setFile(null);
			document.querySelector('#avatar').value = null;
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

	const handleDelete = async () => {
		try {
			document.querySelector('#deleteButton').setAttribute('disabled', true);
			document.querySelector('#dismissModal').setAttribute('disabled', true);
			setSuccessMsg('Conta deletada com sucesso!');
			setTimeout(async () => {
				await apiPrivate.delete(path.AUTH_USER_URL);
				navigate(path.GOODBYE_URL, { replace: true });
			}, 1000);
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
		<>
			<div
				className='modal fade'
				id='warningModal'
				tabIndex='-1'
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title fs-5'>Aviso</h1>
						</div>
						<div className='modal-body text-center'>
							<p>Você quer mesmo deletar sua conta?</p>
							<p>Essa ação é irreversível</p>
							<p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>&nbsp;{successMsg}</p>
						</div>
						<div className='modal-footer d-flex justify-content-center'>
							<button
								className='btn btn-secondary'
								style={{ border: 'none' }}
								type='button'
								id='dismissModal'
								data-bs-dismiss='modal'
							>
								Cancelar operação
							</button>
							<button
								className='btn btn-danger'
								style={{ border: 'none' }}
								type='button'
								id='deleteButton'
								onClick={handleDelete}
							>
								Sim, quero deletar minha conta!
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='col-12 col-xl-10 '>
				<div className='row mt-5 px-4'>
					<h1 className='text-center display-4 mt-xl-5 mb-3'>Meu Perfil</h1>
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
									<div
										className={
											emailFocus && email && !validEmail ? 'p-2 instructions' : 'offscreen'
										}
									>
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
										className={
											newPasswordFocus && !validNewPassword ? 'p-2 instructions' : 'offscreen'
										}
									>
										<FaInfoCircle /> Deve conter 8 ou mais caracteres, pelo menos uma letra
										maiúscula, uma minúscula, um número e um símbolo especial. <br />
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
						</div>

						<div className='px-3' style={{ width: '100%' }}>
							<form onSubmit={handleFileSubmit}>
								<div className='my-2'>
									<label htmlFor='avatar' className='form-label'>
										Avatar:
									</label>
									<input
										type='file'
										id='avatar'
										name='profileImage'
										accept='.jpg,.jpeg,.gif,image/jpeg,image/jpg,image/gif'
										className='form-control'
										onChange={(event) => setFile(event.target.files[0])}
									/>
								</div>
								<div className='text-center'>
									{file ? (
										<img
											src={URL.createObjectURL(file)}
											alt='imagem de perfil enviada pelo usuário'
											className='preview'
										/>
									) : (
										<img
											src={imagePlaceHolder}
											alt='imagem padrão reservada utilizada pelo site'
											className='preview'
										/>
									)}
								</div>
								<div className='my-2 d-flex justify-content-end'>
									<button
										className='btn btn-secondary'
										style={{ backgroundColor: '#fe9a2e', border: 'none' }}
										type='submit'
										disabled={!file ? true : false}
									>
										Alterar Foto de Perfil
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

							<div className='my-2 d-flex justify-content-end'>
								<button
									className='btn btn-danger'
									style={{ border: 'none' }}
									type='button'
									data-bs-toggle='modal'
									data-bs-target='#warningModal'
								>
									Exluir Conta
								</button>
							</div>
						</div>
					</div>
				</div>

				<section className='row px-5 text-center my-2'>
					{successMsg ? (
						<p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>&nbsp;{successMsg}</p>
					) : (
						<p className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>&nbsp;{errorMsg}</p>
					)}
					{/* {successMsg && <p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>&nbsp;{successMsg}</p>}
							{errorMsg && <p className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>&nbsp;{errorMsg}</p>} */}
				</section>
			</div>
		</>
	);
};

export default Profile;
