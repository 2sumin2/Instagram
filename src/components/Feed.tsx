import styled from "styled-components";
import tagIcon from "../image/tag.png";
import commentIcon from "../image/comment.png";
import blackHeart from "../image/blackheart.png";
import whiteHeart from "../image/whiteheart.png";
import redHeart from "../image/redheart.png";
import { useQuery } from "react-query";
import { isLightAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface IContainer {
    'flex-direction': string;
    width: string;
}
const Container = styled.div<IContainer>`
    background-color: ${props => props.theme.bgColor};
    max-width:1050px;
    width:${props => props.width};
    height:650px;
    border: 2px solid ${props => props.theme.textColor};
    color: black;
    display:flex;
    flex-direction:${props => props["flex-direction"]};
    border-radius:20px;
    overflow: hidden;
    margin:20px;
`;

const ImgContainer = styled.div`
    background-color: lightgray;
    min-height:400px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
interface ISideContainer {
    'maxWidth': string,
    'height': string
}
const SideContainer = styled.div<ISideContainer>`
    max-width:${props => props.maxWidth};
    width: 100%;
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const UserInfoBox = styled.div`
    height:50px;
    display: flex;
    width:100%;
    align-items: center;
    padding:10px;
    justify-content: flex-start;
    border-left: 1px solid lightgray;
`;
const UserImg = styled.div`
    height:30px;
    width:30px;
    background-color:lightgray;
    border-radius: 50%;
`;
const UserName = styled.div`
    padding-left: 15px;
    width:100%;
    font-size: 20px;
    color: ${props => props.theme.textColor};
`;
const PhotoInfoBox = styled.div`
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    border: 1px solid lightgray;
    padding: 5px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
`;
const CommentBox = styled.div`
    padding: 5px;
    height: 100%;
`;
const TagBox = styled.div`
    display: flex;
    padding: 5px;
    height: max-content;
`;
const Icon = styled.img`
    height:20px;
    width:20px;
    margin-right:10px;
`;
const LikeIcon = styled(Icon)`
    cursor:pointer;
`;
const Form = styled.form`
    border: 1px solid lightgray;
    height:50px;
    display: flex;
    border-radius: 15px;
    overflow: hidden;
`;
const Input = styled.input`
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    padding: 10px 10px;
    border:0;
    width:100%;
`;
const Button = styled.button`
    background-color:transparent;
    min-width: max-content;
    border: 0;
    color: ${props => props.theme.accentColor};
    font-weight: 600;
`;

function Feed() {
    const [like, setLike] = useState(false);
    const isLight = useRecoilValue(isLightAtom);
    const getWidth = () => {
        return window.innerWidth;
    };
    const { data: width } = useQuery(
        "windowSizes",
        () => getWidth(),
        {
            refetchInterval: 100,
        }
    );
    const toggleLike = () => {
        setLike(!like);
    };
    return (
        <>
            {width ?
                width > 1050 ? (
                    <Container flex-direction={`row`} width="100%">
                        <ImgContainer>(image: example)</ImgContainer>
                        <SideContainer maxWidth="320px" height="100%">
                            <UserInfoBox>
                                <UserImg />
                                <UserName>username</UserName>
                                <LikeIcon src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={toggleLike} />
                            </UserInfoBox>
                            <PhotoInfoBox>
                                <TagBox>
                                    <Icon src={tagIcon} />
                                    # example
                                </TagBox>
                                <CommentBox>
                                    <Icon src={commentIcon} />
                                    (comment: example)
                                </CommentBox>

                                <Form>
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                ) : (
                    <Container flex-direction={`column`} width="500px">
                        <UserInfoBox>
                            <UserImg />
                            <UserName>username</UserName>
                            <LikeIcon src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={toggleLike} />
                        </UserInfoBox>
                        <ImgContainer>(image: example)</ImgContainer>
                        <SideContainer maxWidth="100%" height="200px">
                            <PhotoInfoBox>
                                <TagBox>
                                    <Icon src={tagIcon} />
                                    # example
                                </TagBox>
                                <CommentBox>
                                    <Icon src={commentIcon} />
                                    (comment: example)
                                </CommentBox>
                                <Form>
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                )
                : null}
        </>
    );
}
export default Feed;