import { useEffect, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const Profile = () => {
	const { auth } = useAuth();
	const [active, setActive] = useState(false);
	const [currentUser, setCurrentUser] = useState(auth.userData);
	const imagePath = `${path.BASE_URL}${path.PUBLIC_URL}/${auth.userData.avatar}`;

	const handleSubmit = () => {};

	useEffect(() => {
		console.log(auth);
	}, []);

	return (
		<div className='col-12 col-xl-10'>
			<div className='row mt-5'>
				<h1 className='text-center display-4 pt-4 mb-3'>Meu Perfil</h1>

				<div className='row d-flex flex-column flex-lg-row px-5'>
					<div className='w-50 w-lg-50'>
						<form onSubmit={handleSubmit} className=''>
							<div className='col-12 my-2'>
								<label htmlFor='firstName' className='form-label'>
									Nome:
								</label>
								<input
									type='text'
									className='form-control text-capitalize'
									value={currentUser.firstName}
									readOnly
								/>
							</div>

							<div className='col-12 my-2'>
								<label htmlFor='lastName' className='form-label'>
									Sobrenome:
								</label>
								<input
									type='text'
									className='form-control text-capitalize'
									value={currentUser.lastName}
									readOnly
								/>
							</div>

							<div className='col-12 my-2'>
								<label htmlFor='email' className='form-label'>
									E-mail:
								</label>
								<input
									type='email'
									className='form-control text-lowercase'
									value={currentUser.email}
									readOnly
								/>
							</div>
						</form>
					</div>

					<div className='w-50'>
						<form onSubmit={handleSubmit} className=''>
							<fieldset className='row'>
								<div className='col-12 my-2'>
									<label htmlFor='avatar' className='form-label'>
										Avatar:
									</label>
									<input type='file' className='form-control' />
								</div>
								<div className='d-flex justify-content-center'>
									<img
										src={imagePath}
										alt=''
										className='bg-dark w-50'
										style={{ width: '100%', height: '100%' }}
									/>
								</div>
							</fieldset>

							<div className='my-2'>
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
					</div>

					<div className='w-50'>
						<form onSubmit={handleSubmit} className=''>
							<fieldset className='row'>
								<div className='col-12 my-2'>
									<label htmlFor='password' className='form-label'>
										Senha Atual:
									</label>
									<input type='password' className='form-control' />
								</div>

								<div className='col-12 my-2'>
									<label htmlFor='email' className='form-label'>
										Nova Senha:
									</label>
									<input type='password' className='form-control' />
								</div>

								<div className='col-12 my-2'>
									<label htmlFor='email' className='form-label'>
										Confirmar Nova Senha:
									</label>
									<input type='password' className='form-control' />
								</div>
							</fieldset>

							<div className='my-2'>
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
				</div>

				<section className='row px-5'>
					<div className='d-flex my-2 gap-3 justify-content-end'>
						<button
							className='btn btn-secondary'
							style={{ backgroundColor: '#fe9a2e', border: 'none' }}
							type='submit'
							disabled={false ? true : false}
						>
							Alterar Dados
						</button>
						<button
							className='btn btn-danger'
							style={{ border: 'none' }}
							type='submit'
							disabled={false ? true : false}
						>
							Exluir Conta
						</button>
					</div>
				</section>

				<section className='row px-5 text-center my-2'>
					<p>Mensagens em caso de Erro</p>
					{/* <p ref={errorRef} className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
								&nbsp;{errorMsg}
							</p> */}
				</section>
			</div>
		</div>
	);
};

export default Profile;
