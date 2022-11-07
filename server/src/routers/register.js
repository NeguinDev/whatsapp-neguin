import fs from 'fs';
import { generateToken } from '../utils.js';
import bcrypt from 'bcrypt';

export default async function register(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send({
			success: false,
			message: 'Usuário e senha são obrigatórios'
		});
	}

	const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

	if (users[username]) {
		return res.status(400).send({
			success: false,
			message: 'Nome de usuário já cadastrado'
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = {
		username,
		password: hashedPassword,
		token: generateToken(),
		createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
		updateAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
	};

	users[username] = user;
	fs.writeFileSync('data/users.json', JSON.stringify(users, null, '\t'));

	
	const response = {
		success: true,
		message: 'Usuário cadastrado com sucesso',
		username: user.username,
		token: user.token
	};

	return res.status(200).send(response);
}