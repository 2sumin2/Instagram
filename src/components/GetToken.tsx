import { useNavigate } from "react-router-dom";

function GetToken() {
    const navigate = useNavigate();
    if (localStorage.getItem("TOKEN") === null) {
        navigate('/');
    };
    return <></>;
}

export default GetToken;