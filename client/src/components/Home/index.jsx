import { useEffect, useRef, useState } from 'react';
import DropdownMenuDemo from './DropdownMenu';
import ShowDialog from './Dialog';
import { IoMdSend } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { onValue, ref, set, get } from 'firebase/database';
import { db } from '../../services/firebase';

import '../../style.css';
import './style.css';

function Row({ username, message, time, avatar, onClick }) {
	return (
		<div className='row' onClick={onClick}>
			<div className='row-col-2'>
				<img className='avatar' src={avatar} alt='' />

				<div className='row-col-3'>
					<p className='row-username'>{username}</p>
					<p className='row-message'>{message}</p>
				</div>
			</div>

			<div className='row-time'>
				<p>{time}</p>
			</div>
		</div>
	)
}

function Message({ text, time, type, refe }) {
	if (type === 'received') {
		return (
			<div className="message-receiver" ref={refe}>
				<div className='bubble-receiver'>
					<p className='bubble-text-receiver'>{text}</p>
					<p className='bubble-time-receiver'>{time}</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="message-sender" ref={refe}>
				<div className='bubble-sender'>
					<p className='bubble-text-sender'>{text}</p>
					<p className='bubble-time-sender'>{time}</p>
				</div>
			</div>
		);
	}
}

export default function Home({ user }) {
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([
		{
			username: 'John Doe',
			avatar: 'https://i.pravatar.cc/150?img=1',
			lastMessage: 'Hello, how are you?',
			lastMessageTime: '12:00',
		}
	]);
	const lastMessage = useRef(null);
	const [currentChat, setCurrentChat] = useState(null);

	const userRef = ref(db, `users/${user.uid}`);
	const chatsRef = ref(db, `users/${user.uid}/chats`);

	get(chatsRef).then((snapshot) => {
		if (snapshot.exists()) {
			snapshot.forEach(async (childSnapchot_id) => {
				console.log(childSnapchot_id.val());
				const userChildAvatarRef = ref(db, `users/${childSnapchot_id.val()}/avatar`);
				const userChildAvatar = await get(userChildAvatarRef);
				const userChildAvatarUrl = userChildAvatar.val().avatar;

				const userChildUsernameRef = ref(db, `users/${childSnapchot_id.val()}/username`);
				const userChildUsername = await get(userChildUsernameRef);
				const userChildUsernameUrl = userChildUsername.val().username;

				setChats((prev) => {
					if (prev.find((chat) => chat.id === childSnapchot_id.val())) {
						return prev;
					}

					const newChat = {
						username: userChildUsernameUrl,
						avatar: userChildAvatarUrl,
						lastMessage: '',
						lastMessageTime: '',
						id: childSnapchot_id.val(),
					};
					console.log(newChat);
					return [...prev, newChat];
				});
			});
		}
	});

	function ListedMessages({ text, type, time }, index) {
		if (index === messages.length - 1) {
			return (
				<Message
					text={text.trim()}
					type={type}
					time={time}
					refe={lastMessage}
					key={index}
				/>
			)
		}

		return (
			<Message
				text={text}
				type={type}
				time={time}
				key={index}
			/>
		)
	}

	function ListedUsers(user, index) {
		const { username, avatar, lastMessage, lastMessageTime } = user;

		return (
			<Row
				username={username}
				avatar={avatar}
				message={lastMessage}
				time={lastMessageTime}
				key={index}
				onClick={() => OpenChat(user)}
			/>
		)
	}

	function SendMessage(e) {
		e.preventDefault();

		if (!text) return;

		const time = new Date().toLocaleTimeString('pt-br', {
			timeZone: 'America/Sao_Paulo',
			hour: '2-digit',
			minute: '2-digit'
		});

		const data = {
			text,
			type: 'sender',
			time
		};

		setText('');
		setMessages([...messages, data]);

		lastMessage?.current?.scrollIntoView?.();
	}

	function OpenNav() {
		if (window.innerWidth <= 768) {
			const nav = document.querySelector('.nav');
			const main = document.querySelector('.main');

			nav.style.display = 'block';
			main.style.display = 'none';
		}
	}

	function OpenChat(user) {
		if (window.innerWidth <= 768) {
			const nav = document.querySelector('.nav');
			const main = document.querySelector('.main');

			nav.style.display = 'none';
			main.style.display = 'block';
		}

		setCurrentChat(user);
	}


	return (
		<div className='container'>
			<div className='nav'>
				<div className='header'>
					<img className='avatar' src={user.photoURL} alt='' />
					<p className='username'>{user.displayName}</p>
					<DropdownMenuDemo />
				</div>

				<div className='nav-scroll'>
					{chats.map(ListedUsers)}
				</div>
			</div>

			<div className='main'>
				<div className="header-main">
					<BiArrowBack onClick={OpenNav} className='icon' size='28' />
					{
						currentChat ? <>
							<img className='avatar' src={currentChat.avatar} alt='' />
							<p className='username'>{currentChat.username}</p>
						</> : ''
					}
				</div>

				<div className='main-scroll'>
					{messages.map(ListedMessages)}
				</div>

				<form onSubmit={SendMessage} className='footer'>
					<input
						className='footer-input'
						type='text'
						placeholder='Digite uma mensagem...'
						onChange={({ target }) => setText(target.value)}
						value={text}
					/>

					<button className='button-send'>
						<IoMdSend size='30px' />
					</button>
				</form>
			</div>
		</div>
	);
}