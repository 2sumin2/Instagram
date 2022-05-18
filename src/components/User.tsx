import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const Title = styled.span`
    text-align: center;
    font-size: 37px;
`;
const Container = styled.div`
    height:40vh;
    display:flex;
    justify-content: center;
    background-color: #e6e6e6;
`;
const InnerContainer = styled(Container)`
    height:40vh;
    max-width:960px;
    padding:50px;
    flex-direction:rows;
    background-color: #8b8b8b;
`;

const UserImg = styled.div`
    width:250px;
    height:250px;
    margin-right:50px;
    border-radius: 50%;
    background-color: pink;
`;
const UserInfo = styled.div`
    height:250px;
    width:600px;
    background-color: #e6e6e6;
`;

function User() {
    return (
        <>
            <NavigationBar />
            <Container>
                <InnerContainer>
                    <UserImg>UserImg</UserImg>
                    <UserInfo>UserInfo</UserInfo>
                </InnerContainer>
            </Container>
            <Title>USER PAGE</Title>
        </>
    );
}
export default User;