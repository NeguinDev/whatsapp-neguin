import { useState } from 'react';
import './style.css';
import { backend } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const configToast = {
	position: "top-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark",
};

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function LoginEvent() {
		const response = await fetch(backend + '/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();

		if (!data) {
			toast.error('Error. Back-end não respondendo', configToast);
		}

		if (data.success) {
			toast.success(data.message, configToast);
			
			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);
		} else {
			toast.warn(data.message, configToast);
		}
	}

	async function RegisterEvent() {
		const response = await fetch(backend + '/register', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();

		if (!data) {
			toast.error('Error. Back-end não respondendo', configToast);
		}

		if (data.success) {
			toast.success(data.message, configToast);

			localStorage.setItem('token', data.token);
			localStorage.setItem('username', data.username);
		} else {
			toast.warn(data.message, configToast);
		}
	}

	return (
		<div className="app">
			<div className="card">
				<h2>WhatsApp Neguin</h2>
				<br />
				<br />

				<input
					type="text"
					id="user"
					placeholder="Digite seu nome de usuario"
					value={username}
					onChange={({ target }) => setUsername(target.value)}
					autoComplete="off"
				/>

				<input
					type="password"
					id="password"
					placeholder="Digite sua senha"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
					autoComplete="off"
				/>

				<input
					type="submit"
					value="Entrar"
					onClick={LoginEvent}
				/>
				<input
					type="submit"
					value="Registrar-se"
					onClick={RegisterEvent}
				/>
			</div>

			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</div>
	);
}