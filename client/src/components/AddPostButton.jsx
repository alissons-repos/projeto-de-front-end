import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import ModalCreate from './ModalCreate';

const AddPostButton = () => {
	const [wasClicked, setWasClicked] = useState(false);

	const closeModal = () => {
		setWasClicked(false);
	};

	const handleClick = () => {
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
			<div className='customCard pointer' onClick={() => handleClick()}>
				<div className='d-flex justify-content-center align-itens-center customHeight'>
					<FaPlusCircle size={40} className='my-auto' fill='white' />
				</div>
			</div>
		</>
	);
};

export default AddPostButton;
