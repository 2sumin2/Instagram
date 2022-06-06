import NavigationBar from "../NavigationBar";
import styled from "styled-components";

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
    grid-template-rows: repeat(6, minmax(max-content, 50px));
    gap:20px;
`;

const UserImg = styled.img`
    border-right: 1px solid gray;
    background: lightgray;
    border-radius:50%;
    height: 50px;
    width:50px;
`;

const ItemSpan = styled.span`
    text-align: right;
`;

const ItemInput = styled.input`
    height:max-content;
    padding:10px;
`;

const Textarea = styled.textarea`
    width:45vw;
    resize: vertical;
`;

const Submit = styled.button`
    background: ${props => props.theme.accentColor};
    height:35px;
    color:white;

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
                            <button>프로필 사진 바꾸기</button>
                            <ItemSpan>username</ItemSpan>
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
                        <Submit>제출</Submit>
                    </Content>
                </Container>
            </ContainerBox>
        </>
    );
};

export default EditUser;