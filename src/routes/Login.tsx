import styled from "styled-components";
import titleImg from '../image/title.png';
import logoImg from '../image/logo2.png';
import React, { useState } from "react";

const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    *{
        margin:10px;
    }
`;
const LogoBox = styled.div`
    margin-top:-10px;
    position:relative;
    width: 400px;
    height: 500px;
`;
const LogoImg = styled.img`
    width: 400px;
    height: 500px;
`;
const LoginBox = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 400px;
    height: 500px;
    border:1px solid silver;
    background-color : white;
    input, button{
        height: 35px;
        margin:5px;
    }
`;
const Title = styled.span`
    margin: 10px 50px ;
    text-align: center;
    font-family: 'Hurricane', cursive;
    color:black;
    font-size: 60px;
`;
const InnerTitle = styled(Title)`
    position:absolute;
    color:white;
    margin: 0 ;
    top: 50%;
    left: 50%;
    transform: translate(-43%, 0%);
`;
const Form = styled.form`
    display: flex;
    margin: 20px 50px;
    flex-direction: column;
`;
const Input = styled.input`
    padding-left: 5px;
    background-color: ${props => props.theme.bgColor};
    color : ${props => props.theme.textColor};
`;
const LoginBtn = styled.button`
    background-color: ${props => props.theme.accentColor};
    color:${props => props.theme.bgColor};
`;
const ToggleForm = styled.form`
    display: flex;
    margin: 10px 50px;
    justify-content: center;
    align-items: center;
`;
const ToggleBtn = styled.button`
    color:${props => props.theme.accentColor};
    font-weight: bold;
    width:80px;
    border: 0;
    background-color: transparent;
    font-size:15px;
`;

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLogin(value => !value);
    };
    console.log(isLogin);
    return (
        <Container>
            <LogoBox>
                <InnerTitle>Inspacegram</InnerTitle>
                <LogoImg src={logoImg} alt=" " />
            </LogoBox>
            <LoginBox>
                <Title>Inspacegram</Title>
                {isLogin ?
                    (
                        <>
                            <Form>
                                <Input
                                    id="loginID"
                                    name="loginID"
                                    type="text"
                                    placeholder="이메일 주소" />
                                <Input
                                    id="loginPW"
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit">로그인</LoginBtn>
                            </Form>
                            <ToggleForm onSubmit={onSubmit}>
                                <span>계정이 없으신가요?</span>
                                <ToggleBtn type="submit"> 회원가입</ToggleBtn>
                            </ToggleForm>
                        </>
                    ) : (
                        <>
                            <Form>
                                <Input
                                    id="signupID"
                                    name="signupID"
                                    type="text"
                                    placeholder="이메일 주소" />
                                <Input
                                    id="signupSTATEMENT"
                                    name="signupSTATEMENT"
                                    type="text"
                                    placeholder="성명" />
                                <Input
                                    id="signupNAME"
                                    name="signupNAME"
                                    type="text"
                                    placeholder="사용자 이름" />
                                <Input
                                    id="signupPW"
                                    name="password"
                                    type="password"
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit">회원가입</LoginBtn>
                            </Form>
                            <ToggleForm onSubmit={onSubmit}>
                                <span>계정이 있으신가요?</span>
                                <ToggleBtn type="submit">로그인</ToggleBtn>
                            </ToggleForm>
                        </>
                    )}
            </LoginBox>
        </Container>
    );
}
export default Login;