import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        margin:10px;
    }
`;
export const LogoBox = styled.div`
    margin-top:-10px;
    position:relative;
    width: 80vw;
    max-width:400px;
    min-width:300px;
    height: 500px;
`;
export const LogoImg = styled.img`
    width: 400px;
    height: 500px;
`;
export const LoginBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 80vw;
    max-width:400px;
    min-width:300px;
    height: 500px;
    border:1px solid silver;
    background-color : white;
    input, button{
        height: 35px;
        margin:5px;
    }
`;
export const Title = styled.span`
    margin: 10px 50px ;
    text-align: center;
    font-family: 'Hurricane', cursive;
    color:black;
    font-size: 60px;
`;
export const InnerTitle = styled(Title)`
    position:absolute;
    color:white;
    margin: 0 ;
    top: 50%;
    left: 50%;
    transform: translate(-43%, 0%);
`;
interface IForm {
    email?: string;
    password?: string;
    statement?: string;
    username?: string;
}
export const Form = styled.form<IForm>`
    display: flex;
    margin: 20px 50px;
    flex-direction: column;
    align-items:stretch;
`;
export const Input = styled.input`
    padding-left: 5px;
    background-color: whitesmoke;
    color: black;
`;
export const LoginBtn = styled.button`
    background-color: #5d2e74;
    color:whitesmoke;
`;
export const ToggleForm = styled.div`
    display: flex;
    margin: 10px 50px;
    justify-content: center;
    align-items: center;
`;
export const ToggleBtn = styled.button`
    color:#5d2e74;
    font-weight: bold;
    width:80px;
    border: 0;
    background-color: transparent;
    font-size:15px;
    //#2b2a29
`;
export const Message = styled.span`
    font-size:13px;
    color:red;
    text-align:center;
`;
