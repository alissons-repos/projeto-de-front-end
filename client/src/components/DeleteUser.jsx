import { useState } from 'react';

import ModalDelete from './ModalDelete';

const DeleteUser = () => {
	const [confirmation, setConfirmation] = useState(false);

	const closeModal = () => {
		setConfirmation(false);
	};

	const handleClick = () => {
		setConfirmation(true);
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
						onClick={handleClick}
					>
						Exluir Conta
					</button>
				</div>
				{confirmation && (
					<div id='modalPost'>
						<div className='my-fade' onClick={closeModal}></div>
						<ModalDelete />
					</div>
				)}
			</div>
		</div>
	);
};

export default DeleteUser;
