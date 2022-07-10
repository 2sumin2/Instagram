import styled from "styled-components";
import Feed from "./Feed";
import GetToken from "./GetToken";
import NavigationBar from "./NavigationBar";

const FeedContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`;

function Home() {
    return (
        <div>
            <GetToken />
            <NavigationBar />
            <FeedContainer>
                <Feed />
                <Feed />
            </FeedContainer>
        </div>
    );
}
export default Home;