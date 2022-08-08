import { useParams } from "react-router-dom";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { ContentContainer, InfoBox, InnerContainer, Item, ItemBox, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useMutation, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";
import UserName from "./FindMe";


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
            ok
            error
            users {
                id
                email
                username
                statement
                intro
                website
                createAt
                updateAt
            }
            count
        }
    }
`;

const FOLLOW_USER_MUTATION = gql`
    mutation FollowUser(
        $username: String!, 
        $followUserId: Int!) {
        followUser(
            username: $username, 
            id: $followUserId) {
                ok
                error
        }
    }
`;

function Other() {
    const myname = UserName();
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
    const onCompleted = (data: any) => {
        const {
            FollowUser: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
    };
    const [follow] = useMutation(FOLLOW_USER_MUTATION, {
        onCompleted,
    });
    const onClickFollow = () => {
        follow({
            variables: {
                username: myname,
                followUserId: user.search.users[0]['id']
            }
        });
    };
    return (
        <>
            <InnerContainer>
                <UserImg>UserImg</UserImg>
                <UserInfo>
                    <InfoBox>
                        <div>
                            <Username>{username}</Username>
                            <Follow onClick={onClickFollow}>팔로우</Follow>
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
                                        {user?.search?.users[0] ? <p><a href={user.search?.users[0]['website']} target="_blank">{user.search?.users[0]['website']}</a></p> : null}
                                        {user?.search?.users[0] ? <p>{user.search?.users[0]['intro']}</p> : null}
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