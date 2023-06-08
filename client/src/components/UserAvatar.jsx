import { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const UserAvatar = () => {
	const { setAuth } = useAuth();
	const apiPrivate = useApiPrivate();
	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_avatar.jpg`;

	const [file, setFile] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		setErrorMsg('');
	}, [file]);

	const handleFileSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await apiPrivate.patchForm(path.AUTH_USER_UPLOAD_URL, { profileImage: file });
			const userData = response?.data;
			setAuth((previous) => ({ ...previous, userData }));
			setSuccessMsg('Foto de perfil alterada com sucesso!');
			setFile(null);
			document.querySelector('#avatar').value = null;
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
				<h1 className='text-center display-4 mt-xl-5 mb-3'>Meu Avatar</h1>
				<div className='d-flex flex-column flex-lg-row align-items-center justify-content-center'>
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

							<label className='form-label'>Preview:</label>
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

export default UserAvatar;
