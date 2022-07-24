
import './App.css';
import {auth, provider} from './firebase-config'
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material';


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
        <div className='ScreenContainer'>
            <h1>Sign in with Google to Play</h1>
            <Button variant='outlined' type='primary' onClick={signInWithGoogle}>
                Sign in with Google
            </Button>
        </div>
    );
}

export default Login;