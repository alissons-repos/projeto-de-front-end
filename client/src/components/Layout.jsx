import { Outlet } from 'react-router-dom'; // Outlet representa todos os filhos dentro do referido componente, no caso Layout

// Não é necessário passar o atributo "children" dentro dos parâmetro do componente
const Layout = () => {
	return <Outlet />;
};

export default Layout;
