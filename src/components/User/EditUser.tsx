import { gql, useMutation } from "@apollo/client";
import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import UserName, { UserStatement, UserEmail, UserIntro, UserWebSite } from "./FindMe";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const ContainerBox = styled.div`
    display:flex;
    justify-content:center;
`;

const GridBox = styled.div`
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: minmax(max-content, 70px);
    gap:20px;
    margin-bottom:20px;
`;

const Container = styled.div`
    border: 2px solid ${props => props.theme.textColor};
    border-radius:5%;
    margin-top: 50px;
    min-height: 80vh;
    height:max-content;
    max-width: 960px;
    width: 100vw;
    display:grid;
    grid-template-columns: 1fr 3fr;
`;

const Menu = styled.div`
    border-right: 2px solid ${props => props.theme.textColor};
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
    
`;

const UserImg = styled.img`
    border-right: 1px solid gray;
    background: lightgray;
    border-radius:50%;
    height: 50px;
    width:50px;
    justify-self: right;
    margin-right: 30px;
`;

const EditImg = styled.button`
    margin-left:10px;
    height:40px;
    color: ${props => props.theme.accentColor};
    background:inherit;
    font-weight:600;
    border:0;
`;

const Form = styled.form`
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(5, minmax(max-content, 50px));
    gap:20px;
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

const ItemInputDisabled = styled(ItemInput)`
    opacity: 50%;
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
    padding:10px;
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
    name?: string;
    statement?: string;
    email?: string;
    intro?: string;
    website?: string;
}

const MODIFY_MUTATION = gql`
    mutation modify(
        $email:String!, 
        $statement:String, 
        $username:String, 
        $intro:String, 
        $website:String, 
        $password:String){
        modify(
            email:$email, 
            username:$username, 
            statement:$statement, 
            intro:$intro, 
            website:$website, 
            password:$password) {
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
    const { register, handleSubmit
    } = useForm<IForm>();
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

        if (loading) {
            return;
        }
        if (name !== username) {
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
                    <Menu>
                        <MenuItem onClick={() => setOption(0)}>프로필 편집</MenuItem>
                        <MenuItem onClick={() => setOption(1)}>비밀번호 변경</MenuItem>
                    </Menu>
                    {option === 0 ?
                        (<Content>

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