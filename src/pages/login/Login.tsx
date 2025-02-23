import { useNavigate } from "react-router-dom";
import { login } from "../../common/apis/backend.api";

const Login = () => {
    const navigate = useNavigate();

    async function handleLoginAttempt(): Promise<void> {
        const response = await login(`guilhermepk`, `123456`);

        localStorage.setItem('userToken', response.accessToken);
        navigate('/');
    }

    return (
        <div>
            <h1> Login </h1>
            <button onClick={handleLoginAttempt}> Logar </button>
        </div>
    );
}

export default Login;