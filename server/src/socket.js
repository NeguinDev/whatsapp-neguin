import fs from 'fs';



export default function socket(io) {
	io.on('connection', (socket) => {
		socket.on('login', (data) => {
			const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
			const user = users?.[data?.username];

			if (user?.token === data?.token) {
				socket.emit('login', {
					success: true,
					username: data.username,
					token: data.token,
					rooms: user.rooms,
				});
			} else {
				socket.emit('login', {
					success: false,
					message: 'Usuário ou senha inválidos'
				});

				socket.disconnect();
			}
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
}