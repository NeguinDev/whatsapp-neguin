import fs from 'fs';
import { generateToken } from '../utils.js';
import bcrypt from 'bcrypt';

export default async function login(req, res) {
	const { username, password } = req.body;

	const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
	const user = users?.[username];

	if (!user) {
		return res.status(400).send({
			success: false,
			message: 'Usuario ou senha inválidos'
		});
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(400).send({
			success: false,
			message: 'Usuario ou senha inválidos'
		});
	}

	user.token = generateToken();
	user.updateAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
	
	users[username] = user;
	fs.writeFileSync('data/users.json', JSON.stringify(users, null, '\t'));

	
	const response = {
		success: true,
		message: 'Login realizado com sucesso',
		username: user.username,
		token: user.token
	};
	
	return res.status(200).send(response);
}