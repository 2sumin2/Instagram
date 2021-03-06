import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import UserName, { UserStatement, UserEmail, UserIntro, UserWebSite } from "./FindMe";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Content, EditImg, Form, GridBox, ItemInput, ItemInputDisabled, ItemSpan, Menu, Submit, Textarea, UserImg } from "./UserStyles";
import GetToken from "../GetToken";

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
    font-size:15px;
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
            navigate(`/user/${username}`);
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
                alert("????????? ??????????????? ???????????? ????????????");
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
    const logout = (data: any) => {
        if (window.confirm("???????????? ???????????????????")) {
            localStorage.removeItem("TOKEN");
            navigate('/');
            window.location.reload();
        };
    };
    return (
        <>
            <GetToken />
            {option === 0 ?
                (
                    <>
                        <Menu>
                            <MenuItem onClick={() => setOption(0)} fontWeight="550">????????? ??????</MenuItem>
                            <MenuItem onClick={() => setOption(1)}>???????????? ??????</MenuItem>
                            <MenuItem onClick={logout}>????????????</MenuItem>
                        </Menu>
                        <Content>
                            <GridBox>
                                <UserImg></UserImg>
                                <div>
                                    <ItemSpan>{username}</ItemSpan>
                                    <EditImg>????????? ?????? ?????????</EditImg>
                                </div>
                            </GridBox>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <ItemSpan>?????????</ItemSpan>
                                <ItemInputDisabled value={state?.useremail} disabled />
                                <ItemSpan>??????</ItemSpan>
                                <ItemInput {...register("statement")} value={state?.userstatement} name="userstatement" onChange={onChange} />
                                <ItemSpan>????????? ??????</ItemSpan>
                                <ItemInput {...register("name")} value={state?.username} name="username" onChange={onChange} />
                                <ItemSpan>????????????</ItemSpan>
                                <ItemInput {...register("website")} value={state?.userwebsite} name="userwebsite" onChange={onChange} />
                                <ItemSpan>??????</ItemSpan>
                                <Textarea {...register("intro")} value={state?.userintro} name="userintro" onChange={onChange} ></Textarea>
                                <div></div>
                                <Submit>??????</Submit>
                            </Form>
                        </Content>
                    </>
                )
                :
                (
                    <>
                        <Menu>
                            <MenuItem onClick={() => setOption(0)}>????????? ??????</MenuItem>
                            <MenuItem onClick={() => setOption(1)} fontWeight="550">???????????? ??????</MenuItem>
                            <MenuItem onClick={logout}>????????????</MenuItem>
                        </Menu>
                        <Content>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <ItemSpan>?????? ????????????</ItemSpan>
                                <ItemInput type="password" {...register("password")} name="password" />
                                <ItemSpan>????????? ????????????</ItemSpan>
                                <ItemInput type="password" {...register("newpassword")} name="newpassword" />
                                <ItemSpan>???????????? ??????</ItemSpan>
                                <ItemInput type="password" {...register("newpasswordconfirm")} name="newpasswordconfirm" />
                                <div></div>
                                <Submit>??????</Submit>
                            </Form>
                        </Content>
                    </>
                )
            }
        </>
    );
};

export default EditUser;