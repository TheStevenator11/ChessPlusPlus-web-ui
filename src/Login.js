
import './App.css';
import {auth, provider} from './firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


function Login({setIsAuth}) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).catch((e) => {
            console.log(e)
        }).then((result) => {
            localStorage.setItem('isAuth', true)
            setIsAuth(true);
            navigate('/game');
        })
    };
    return (
        <div>
            <h1>Sign in with Google to Play</h1>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;