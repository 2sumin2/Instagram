import styled from "styled-components";
import tagIcon from "../image/tag.png";
import commentIcon from "../image/comment.png";

const Container = styled.div`
    background-color: ${props => props.theme.bgColor};
    max-width:850px;
    width: 90vw;
    height:600px;
    padding: 5px;
    border: 1px solid ${props => props.theme.textColor};
    margin:10px;
    color: black;
`;
const UserBox = styled.div`
    height:60px;
    display: flex;
    align-items: center;
    padding-left:10px;
`;
const UserImg = styled.div`
    height:30px;
    width:30px;
    background-color:lightgray;
    border-radius: 50px;
`;
const UserName = styled.div`
    padding-left: 15px;
    font-size: 20px;
    color: ${props => props.theme.textColor};
`;
const ContentBox = styled.div`
    height:530px;
    width: 100%;
    display: grid;
    grid-template-columns: 530px auto;
    grid-template-rows: 100px auto;
    grid-template-areas: 
    "photo tag"
    "photo comment"
    ;
    gap:5px;
`;
const ImgBox = styled.div`
    background-color: lightgray;
    height:530px;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: photo;
`;
const TagBox = styled.div`
    background-color: whitesmoke;
    border: 1px solid lightgray;
    display: flex;
    grid-area: tag;
    padding: 5px;
`;
const Icon = styled.img`
    height:25px;
    width:25px;
`;
const CommentsBox = styled.div`
    background-color: whitesmoke;
    border: 1px solid lightgray;
    display: flex;
    grid-area: comment;
    padding: 5px;
`;

function Feed() {
    return (
        <Container>
            <UserBox>
                <UserImg></UserImg>
                <UserName>username</UserName>
            </UserBox>
            <ContentBox>
                <ImgBox>(image: example)</ImgBox>
                <TagBox>
                    <Icon src={tagIcon} />
                    (tag: example)</TagBox>
                <CommentsBox>
                    <Icon src={commentIcon} />
                    (comment: example)</CommentsBox>
            </ContentBox>
        </Container>
    );
}
export default Feed;