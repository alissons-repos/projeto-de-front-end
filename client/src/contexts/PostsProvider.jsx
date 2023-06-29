import { createContext, useState } from 'react';

import useAuth from '../hooks/useAuth';
import useApiPrivate from '../hooks/useApiPrivate';
import path from '../apis/endpoints';

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
	const apiPrivate = useApiPrivate();
	const { auth, setAuth, handleError, handleSuccess } = useAuth();
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			const response = await apiPrivate.get(path.POSTS_URL);
			setPosts(response.data);
		} catch (error) {
			console.error(error);
			handleError(error);
		}
	};

	const getMyPosts = async () => {
		try {
			const response = await apiPrivate.get(path.AUTH_POSTS_URL);
			setPosts(response.data);
		} catch (error) {
			console.error(error);
			handleError(error);
		}
	};

	const createPost = async (postObject, postFile) => {
		let postId = null;
		try {
			const resCreate = await apiPrivate.post(path.AUTH_POSTS_URL, JSON.stringify(postObject)).catch((error) => {
				throw error;
			});
			postId = resCreate.data._id;
			if (postFile) {
				await apiPrivate
					.patchForm(`${path.AUTH_POSTS_UPLOAD_ID_URL}${postId}`, {
						postImage: postFile,
					})
					.catch((error) => {
						throw error;
					});
			}
			handleSuccess('Postagem criada com sucesso!');
			getMyPosts();
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			handleError(error);
		}
	};

	const updatePost = async (postId, postObject) => {
		try {
			await apiPrivate.patch(`${path.AUTH_POSTS_ID_URL}${postId}`, JSON.stringify(postObject));
			handleSuccess('Postagem alterada com sucesso!');
			getMyPosts();
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			handleError(error);
		}
	};

	const deletePost = async (postId) => {
		try {
			await apiPrivate.delete(`${path.AUTH_POSTS_ID_URL}${postId}`);
			handleSuccess('Exclusão efetuada com sucesso!');
			getMyPosts();
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			handleError(error);
		}
	};

	const likeUnlikePost = async (postId, liked) => {
		try {
			if (liked) {
				await apiPrivate.patch(`${path.AUTH_POSTS_UNLIKE_ID_URL}${postId}`);
			} else {
				await apiPrivate.patch(`${path.AUTH_POSTS_LIKE_ID_URL}${postId}`);
			}
			const response = await apiPrivate.get(`${path.USER_ID_URL}${auth.userData._id}`);
			setAuth((previous) => ({ ...previous, userData: response?.data }));
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			handleError(error);
		}
	};

	const updateFilePost = async (postId, postFile) => {
		try {
			await apiPrivate.patchForm(`${path.AUTH_POSTS_UPLOAD_ID_URL}${postId}`, {
				postImage: postFile,
			});
			const response = await apiPrivate.get(`${path.POSTS_ID_URL}${postId}`);
			const updatedPosts = posts.map((obj) => {
				console.log(obj._id, obj.image);
				if (obj._id === postId) {
					return { ...obj, image: response?.data?.image };
				} else {
					return obj;
				}
			});
			setPosts(updatedPosts);
			handleSuccess('Imagem da postagem alterada com sucesso!');
		} catch (error) {
			console.error(error); // TODO: COMENTAR A LINHA QUANDO ESTIVER PRONTO
			handleError(error);
		}
	};

	const postsContextValue = {
		posts: posts,
		setPosts,
		getPosts,
		getMyPosts,
		createPost,
		updatePost,
		deletePost,
		likeUnlikePost,
		updateFilePost,
	};

	return <PostsContext.Provider value={postsContextValue}>{children}</PostsContext.Provider>;
};

export default PostsContext;
