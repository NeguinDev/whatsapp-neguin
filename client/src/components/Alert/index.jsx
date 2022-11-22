import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const configToast = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark',
};

export function AlertContainer() {
	return (
		<ToastContainer
			position='top-center'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='dark'
		/>
	);
}

export function Alert(message, type) {
	switch (type) {
		case 'success':
			return toast.success(message, configToast);
		case 'error':
			return toast.error(message, configToast);
		case 'warn':
			return toast.warn(message, configToast);
		case 'info':
			return toast.info(message, configToast);
		default:
			return toast(message, {
				...configToast,
				progressStyle: {
					background: '#fff'
				},
			});
	}
}