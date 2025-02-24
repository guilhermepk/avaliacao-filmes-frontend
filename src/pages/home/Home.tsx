import { useNavigate } from "react-router-dom";
import CustomListsSidebar from "../../components/custom-lists-sidebar/custom-lists-sidebar";

const Home = () => {
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('userToken');
        navigate('/login');
    }

    return (
        <div>
            <CustomListsSidebar/>
            <h1> Flash Review </h1>
            <h2> Início </h2> 

            <button onClick={logout}> Deslogar </button> 
        </div>
    );
}

export default Home;