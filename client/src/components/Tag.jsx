const Tag = ({ sex, children }) => {
	return <span className={['tag', `sex-${sex}`].join(' ')}>{children}</span>;
};

export default Tag;
