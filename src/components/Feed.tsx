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
    flexDirection?: string;
    width?: string;
    maxwidth: string;
    height?: string;
}
const Flex = styled.div`
    display:flex;
    flex-direction:column;
`;
const Container = styled(Flex) <IContainer>`
    background-color: inherit;

    width:${props => props.width};
    max-width:${props => props.maxwidth};
    height:${props => props.height};
    min-height:max-content;

    border: 2px solid ${props => props.theme.textColor};
    flex-direction:${props => props.flexDirection};
    border-radius:20px;
    margin:20px;
`;

const ImgContainer = styled(Flex)`
    background-color: lightgray;
    min-height:400px;
    width:100%;
    justify-content: center;
    align-items: center;
`;
interface ISideContainer {
    maxWidth?: string,
    height?: string,
    minHeight?: string,
}
const SideContainer = styled(Flex) <ISideContainer>`
    width: 100%;
    max-width:${props => props.maxWidth};
    height: ${props => props.height};
    min-height:max-content;
`;
const UserInfoBox = styled(Flex)`
    height:50px;
    width:100%;

    flex-direction:row;
    align-items: center;
    padding: 13px;
    border-bottom: 1px solid lightgray;
    .event{
        animation: scale 1s alternate;
    }
    @keyframes scale{
        0%   { transform: scale(1) }
        50%  { transform: scale(1.2) }
        100%  { transform: scale(1) }
    }
`;
const Icon = styled.img`
    height:20px;
    width:20px;
    user-select:none;
`;
const UserImg = styled(Icon)`
    height:32px;
    width:32px;
    background-color:lightgray;
    border-radius: 50%;
`;
const UserName = styled.div`
    margin-left:15px;
    width:77%;
    font-size: 15px;
    color: ${props => props.theme.textColor};
`;
const PhotoInfoBox = styled(Flex)`
    background-color: inherit;
    color: ${props => props.theme.textColor};
    padding: 5px;
    width:100%;
    height:100%;
    min-height:max-content; 
`;
const CommentBox = styled.div`
    padding: 10px 5px;
    height: 100%;
    min-height:max-content;
`;
const TagBox = styled.div`
    height: max-content;
    padding: 10px 5px;
    border-bottom:1px solid rgba(151, 150, 150, 0.362);
`;
const LikeIcon = styled(Icon)`
    cursor:pointer;    
`;
const Form = styled.form`
    border: 1px solid rgba(151, 150, 150, 0.362);
    display: flex;
    border-radius: 15px;
    min-height:max-content;
    margin-bottom:5px;
`;
const Input = styled.input`
    background-color: inherit;
    color: ${props => props.theme.textColor};
    padding: 0 10px;
    height:35px;
    border:0;
    width:100%;
    outline:none;
    &:focus{
        outline:none;
    }
`;
const Button = styled.button`
    background-color:transparent;
    min-width: max-content;
    color: ${props => props.theme.accentColor};
    font-weight: 600;
`;
const More = styled.button`
    background-color:transparent;
    width: max-content;
    opacity:60%;
    user-select:none;
`;
interface iFeed {
    file?: string;
    caption?: string;
    username?: string;
};

function Feed({ file, caption, username }: iFeed) {
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
    const [event, setEvent] = useState("");
    const onClick = () => {
        setLike(!like);
        event === "event" ? setEvent("") : setEvent("event");
    }
    const [more, setMore] = useState(false);
    const onClickMore = () => {
        setMore(!more);
    };
    return (
        <>
            {width ?
                width > 1050 ? (
                    <Container flexDirection="row" width="100%" maxwidth="900px" height="550px">
                        <ImgContainer>{file}</ImgContainer>
                        <SideContainer maxWidth="320px" height="100%">
                            <UserInfoBox>
                                <UserImg />
                                <UserName>{username}</UserName>
                                <LikeIcon className={event} src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={onClick} />
                            </UserInfoBox>
                            <PhotoInfoBox>
                                {caption ?
                                    caption.length < 30 ? <TagBox>{caption}</TagBox> :
                                        more ?
                                            <TagBox> {caption}<More onClick={onClickMore}>...간략히</More></TagBox> :
                                            <TagBox> {caption.slice(0, 30)}<More onClick={onClickMore}>...더보기</More></TagBox>
                                    : null}
                                <CommentBox>comment...</CommentBox>
                                <Form>
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                ) : (
                    <Container flexDirection="column" width="100%" maxwidth="420px">
                        <UserInfoBox>
                            <UserImg />
                            <UserName>{username}</UserName>
                            <LikeIcon className={event} src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={onClick} />
                        </UserInfoBox>
                        <ImgContainer>{file}</ImgContainer>
                        <SideContainer maxWidth="100%" >
                            <PhotoInfoBox>
                                {caption ?
                                    caption.length < 30 ? <TagBox>{caption}</TagBox> :
                                        more ?
                                            <TagBox> {caption}<More onClick={onClickMore}>...간략히</More></TagBox> :
                                            <TagBox> {caption.slice(0, 30)}<More onClick={onClickMore}>...더보기</More></TagBox>
                                    : null}
                                <CommentBox>comment...</CommentBox>
                                <Form>
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                )
                : null
            }
        </>
    );
}
export default Feed;