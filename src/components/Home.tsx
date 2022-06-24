import styled from "styled-components";
import Feed from "./Feed";
import NavigationBar from "./NavigationBar";

const FeedContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.span`
    text-align: center;
    font-size: 37px;
`;

function Home() {
    return (
        <div>
            <NavigationBar />
            <FeedContainer>
                <Feed />
                <Feed />
            </FeedContainer>
        </div>
    );
}
export default Home;