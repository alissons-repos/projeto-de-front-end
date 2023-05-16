import { useState } from 'react';

const Profile = () => {
	const user = { firstName: 'Fulano', lastName: 'Sicrano Beltrano' };
	const handleSubmit = () => {};
	return (
		<div className='col-12 col-xl-10'>
			<div className='row mt-5'>
				<h1 className='text-center display-4 pt-4 m-0'>Meu Perfil</h1>
				<form onSubmit={handleSubmit} className='row px-5'>
					<div className='my-3'>
						<div className='row my-2'>
							<label htmlFor='firstName' className='col-2 col-form-label'>
								Nome:
							</label>
							<div className='col-10'>
								<input type='text' className='form-control' value={user.firstName} disabled readOnly />
							</div>
						</div>

						<div className='row my-2'>
							<label htmlFor='lastName' className='col-2 col-form-label'>
								Sobrenome:
							</label>
							<div className='col-10'>
								<input type='text' className='form-control' value={user.lastName} readOnly />
							</div>
						</div>

						<div className='row my-2'>
							<label htmlFor='email' className='col-2 col-form-label'>
								E-mail:
							</label>
							<div className='col-10'>
								<input type='email' className='form-control' />
							</div>
						</div>

						<div className='row my-2'>
							<label htmlFor='email' className='col-2 col-form-label'>
								Avatar:
							</label>
							<div className='col-10'>
								<input type='file' className='form-control' />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;
