import { gql, useMutation } from "@apollo/client";
import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import UserName, { UserStatement, UserEmail, UserIntro, UserWebSite } from "./FindMe";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ContainerBox, Content, EditImg, Form, GridBox, ItemInput, ItemInputDisabled, ItemSpan, Menu, Submit, Textarea, UserImg } from "./UserStyles";

export const Container = styled.div`
    border: 2px solid ${props => props.theme.textColor};
    border-radius:20px;
    margin-top: 50px;
    min-height: 80vh;
    height:max-content;
    max-width: 960px;
    width: 100vw;
    display:grid;
    grid-template-columns: 1fr 3fr;
`;

interface IMenuItem {
    fontWeight?: string;
}
const MenuItem = styled.button<IMenuItem>`
    background:inherit;
    height:max-content;
    border:0;
    padding-top:20px;
    width:100%;
    text-align: center;
    font-size:18px;
    font-weight: ${props => props.fontWeight};
    &:hover {
        opacity: 50%;
    }
`;

interface IForm {
    name?: string;
    statement?: string;
    email?: string;
    intro?: string;
    website?: string;
    password?: string;
    newpassword?: string;
    newpasswordconfirm?: string;
}

const MODIFY_MUTATION = gql`
    mutation modify(
        $email:String!, 
        $statement:String, 
        $username:String, 
        $intro:String, 
        $website:String, 
        $password:String,
        $newpassword:String){
        modify(
            email:$email, 
            username:$username, 
            statement:$statement, 
            intro:$intro, 
            website:$website, 
            password:$password,
            newpassword:$newpassword) {
            ok
            error
        }
    }
`;

function EditUser() {
    const [option, setOption] = useState(0);
    const userstatement = UserStatement();
    var username = UserName();
    const useremail = UserEmail();
    const userintro = UserIntro();
    const userwebsite = UserWebSite();
    const navigate = useNavigate();
    const [state, setState] = useState({
        username,
        useremail,
        userstatement,
        userintro,
        userwebsite
    });
    const onChange = (event: any) => {
        const {
            currentTarget: { value },
        } = event;
        setState({ ...state, [event.target.name]: value });
    };
    const { register, handleSubmit, getValues } = useForm<IForm>();
    const onCompleted = (data: any) => {
        const {
            modify: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
        if (ok) {
            navigate('/user');
            window.location.reload();
        }

    };
    const [modify, { loading }] = useMutation(MODIFY_MUTATION, {
        onCompleted,
    });
    const onSubmit = (data: IForm) => {
        const name = state.username;
        const statement = state.userstatement;
        const intro = state.userintro;
        const website = state.userwebsite;

        const { password, newpassword, newpasswordconfirm } = getValues();

        if (loading) {
            return;
        }
        if (password) {
            if (newpassword !== newpasswordconfirm) {
                alert("변경할 비밀번호가 일치하지 않습니다");
            }
            else {
                modify({
                    variables: { email: useremail, password, newpassword }
                });
            }
        }
        else if (name && name !== username) {
            modify({
                variables: { email: useremail, username: name, statement, intro, website }
            });
        }
        else {
            modify({
                variables: { email: useremail, statement, intro, website }
            });
        }

    };
    return (
        <>
            <NavigationBar />
            <ContainerBox>
                <Container>
                    {option === 0 ?
                        (
                            <>
                                <Menu>
                                    <MenuItem onClick={() => setOption(0)} fontWeight="550">프로필 편집</MenuItem>
                                    <MenuItem onClick={() => setOption(1)}>비밀번호 변경</MenuItem>
                                </Menu>
                                <Content>
                                    <GridBox>
                                        <UserImg></UserImg>
                                        <div>
                                            <ItemSpan>{username}</ItemSpan>
                                            <EditImg>프로필 사진 바꾸기</EditImg>
                                        </div>
                                    </GridBox>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <ItemSpan>이메일</ItemSpan>
                                        <ItemInputDisabled value={state?.useremail} disabled />
                                        <ItemSpan>이름</ItemSpan>
                                        <ItemInput {...register("statement")} value={state?.userstatement} name="userstatement" onChange={onChange} />
                                        <ItemSpan>사용자 이름</ItemSpan>
                                        <ItemInput {...register("name")} value={state?.username} name="username" onChange={onChange} />
                                        <ItemSpan>웹사이트</ItemSpan>
                                        <ItemInput {...register("website")} value={state?.userwebsite} name="userwebsite" onChange={onChange} />
                                        <ItemSpan>소개</ItemSpan>
                                        <Textarea {...register("intro")} value={state?.userintro} name="userintro" onChange={onChange} ></Textarea>
                                        <div></div>
                                        <Submit>제출</Submit>
                                    </Form>
                                </Content>
                            </>
                        )
                        :
                        (
                            <>
                                <Menu>
                                    <MenuItem onClick={() => setOption(0)}>프로필 편집</MenuItem>
                                    <MenuItem onClick={() => setOption(1)} fontWeight="550">비밀번호 변경</MenuItem>
                                </Menu>
                                <Content>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <ItemSpan>현재 비밀번호</ItemSpan>
                                        <ItemInput type="password" {...register("password")} name="password" />
                                        <ItemSpan>변경할 비밀번호</ItemSpan>
                                        <ItemInput type="password" {...register("newpassword")} name="newpassword" />
                                        <ItemSpan>비밀번호 확인</ItemSpan>
                                        <ItemInput type="password" {...register("newpasswordconfirm")} name="newpasswordconfirm" />
                                        <div></div>
                                        <Submit>제출</Submit>
                                    </Form>
                                </Content>
                            </>
                        )
                    }
                </Container>
            </ContainerBox>
        </>
    );
};

export default EditUser;