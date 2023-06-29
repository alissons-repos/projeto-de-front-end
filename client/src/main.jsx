import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { PostsProvider } from './contexts/PostsProvider';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<PostsProvider>
					<Routes>
						<Route path='/*' element={<App />} />
					</Routes>
				</PostsProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
