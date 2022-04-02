import styled from "styled-components";
import tagIcon from "../image/tag.png";
import commentIcon from "../image/comment.png";
import blackHeart from "../image/blackheart.png";
import whiteHeart from "../image/whiteheart.png";
import redHeart from "../image/redheart.png";
import { useState } from "react";
import { useQuery } from "react-query";
import { isLightAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IContainer {
    'flex-direction': string;
}
const Container = styled.div<IContainer>`
    background-color: ${props => props.theme.bgColor};
    max-width:950px;
    width: 100%;
    height:630px;
    border: 1px solid ${props => props.theme.textColor};
    color: black;
    display:flex;
    flex-direction:${props => props["flex-direction"]};
`;
const ImgContainer = styled.div`
    background-color: lightgray;
    max-width:630px;
    min-height:400px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SideContainer = styled.div`
    max-width:320px;
    width: 100%;
    min-height:400px;
    display: flex;
    flex-direction: column;
`;
const UserInfoBox = styled.div`
    height:50px;
    display: flex;
    width:100%;
    align-items: center;
    padding-left:10px;
    justify-content: flex-start;
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
    background-color: white;
    border: 1px solid lightgray;
    padding: 5px;
    height:100%;
    display:flex;
    flex-direction: column;
`;
const CommentBox = styled.div`
    border: 1px solid lightgray;
    padding: 5px;
    height: 100%;
`;
const TagBox = styled.div`
    border: 1px solid lightgray;
    display: flex;
    padding: 5px;
    min-height: 100px;
`;
const Icon = styled.img`
    height:25px;
    width:25px;
    margin-right:10px;
`;
const Form = styled.form`
    border: 1px solid lightgray;
    height:50px;
    display: flex;
`;
const Input = styled.input`
    padding: 0 10px;
    border:0;
    width:100%;
`;
const Button = styled.button`
    background-color:transparent;
    min-width: max-content;
    border: 0;
    color: #571479;
    font-weight: 600;
`;

function Feed() {
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
    return (
        <>
            {width ?
                width > 800 ? (
                    <Container flex-direction={`row`}>
                        <ImgContainer>(image: example)</ImgContainer>
                        <SideContainer>
                            <UserInfoBox>
                                <UserImg />
                                <UserName>username</UserName>
                                <Icon src={isLight ? blackHeart : whiteHeart} />
                            </UserInfoBox>
                            <PhotoInfoBox>
                                <Icon src={commentIcon} />
                                <CommentBox>
                                    (comment: example)
                                </CommentBox>
                                <TagBox>
                                    <Icon src={tagIcon} />
                                    (tag: example)
                                </TagBox>
                                <Form>♡
                                    <Input placeholder="댓글 달기" />
                                    <Button>게시</Button>
                                </Form>
                            </PhotoInfoBox>
                        </SideContainer>
                    </Container>
                ) : (
                    null
                )
                : null}
        </>
    );
}
export default Feed;