import { signInWithGoogle } from '../../services/firebase';
import '../../style.css';
import './style.css';
import { FcGoogle } from 'react-icons/fc';

export default function LoginGoogle() {
	return (
		<button onClick={signInWithGoogle} className='button-google'>
			<FcGoogle className='icon' size='25px' />
			<span>Logar com o Google</span>
		</button>
	)
}