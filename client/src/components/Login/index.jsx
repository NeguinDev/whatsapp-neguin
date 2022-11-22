import { useState } from 'react';
import Home from '../Home';
import LoginGoogle from '../LoginGoogle';
import Logo from '../../../assets/logo.png';
import '../../style.css';

export default function Login() {
	return (
		<div className='app'>
			<div className='card'>
				<div className='title'>
					<img src={Logo} alt='Logo' className='logo' />
					<h3>WhatsApp Neguin</h3>
				</div>

				<br />
				<br />
				<h3>
					Efetue o login para acessar o chat
				</h3>

				<LoginGoogle
					callback={LoginGoogle}
				/>
			</div>
		</div>
	);
}