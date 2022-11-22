import * as Dialog from '@radix-ui/react-dialog';

export default function ShowDialog() {
	return (
		<div>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button>Open</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay />
					<Dialog.Content>
						<Dialog.Title>
							Dialog title
						</Dialog.Title>
						<Dialog.Description>
							Dialog description
						</Dialog.Description>

						<Dialog.Close>
							<button>Close</button>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}