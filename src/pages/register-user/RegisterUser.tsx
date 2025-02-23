import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './RegisterUser.module.scss';
import { login, registerUser } from "../../common/apis/backend/backend.api";

const RegisterUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    async function handleRegister(): Promise<void> {
        if (name && nickname && password) {
            const registerResponse = await registerUser(name, nickname, password);
            if (registerResponse.success) {
                const loginResponse = await login(nickname, password);

                localStorage.setItem('userToken', loginResponse.accessToken);

                navigate('/');
            }

        } else window.alert('Todos os campos dem ser preenchidos!');
    }

    return (
        <div className={styles.RegisterUser}>
            <h1> Crie sua conta! </h1>

            <label htmlFor="name"> Nome </label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
            
            <label htmlFor="nickname"> Nickname </label>
            <input type="text" name="nickname" id="nickname" onChange={(e) => setNickname(e.target.value)} />
            
            <label htmlFor="password"> Senha </label>
            <input type="text" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleRegister}> Cadastrar </button>
        </div>
    );
}

export default RegisterUser;