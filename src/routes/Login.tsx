import styled from "styled-components";
import titleImg from '../image/title.png';
import logoImg from '../image/logo2.png';

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        margin:10px;
    }
`;
const LogoBox = styled.img`
    width: 400px;
    height: 500px;
`;
const LoginBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 400px;
    border:1px solid silver;
    background-color : white;
    input, button{
        height: 35px;
        margin:5px;
    }
`;
const Title = styled.img`
    margin: 10px 50px ;
`;
const LoginForm = styled.form`
    display: flex;
    margin:50px;
    flex-direction: column;
`;
const InputID = styled.input`
    padding-left: 5px;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
`;
const InputPW = styled.input`
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
    padding-left: 5px;
`;
const LoginBtn = styled.button`
    background-color: ${props => props.theme.accentColor};
    color:${props => props.theme.bgColor};
`;
const SignUp = styled.span`
    color:${props => props.theme.accentColor};
    font-weight: bold;
`;
const SignForm = styled.div`
    display: flex;
    margin: 40px 50px;
    justify-content: center;
`;
function Login() {
    return (
        <Container>
            <LogoBox src={logoImg} alt="INSPACEGRAM" />
            <LoginBox>
                <Title src={titleImg} alt="INSPACEGRAM" />
                <LoginForm>
                    <InputID
                        id="loginID"
                        name="loginID"
                        type="text"
                        placeholder="사용자 아이디" />
                    <InputPW
                        id="loginIPW"
                        name="password"
                        type="password"
                        placeholder="비밀번호" />
                    <LoginBtn type="submit">로그인</LoginBtn>
                </LoginForm>
                <SignForm>
                    <span>계정이 없으신가요?</span>
                    <SignUp>회원가입</SignUp>
                </SignForm>
            </LoginBox>
        </Container>
    );
}
export default Login;