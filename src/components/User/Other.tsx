import { useParams } from "react-router-dom";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { ContentContainer, InfoBox, InnerContainer, Item, ItemBox, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";

const Follow = styled.button`
    background-color: ${props => props.theme.accentColor};
    color:${props => props.theme.bgColor};
    height: max-content;
    border:1px solid #c0c0c0;
    margin-bottom:11px;
    padding:5px;
`;

const Following = styled(Follow)`
    background: inherit;
    height: max-content;
    border:1px solid #c0c0c0;
    color:${props => props.theme.textColor};
    margin-bottom:11px;
    padding:5px;
`;

const SEARCH_QUERY = gql`
    query search(
        $keyword:String){
        search(
            keyword:$keyword) {
            username
            id
            email
            statement
            intro
            website
        }
    }
`;

function Other() {
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
    let { username } = useParams();
    const { data: user } = gqlQuery(SEARCH_QUERY, {
        variables: {
            keyword: username
        },
    });
    return (
        <>
            <InnerContainer>
                <UserImg>UserImg</UserImg>
                <UserInfo>
                    <InfoBox>
                        <div>
                            <Username>{username}</Username>
                            <Follow>팔로우</Follow>
                            <Following>팔로우 취소</Following>
                        </div>
                    </InfoBox>
                    <InfoBox>
                        <ItemBox>
                            <Item><div>게시물</div></Item>
                            <Item>0</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로워</div></Item>
                            <Item>0</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로잉</div></Item>
                            <Item>0</Item>
                        </ItemBox>
                    </InfoBox>
                    {
                        width ?
                            width > 800 ?
                                <>
                                    <SpanItem>
                                        {user?.search[0] ? <p><a href={user.search[0]['website']} target="_blank">{user.search[0]['website']}</a></p> : null}
                                        {user?.search[0] ? <p>{user.search[0]['intro']}</p> : null}
                                    </SpanItem>
                                </>
                                : null
                            : null
                    }

                </UserInfo>
            </InnerContainer>
            <ContentContainer>
                <PhotoBox>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                    <Photo></Photo>
                </PhotoBox>
            </ContentContainer>
        </>
    );
}
export default Other;