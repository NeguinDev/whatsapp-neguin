import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { auth } from '../../services/firebase';
import { AlertContainer, Alert } from '../Alert';
import ShowDialog from './Dialog';

const contentStyles = {
	userSelect: 'none',
	backgroundColor: '#252525',
	borderRadius: 6,
	padding: 5
};

const itemStyles = {
	all: 'unset',
	fontSize: 13,
	color: '#ccc',
	display: 'flex',
	alignItems: 'center',
	height: 25,
	padding: '0 30px',
	position: 'relative',
	paddingLeft: 10,
	userSelect: 'none',
	cursor: 'pointer',
	borderBottom: '1px solid #333',
};

const buttonStyles = {
	background: 'none',
	padding: 0,
	border: 'none',
	outline: 'none',
};

export default function DropdownMenu() {
	return (
		<div>
			<DropdownMenuPrimitive.Root>
				<DropdownMenuPrimitive.Trigger asChild>
					<button style={buttonStyles}>
						<BsThreeDotsVertical size='25px' />
					</button>
				</DropdownMenuPrimitive.Trigger>

				<DropdownMenuPrimitive.Portal>
					<DropdownMenuPrimitive.Content sideOffset={4} style={contentStyles}>
						<DropdownMenuPrimitive.Item
							style={itemStyles}
							onSelect={() => {
								return <ShowDialog />;
							}}
						>
							Perfil
						</DropdownMenuPrimitive.Item>
						<DropdownMenuPrimitive.Item
							style={itemStyles}
							onSelect={() => alert('Settings')}
						>
							Configurações
						</DropdownMenuPrimitive.Item>
						<DropdownMenuPrimitive.Item
							style={itemStyles}
							onSelect={() => {
								Alert('Você saiu da sua conta!', 'success');
								auth.signOut();
							}}
						>
							Logout
						</DropdownMenuPrimitive.Item>
					</DropdownMenuPrimitive.Content>
				</DropdownMenuPrimitive.Portal>
			</DropdownMenuPrimitive.Root>
			<AlertContainer />
		</div>
	);
};