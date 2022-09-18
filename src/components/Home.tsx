import styled from "styled-components";
import Feed from "./Feed";
import GetToken from "./GetToken";
import NavigationBar from "./Navigation/NavigationBar";
import { gql, useQuery as gqlQuery } from "@apollo/client";

const FeedContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
`;
const NothingSpan = styled.span`
    color: ${props => props.theme.textColor};
    font-size:13px;
    padding:100px;
`;

const SEE_POSTS_QUERY = gql`
    query SeePosts {
        seePosts {
            ok
            error
            posts {
                id
                userId
                username
                file
                caption
            }
            totalPosts
        }
    }
`;

function Home() {
    const { data: posts, loading: postsLoading } = gqlQuery(SEE_POSTS_QUERY, {});
    return (
        <div>
            <GetToken />
            <NavigationBar />
            <FeedContainer>
                {postsLoading ? <NothingSpan>Loading...</NothingSpan> : posts?.seePosts?.posts.map((data: any, index: any) => (
                    <Feed key={index} file={data?.file} caption={data?.caption} username={data?.username} />
                ))}
            </FeedContainer>
        </div>
    );
}
export default Home;