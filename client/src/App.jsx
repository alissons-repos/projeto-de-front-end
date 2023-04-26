import { Routes, Route } from 'react-router-dom';

// Componentes
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
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

const ROLES = {
	User: 2001,
	Editor: 1984,
	Admin: 5150,
};

// Seria possível utilizar o AuthContext junto com as rotas para fazer a autenticação por meio de estruturas de controle, porém isso poluiria o código e foge do recomendado.

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/* Tudo dentro de Layout será representado pelo "Outlet" */}
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='*' element={<NoPage />} />

				{/* O componente RequireAuth fica encarregado de fazer a validação de acesso as rotas privadas */}
				<Route element={<PersistLogin />}>
					{/* Todos os filhos de PersistLogin serão renderizados pelo "Outlet" do react-router-dom */}
					<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
						<Route path='feed' element={<Feed />} />
						<Route path='posting' element={<MyPostings />} />
						<Route path='profile' element={<MyProfile />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
