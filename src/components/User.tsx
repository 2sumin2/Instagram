import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const Title = styled.span`
    text-align: center;
    font-size: 37px;
`;
const Container = styled.div`
    height:40vh;
    background-color: #e6e6e6;
`;
const userImg = styled.div`
    border-radius: 50%;
    background-color: pink;
`;

function User() {
    return (
        <>
            <NavigationBar />
            <Container>
            </Container>
            <Title></Title>
        </>
    );
}
export default User;