import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import '../../index.css';

export const Auth = () => {
	const navigate = useNavigate();
	const { isAuth } = useGetUserInfo();
	const signInWithGoogle = async () => {
		const results = await signInWithPopup(auth, provider);
		const authInfo = {
			userID: results.user.uid,
			name: results.user.displayName,
			profilePhoto: results.user.photoURL,
			isAuth: true,
		};
		localStorage.setItem('auth', JSON.stringify(authInfo));
		navigate('/expense-tracker');
	};

	if (isAuth) {
		return <Navigate to={'/expense-tracker'} />;
	}

	return (
		<div className="text-black bg-lightBlue text-lg flex flex-col justify-center items-center gap-5 h-screen font-nunito">
			<h1 className="font-medium text-xl">
				Sign in with Google to continue
			</h1>
			<button
				className="px-12 py-3 rounded-md shadow-lg border border-lightRed bg-lightRed hover:bg-lightRedHover hover:border-lightRedHover transition-all duration-300 font-medium"
				onClick={signInWithGoogle}
			>
				Sign in with Google
			</button>
		</div>
	);
};
