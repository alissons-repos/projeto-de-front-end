import { useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';

import ModalCreate from './ModalCreate';

import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const AddPostButton = () => {
	const apiPrivate = useApiPrivate();

	const [wasClicked, setWasClicked] = useState(false);

	const closeModal = () => {
		// document.body.classList.remove('overflow-hidden');
		setWasClicked(false);
	};

	const handleClick = () => {
		// document.body.classList.add('overflow-hidden');
		setWasClicked(true);
	};

	return (
		<>
			{wasClicked ? (
				<div id='modalPost'>
					<div className='my-fade' onClick={closeModal}></div>
					<ModalCreate />
				</div>
			) : null}
			<div className='customCard'>
				<div className='cardBody d-flex justify-content-center align-itens-center h-100'>
					<div className='' onClick={() => handleClick()}>
						<FaRegPlusSquare size={40} className='edit-button pointer' />
					</div>
				</div>
			</div>
		</>
	);
};

export default AddPostButton;
