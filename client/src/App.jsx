import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';

// Rotas
import NoPage from './routes/NoPage';
import Login from './routes/Login';
import Register from './routes/Register';
import Feed from './routes/Feed';
import MyPostings from './routes/MyPostings';
import MyProfile from './routes/MyProfile';

// Style
import './App.css';

// Seria possível utilizar o AuthContext junto com as rotas para fazer a autenticação por meio de estruturas de controle, porém isso poluiria o código e foge do recomendado.

function App() {
	const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
	const isLarge = windowSize[0] >= 1200 ? true : false;

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener('resize', handleWindowResize);
		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/* Tudo dentro de Layout será representado pelo "Outlet" */}
				<Route index element={<Login />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<NoPage />} />

				{/* Todos os filhos de PersistLogin serão renderizados pelo "Outlet" do react-router-dom */}
				<Route element={<PersistLogin />}>
					<Route path='feed' element={<Feed isLarge={isLarge} />} />
					<Route path='postings' element={<MyPostings isLarge={isLarge} />} />
					<Route path='profile' element={<MyProfile isLarge={isLarge} />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
