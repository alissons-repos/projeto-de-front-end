import { useState, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

import useAuth from '../hooks/useAuth';
import usePosts from '../hooks/usePosts';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const ModalUpdate = ({ post }) => {
	const { errorMsg, handleError, successMsg } = useAuth();
	const { updatePost, updateFilePost } = usePosts();
	const apiPrivate = useApiPrivate();

	const imagePlaceHolder = `${path.BASE_URL}${path.PUBLIC_URL}/placeholder_image.jpg`;
	const [imagePath, setImagePath] = useState(`${path.BASE_URL}${path.PUBLIC_URL}/${post?.image}`);
	const [file, setFile] = useState('');
	const [title, setTitle] = useState(post?.title);
	const [description, setDescription] = useState(post?.description);
	const [category, setCategory] = useState(post?.category);
	const [sex, setSex] = useState(post?.sex);
	const [breeds, setBreeds] = useState(post?.breeds);
	const [amount, setAmount] = useState(post?.amount);
	const [newBreed, setNewBreed] = useState('');

	useEffect(() => {
		const getCardImage = () => {
			apiPrivate.get(imagePath).catch(() => setImagePath(''));
		};
		getCardImage();
	}, []);

	useEffect(() => {
		handleError('');
	}, [file, title, description, category, sex, breeds, amount]);

	const addBreed = () => {
		const input = document.getElementById('newBreed');
		const breed = input.value.trim();

		if (breed !== '') {
			setBreeds([...breeds, breed]);
			setNewBreed('');
		}
	};

	const removeBreed = (index) => {
		const newList = [...breeds];
		newList.splice(index, 1);
		setBreeds(newList);
	};

	const handleInputFile = (event) => {
		setFile(event.target.files[0]);
		// console.log(event.target.files[0]); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
	};

	const handleFileSubmit = async (event) => {
		event.preventDefault();
		await updateFilePost(post?._id, file);
		document.querySelector('#image').value = null;
	};

	const handleDataSubmit = async (event) => {
		event.preventDefault();
		const postObject = { title, description, category, sex, breeds, amount };
		await updatePost(post?._id, postObject);
	};

	return (
		<div className='my-modal-box col-11 col-xxl-8 d-flex flex-column flex-lg-row'>
			<div className='modalImageBox position-relative'>
				<form className='position-relative' id='imageSubmit' onSubmit={handleFileSubmit}>
					<label htmlFor='image' className='d-flex justify-content-center align-items-center'>
						{file ? (
							<img
								src={URL.createObjectURL(file)}
								className='modalImage'
								alt='imagem da postagem enviada pelo usuário'
							/>
						) : imagePath ? (
							<img src={imagePath} className='modalImage' alt='imagem da postagem enviada pelo usuário' />
						) : (
							<img
								src={imagePlaceHolder}
								className='modalImage'
								alt='imagem padrão reservada pelo site'
							/>
						)}
					</label>
					<input
						type='file'
						id='image'
						name='postImage'
						accept='.jpg,.jpeg,.gif,image/jpeg,image/jpg,image/gif'
						className='hide'
						onChange={(event) => handleInputFile(event)}
					/>
				</form>
				<span className='position-absolute image-span fs-3 m-3 top-0 start-0'>Escolha uma imagem...</span>
				<div className='position-absolute m-3 bottom-0 end-0'>
					<button
						className='btn btn-secondary'
						style={{ backgroundColor: '#fd7e14', border: 'none' }}
						type='submit'
						form='imageSubmit'
						disabled={!file ? true : false}
					>
						Alterar Imagem
					</button>
				</div>
			</div>
			<div className='modalInfo position-relative'>
				<form className='d-flex flex-wrap' onSubmit={handleDataSubmit}>
					<div className='col-12'>
						<div className='form-floating'>
							<input
								className='form-control'
								placeholder='Escreva o título aqui'
								type='text'
								id='title'
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								required
							/>
							<label htmlFor='title'>Título</label>
						</div>
						<div className='form-floating my-3'>
							<textarea
								className='form-control'
								style={{ height: '140px', resize: 'vertical' }}
								placeholder='Escreva a descrição aqui'
								type='text'
								id='description'
								value={description}
								onChange={(event) => setDescription(event.target.value)}
								maxLength={500}
								required
							/>
							<label htmlFor='description'>Descrição</label>
						</div>
					</div>
					<div className='col-12 d-flex justify-content-between gap-2'>
						<div className='col form-floating'>
							<select
								className='form-select'
								placeholder='Selecione a categoria aqui'
								id='category'
								value={category}
								onChange={(event) => setCategory(event.target.value)}
								required
							>
								<option value={'adoção'}>Adoção</option>
								<option value={'cruzamento'}>Cruzamento</option>
								<option value={'evento'}>Evento</option>
							</select>
							<label htmlFor='category'>Categoria</label>
						</div>
						<div className='col form-floating'>
							<select
								className='form-select'
								placeholder='Selecione o sexo aqui'
								id='sex'
								value={sex}
								onChange={(event) => setSex(event.target.value)}
							>
								<option value={'ambos'}>Ambos</option>
								<option value={'fêmea'}>Fêmea</option>
								<option value={'macho'}>Macho</option>
							</select>
							<label htmlFor='sex'>Sexo</label>
						</div>
						<div className='col form-floating'>
							<input
								className='form-control'
								placeholder='Digite a quantidade aqui'
								type='number'
								id='amount'
								value={amount}
								onChange={(event) => setAmount(event.target.value)}
								min={0}
							/>
							<label htmlFor='amount'>Quantidade</label>
						</div>
					</div>
					<div className='col-12 d-flex align-items-center justify-content-between'>
						<div className='input-group my-3'>
							<div className='form-floating'>
								<input
									className='form-control'
									placeholder='Adicione raças aqui'
									type='text'
									id='newBreed'
									value={newBreed}
									onChange={(event) => setNewBreed(event.target.value)}
								/>
								<label htmlFor='newBreed'>Adicione raças aqui</label>
							</div>
							<button
								className='btn btn-secondary input-group-text'
								style={{ backgroundColor: '#fd7e14', border: 'none' }}
								type='button'
								onClick={addBreed}
							>
								Adicionar
							</button>
						</div>
					</div>
					<div className='col-12'>
						<label htmlFor='breeds' className='form-label'>
							Raças:
						</label>
						<div className='d-flex flex-wrap gap-1 mb-5'>
							{breeds.map((breed, index) => (
								<span key={index} className='badge text-bg-dark' style={{ fontSize: '1em' }}>
									{breed} <FaTimesCircle onClick={() => removeBreed(index)} />
								</span>
							))}
						</div>
					</div>
					<div className='position-absolute m-3 bottom-0 end-0'>
						<button
							className='btn btn-secondary'
							style={{ backgroundColor: '#fd7e14', border: 'none' }}
							type='submit'
						>
							Atualizar post
						</button>
					</div>
					<div className='position-absolute m-3 bottom-0 start-0'>
						{successMsg && (
							<span className={successMsg ? 'p-2 successmsg' : 'p-2 invisible'}>
								{successMsg} <span className='align-middle fs-4'>&#128521;</span>
							</span>
						)}
						{errorMsg && (
							<span className={errorMsg ? 'p-2 errormsg' : 'p-2 invisible'}>
								{errorMsg} <span className='align-middle fs-4'>&#128533;</span>
							</span>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalUpdate;
