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
    flexDirection: string;
    width: string;
    height?: string;
    maxwidth: string;
    minHeight?: string;
}
const Container = styled.div<IContainer>`
    background-color: ${props => props.theme.bgColor};
    width:${props => props.width};
    max-width:${props => props.maxwidth};
    height:${props => props.height};
    min-width:${props => props.minHeight};
    min-height:max-content;
    border: 2px solid ${props => props.theme.textColor};
    color: black;
    display:flex;
    flex-direction:${props => props.flexDirection};
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
    maxWidth: string,
    height: string,
    minHeight?: string,
}
const SideContainer = styled.div<ISideContainer>`
    max-width:${props => props.maxWidth};
    min-height:${props => props.minHeight};
    width: 100%;
    height: ${props => props.height};
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const UserInfoBox = styled.div`
    height:45px;
    display: flex;
    width:100%;
    align-items: center;
    padding:10px;
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
const UserImg = styled.div`
    height:30px;
    width:30px;
    margin-right:15px;
    background-color:lightgray;
    border-radius: 50%;
`;
const UserName = styled.div`
    width:100%;
    font-size: 17px;
    color: ${props => props.theme.textColor};
`;
const PhotoInfoBox = styled.div`
    background-color: inherit;
    color: ${props => props.theme.textColor};
    padding: 5px;
    width:100%;
    height:100%;
    min-height:max-content;
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
    padding-bottom: 10px;
    border-bottom:1px solid rgba(151, 150, 150, 0.362);
`;
const Icon = styled.img`
    height:20px;
    width:20px;
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
    border: 0;
    color: ${props => props.theme.accentColor};
    font-weight: 600;
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
    return (
        <>
            {width ?
                width > 1050 ? (
                    <Container flexDirection="row" width="100%" maxwidth="900px" height="550px">
                        <ImgContainer>(image: {file})</ImgContainer>
                        <SideContainer maxWidth="320px" height="100%">
                            <UserInfoBox>
                                <UserImg />
                                <UserName>{username}</UserName>
                                <LikeIcon className={event} src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={onClick} />
                            </UserInfoBox>
                            <PhotoInfoBox>
                                {caption ? <TagBox>{caption}</TagBox> : null}
                                <CommentBox>
                                    comment area
                                </CommentBox>
                                <Form>
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                ) : (
                    <Container flexDirection="column" width="100%" maxwidth="420px" height="600px">
                        <UserInfoBox>
                            <UserImg />
                            <UserName>{username}</UserName>
                            <LikeIcon className={event} src={like ? redHeart : (isLight ? blackHeart : whiteHeart)} onClick={onClick} />
                        </UserInfoBox>
                        <ImgContainer>(image:  {file})</ImgContainer>
                        <SideContainer maxWidth="100%" height="250px" minHeight="max-content">
                            <PhotoInfoBox>
                                {caption ? <TagBox>{caption}</TagBox> : null}
                                <CommentBox>
                                    comment area
                                </CommentBox>
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