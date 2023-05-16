import { Outlet } from 'react-router-dom'; // Outlet representa todos os filhos dentro do referido componente, no caso Layout

const Layout = () => {
	// Não é necessário passar o atributo "children" dentro dos parâmetro do componente
	return (
		<main className=''>
			<Outlet />
			{/* <Footer /> */}
		</main>
	);
};

export default Layout;
