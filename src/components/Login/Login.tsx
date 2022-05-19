import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Form, Input, LoginBox, LoginBtn, Message, ToggleBtn, ToggleForm, Title } from "./LoginForm";
import Logo from './Logo';

interface IForm {
    email?: string;
    password?: string;
    statement?: string;
    username?: string;
}

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const onClick = () => {
        reset();
        navigate('/account');
    };
    const onSubmit = (data: IForm) => {
        reset();
        navigate('/home');
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
                        {...register("password", {
                            required: '비밀번호를 입력하세요.',
                        })}
                        type="password"
                        placeholder="비밀번호" />
                    <LoginBtn type="submit">로그인</LoginBtn>
                    <Message>{errors?.email ? errors?.email?.message : errors?.password?.message}</Message>
                </Form>
                <ToggleForm>
                    <span>계정이 없으신가요?</span>
                    <ToggleBtn onClick={onClick} type="submit"> 회원가입</ToggleBtn>
                </ToggleForm>
            </LoginBox>
        </Container>
    );
};

export default Login;