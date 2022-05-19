import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Form, InnerTitle, Input, LoginBox, LoginBtn, LogoBox, Message, ToggleBtn, ToggleForm, LogoImg, Title } from "./LoginForm";
import Logo from './Logo';

interface IForm {
    email?: string;
    password?: string;
    statement?: string;
    username?: string;
}

function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const onClick = () => {
        navigate('/');
        reset();
    };
    const onSubmit = (data: IForm) => {
        reset();
        console.log(data);
    };
    const [width, setWidth] = useState(window.innerWidth);
    const getWidth = () => {
        setWidth(window.innerWidth);
    };
    useQuery(
        "windowSize",
        () => getWidth(),
        {
            refetchInterval: 100,
        }
    );
    return (
        <Container>
            {width > 900 ? <Logo /> : null}
            <LoginBox>
                <Title>Inspacegram</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register("email", {
                            required: '이메일을 입력하세요.',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9]+\.[a-zA-Z]+$/,
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
                        type="password"
                        placeholder="비밀번호" />
                    <LoginBtn type="submit">회원가입</LoginBtn>
                    <Message>{
                        errors?.email ? errors?.email?.message : (
                            errors?.statement ? errors?.statement?.message : (
                                errors?.username ? errors?.username?.message : errors?.password?.message))}</Message>
                </Form>
                <ToggleForm>
                    <span>계정이 있으신가요?</span>
                    <ToggleBtn onClick={onClick}>로그인</ToggleBtn>
                </ToggleForm>
            </LoginBox>
        </Container>
    );
};

export default Signup;