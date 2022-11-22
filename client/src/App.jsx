import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from './services/firebase';
import Home from './components/Home';
import Login from './components/Login';
import Loading from './components/Loading';
import { get, ref, set } from 'firebase/database';

export default function App() {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			const userRef = ref(db, `users/${user.uid}`);

			get(userRef).then((snapshot) => {
				if (!snapshot.exists()) {
					set(userRef, {
						username: user.displayName,
						avatar: user.photoURL,
						uid: user.uid,
						email: user.email,
					});
				}
			});
		}
	}, [user]);

	if (loading) {
		return <Loading />;
	}

	if (!user) {
		return <Login />;
	}

	return <Home user={user} />;
}