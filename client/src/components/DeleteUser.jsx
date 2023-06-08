import { useState } from 'react';

import useLogout from '../hooks/useLogout';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Profile = () => {
	const logout = useLogout();
	const apiPrivate = useApiPrivate();

	const [confirmation, setConfirmation] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	const handleDelete = async () => {
		try {
			document.querySelector('#confirmButton').setAttribute('disabled', true);
			document.querySelector('#deleteButton').setAttribute('disabled', true);
			setSuccessMsg('Conta deletada com sucesso!');
			setTimeout(async () => {
				setSuccessMsg('');
				await logout();
				await apiPrivate.delete(path.AUTH_USER_URL);
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
			<div className='row pt-5 px-5 text-center'>
				<h1 className='display-4 mt-xl-5 mb-5'>Deletar Minha Conta</h1>
				<p className='py-3 m-0 fs-4'>
					Ao clicar no botão abaixo sua conta será deletada junto com todas as suas postagens.
					<br /> Essa é uma ação irreversível e seus dados não poderão ser recuperados.
				</p>
				<div className='py-2 d-flex justify-content-center'>
					<button
						className='btn btn-danger btn-lg'
						style={{ border: 'none' }}
						type='button'
						id='confirmButton'
						onClick={() => setConfirmation(true)}
					>
						Exluir Conta
					</button>
				</div>
				{confirmation && (
					<div className='my-5'>
						<p className='py-3 m-0 fs-4'>Você confirma a exclusão da sua conta?</p>
						<div className='py-2 d-flex justify-content-center'>
							<button
								className='btn btn-danger btn-lg'
								style={{ border: 'none' }}
								type='button'
								id='deleteButton'
								onClick={handleDelete}
							>
								Sim, confirmo a exclusão
							</button>
						</div>
					</div>
				)}
			</div>
			<section className='row px-5 text-center my-2'>
				{successMsg && (
					<p className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>
						{successMsg} <span className='align-middle fs-4'>&#128546;</span>
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

export default Profile;
