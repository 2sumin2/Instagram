import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const Title = styled.span`
    text-align: center;
    font-size: 37px;
`;

function User() {
    return (
        <>
            <NavigationBar />
            <Title>user page</Title>
        </>
    );
}
export default User;