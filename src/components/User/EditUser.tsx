import { gql, useMutation } from "@apollo/client";
import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import UserName, { UserStatement, UserEmail } from "./FindMe";
import { useState } from "react";
import { useForm } from "react-hook-form";


const ContainerBox = styled.div`
    display:flex;
    justify-content:center;
`;

const Container = styled.div`
    border: 1px solid ${props => props.theme.textColor};
    margin-top: 50px;
    min-height: 80vh;
    height:max-content;
    max-width: 960px;
    width: 100vw;
    display:grid;
    grid-template-columns: 1fr 3fr;
`;

const Menu = styled.div`
    border-right: 1px solid ${props => props.theme.textColor};
    display:flex;
    flex-direction:column;
    justify-content: start;
`;

const MenuItem = styled.button`
    background:inherit;
    height:max-content;
    border:0;
    padding-top:20px;
    width:100%;
    text-align: center;
    font-size:18px;
    &:hover {
        font-style: italic;
    }
`;

const Content = styled.div`
    height: 100%;
    padding:70px;
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: minmax(max-content, 70px) repeat(5, minmax(max-content, 50px));
    gap:20px;
`;

const UserImg = styled.img`
    border-right: 1px solid gray;
    background: lightgray;
    border-radius:50%;
    height: 50px;
    width:50px;
    justify-self: right;
`;

const EditImg = styled.button`
    margin-left:10px;
    height:40px;
    color: ${props => props.theme.accentColor};
    background:inherit;
    font-weight:600;
    border:0;
`;

const ItemSpan = styled.span`
    text-align: right;
    height:40px;
    align-self: center;
`;

const ItemInput = styled.input`
    height:max-content;
    padding:10px;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
`;

const Textarea = styled.textarea`
    min-height:40px;
    width:45vw;
    max-width: 450px;
    margin-bottom:6px;
    resize: vertical;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
`;

const Submit = styled.button`
    background: ${props => props.theme.accentColor};
    margin-top:50px;
    height:35px;
    width:100px;
    color: ${props => props.theme.bgColor};
    justify-self: right;
`;

interface IForm {
    username?: string;
    statement?: string;
    email?: string;
}

const MODIFY_MUTATION = gql`
    mutation modify(
        $email:String!, 
        $statement:String, 
        $username:String, 
        $password:String){
        modify(
            email:$email, 
            username:$username, 
            statement:$statement, 
            password:$password) {
            ok
            error
        }
    }
`;

function EditUser() {
    const [option, setOption] = useState(0);
    const statement = UserStatement();
    const name = UserName();
    const email = UserEmail();

    const [state, setState] = useState({
        name,
        email,
        statement
    });
    const onChange = (event: any) => {
        const {
            currentTarget: { value },
        } = event;
        setState({ ...state, [event.target.name]: value });
    };
    const { register, handleSubmit, formState: { errors }, reset, getValues
    } = useForm<IForm>();
    const onCompleted = (data: any) => {
        const {
            modify: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
    };
    const [modify, { loading }] = useMutation(MODIFY_MUTATION, {
        onCompleted,
    });
    const onSubmit = (data: IForm) => {
        if (loading) {
            return;
        }
        const { username, statement, email } = getValues();
        console.log(state);
        if (name !== username) {
            modify({
                variables: { email, username, statement }
            });
        }
        else {
            modify({
                variables: { email, statement }
            });
        }
    };
    return (
        <>
            <NavigationBar />
            <ContainerBox>
                <Container>
                    <Menu>
                        <MenuItem onClick={() => setOption(0)}>프로필 편집</MenuItem>
                        <MenuItem onClick={() => setOption(1)}>비밀번호 변경</MenuItem>
                    </Menu>
                    {option === 0 ?
                        (<Content>
                            <UserImg></UserImg>
                            <div>
                                <ItemSpan>{name}</ItemSpan>
                                <EditImg>프로필 사진 바꾸기</EditImg>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ItemSpan>이름</ItemSpan>
                                <ItemInput {...register("statement")} value={state?.statement} name="statement" onChange={onChange} />
                                <ItemSpan>사용자 이름</ItemSpan>
                                <ItemInput {...register("username")} value={state?.name} name="name" onChange={onChange} />
                                <ItemSpan>이메일</ItemSpan>
                                <ItemInput {...register("email")} value={state?.email} name="email" onChange={onChange} disabled />
                                <ItemSpan>웹사이트</ItemSpan>
                                <ItemInput />
                                <ItemSpan>소개</ItemSpan>
                                <Textarea></Textarea>
                                <div></div>
                                <Submit>제출</Submit>
                            </form>
                        </Content>)
                        :
                        (<Content>
                            <div></div><div></div>
                            <ItemSpan>현재 비밀번호</ItemSpan>
                            <ItemInput type="password" />
                            <ItemSpan>변경할 비밀번호</ItemSpan>
                            <ItemInput type="password" />
                            <ItemSpan>비밀번호 확인</ItemSpan>
                            <ItemInput type="password" />
                            <div></div>
                            <Submit>제출</Submit>
                        </Content>)
                    }
                </Container>
            </ContainerBox>
        </>
    );
};

export default EditUser;