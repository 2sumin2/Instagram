import styled from "styled-components";
import Feed from "./Feed";
import NavigationBar from "./NavigationBar";

const FeedContainer = styled.div`
    display:flex;
    justify-content:center;
`;

const Title = styled.span`
    text-align: center;
    font-size: 37px;
`;

function Home() {
    return (
        <div>
            <NavigationBar />
            <Title>home page</Title>
            <FeedContainer>
                <Feed />
            </FeedContainer>
        </div>
    );
}
export default Home;