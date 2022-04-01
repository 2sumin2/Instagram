import styled from "styled-components";
import NavigationBar from "./NavigationBar";

const Title = styled.span`
    text-align: center;
    color:black;
    font-size: 37px;
`;

function Home() {
    return (
        <div>
            <NavigationBar />
            <Title>home page</Title>
        </div>
    );
}
export default Home;