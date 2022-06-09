import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import FindMe from "./FindMe";


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
    &:focus {
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

function EditUser() {
    return (
        <>
            <NavigationBar />
            <ContainerBox>
                <Container>
                    <Menu>
                        <MenuItem>프로필 편집</MenuItem>
                        <MenuItem>비밀번호 변경</MenuItem>
                    </Menu>
                    <Content>
                        <UserImg></UserImg>
                        <div>
                            <ItemSpan><FindMe find="username" /></ItemSpan>
                            <EditImg>프로필 사진 바꾸기</EditImg>
                        </div>
                        <ItemSpan>이름</ItemSpan>
                        <ItemInput></ItemInput>
                        <ItemSpan>사용자 이름</ItemSpan>
                        <ItemInput></ItemInput>
                        <ItemSpan>웹사이트</ItemSpan>
                        <ItemInput></ItemInput>
                        <ItemSpan>소개</ItemSpan>
                        <Textarea></Textarea>
                        <ItemSpan>이메일</ItemSpan>
                        <ItemInput></ItemInput>
                        <div></div>
                        <Submit>제출</Submit>
                    </Content>
                </Container>
            </ContainerBox>
        </>
    );
};

export default EditUser;