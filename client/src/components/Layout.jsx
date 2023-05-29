import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet representa todos os filhos dentro do referido componente, no caso Layout

// Não é necessário passar o atributo "children" dentro dos parâmetro do componente
const Layout = () => {
	// const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
	// const isLarge = windowSize[0] >= 1200 ? true : false;

	// useEffect(() => {
	// 	const handleWindowResize = () => {
	// 		setWindowSize([window.innerWidth, window.innerHeight]);
	// 	};
	// 	window.addEventListener('resize', handleWindowResize);
	// 	return () => {
	// 		window.removeEventListener('resize', handleWindowResize);
	// 	};
	// }, []);

	return <Outlet />;
	// return <Outlet isLarge={isLarge} />;
};

export default Layout;
