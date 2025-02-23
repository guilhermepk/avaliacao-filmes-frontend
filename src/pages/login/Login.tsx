import { useNavigate } from "react-router-dom";
import { login } from "../../common/apis/backend/backend.api";
import { useState } from "react";
import styles from './Login.module.scss';

const Login = () => {
    const [ nickname, setNickname ] = useState<string | null>(null);
    const [ password, setPassword ] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleLoginAttempt(): Promise<void> {
        if (nickname && password) {
            const response = await login(nickname, password);

            localStorage.setItem('userToken', response.accessToken);
            navigate('/');
        } else window.alert('Todos os campos devem ser preenchidos!');
    }

    return (
        <div className={styles.Login}>
            <h1> Login </h1>
                <label htmlFor="nickname"> Nickname </label>
                <input type="text" name="nickname" id="nickname" onChange={(e) => setNickname(e.target.value)}/>

                <label htmlFor="password"> Senha </label>
                <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={handleLoginAttempt}> Logar </button>

                <p> Não tem conta ainda? <a style={{ cursor: 'pointer' }} onClick={() => navigate('/register-user')}> Registre-se aqui! </a> </p>
        </div>
    );
}

export default Login;