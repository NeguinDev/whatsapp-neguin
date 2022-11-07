export function generateToken() {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const size = random(100, 150);
	let token = '';

	for (let i = 0; i < size; i++) {
		token += chars[random(0, chars.length)];
	}

	return token;
}

export function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}