import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FaveButton = () => {
	const [icon, fillIcon] = useState(false);
	const [favedFlag, setFavedFlag] = useState(false);

	const handleClick = (e) => {
		if (favedFlag) {
			fillIcon(false);
			setFavedFlag(false);
		} else {
			fillIcon(true);
			setFavedFlag(true);
		}
		console.log('Faved?: ' + favedFlag); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
	};
	const handleMouseOver = (e) => fillIcon(true);
	const handleMouseLeave = (e) => fillIcon(false);

	return (
		<>
			{icon ? (
				<AiFillHeart
					color={favedFlag ? '#dc3545' : '#909090'}
					size='1.5em'
					onClick={handleClick}
					onMouseOver={favedFlag ? undefined : handleMouseOver}
					onMouseLeave={favedFlag ? undefined : handleMouseLeave}
				/>
			) : (
				<AiOutlineHeart
					color='#909090'
					size='1.5em'
					onClick={handleClick}
					onMouseOver={favedFlag ? undefined : handleMouseOver}
					onMouseLeave={favedFlag ? undefined : handleMouseLeave}
				/>
			)}
		</>
	);
};

export default FaveButton;
