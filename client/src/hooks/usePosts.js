import { useContext } from 'react';
import PostsContext from '../contexts/PostsProvider';

const usePosts = () => {
	return useContext(PostsContext);
};

export default usePosts;
