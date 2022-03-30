import styled from "styled-components";
import logoImg from '../image/logo2.png';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
interface IForm {
    email?: string;
    password?: string;
    statement?: string;
    username?: string;
}
const Form = styled.form<IForm>`
    display: flex;
    margin: 20px 50px;
    flex-direction: column;
    align-items:stretch;
`;
const Input = styled.input`
    padding-left: 5px;
    background-color: whitesmoke;
    color: black;
`;
const LoginBtn = styled.button`
    background-color: #5d2e74;
    color:whitesmoke;
`;
const ToggleForm = styled.form`
    display: flex;
    margin: 10px 50px;
    justify-content: center;
    align-items: center;
`;
const ToggleBtn = styled.button`
    color:#5d2e74;
    font-weight: bold;
    width:80px;
    border: 0;
    background-color: transparent;
    font-size:15px;
`;
const Message = styled.span`
    font-size:13px;
    color:red;
    text-align:center;
`;

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLogin(value => !value);
        setValue("email", "");
        setValue("statement", "");
        setValue("username", "");
        setValue("password", "");
    };
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
    const onLogin = (data: IForm) => {
        setValue("email", "");
        setValue("password", "");
        console.log(data);
    };
    const onValid2 = (data: IForm) => {
        setValue("email", "");
        setValue("statement", "");
        setValue("username", "");
        setValue("password", "");
        console.log(data);
    };
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
                            <Form onSubmit={handleSubmit(onLogin)}>
                                <Input
                                    {...register("email", {
                                        required: '이메일을 입력하세요.',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                            message: "올바르지 않은 이메일 형식입니다."
                                        }
                                    })}
                                    placeholder="이메일 주소" />
                                <Input
                                    {...register("password", {
                                        required: '비밀번호를 입력하세요.',
                                    })}
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit">로그인</LoginBtn>
                                <Message>{errors?.email ? errors?.email?.message : errors?.password?.message}</Message>
                            </Form>
                            <ToggleForm onSubmit={onSubmit}>
                                <span>계정이 없으신가요?</span>
                                <ToggleBtn type="submit"> 회원가입</ToggleBtn>
                            </ToggleForm>
                        </>
                    ) : (
                        <>
                            <Form onSubmit={handleSubmit(onValid2)}>
                                <Input
                                    {...register("email", {
                                        required: '이메일을 입력하세요.',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                                            message: "올바르지 않은 이메일 형식입니다."
                                        }
                                    })}
                                    placeholder="이메일 주소" />
                                <Input
                                    {...register("statement", {
                                        required: '성명을 입력하세요.',
                                    })}
                                    placeholder="성명" />
                                <Input
                                    {...register("username", {
                                        required: '사용자 이름을 입력하세요.',
                                        pattern: {
                                            value: /^[A-Za-z0-9._]/,
                                            message: "사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."
                                        }
                                    })}
                                    placeholder="사용자 이름" />
                                <Input
                                    {...register("password", {
                                        required: '비밀번호를 입력하세요.',
                                        minLength: {
                                            value: 6,
                                            message: "보안을 위해 비밀번호는 6자 이상이어야 합니다."
                                        }
                                    })}
                                    placeholder="비밀번호" />
                                <LoginBtn type="submit">회원가입</LoginBtn>
                                <Message>{
                                    errors?.email ? errors?.email?.message : (
                                        errors?.statement ? errors?.statement?.message : (
                                            errors?.username ? errors?.username?.message : errors?.password?.message))}</Message>
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