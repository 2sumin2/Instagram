import { useParams } from "react-router-dom";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { ContentContainer, InfoBox, InnerContainer, Item, ItemBox, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useMutation, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";
import UserName from "./FindMe";
import { useEffect, useState } from "react";


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
    color:${props => props.theme.textColor};
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
    mutation followUser(
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

const FOLLOWERS_QUERY = gql`
    query followers(
        $username: String!) {
        followers(username: $username) {
            ok
            error
            followers {
                id
                email
                username
                statement
                intro
                website
                createAt
                updateAt
            }
            totalFollowers
        }
    }
`;

const FOLLOWING_QUERY = gql`
    query following(
        $username: String!) {
        following(username: $username) {
            ok
            error
            following {
                id
                email
                username
                statement
                intro
                website
                createAt
                updateAt
            }
            totalFollowing
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
            followUser: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
    };
    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        onCompleted,
    });
    const onClickFollow = () => {
        followUser({
            variables: {
                username: myname,
                followUserId: user.search.users[0]['id']
            }
        });
    };
    const { data: followers } = gqlQuery(FOLLOWERS_QUERY, {
        variables: {
            username: user?.search?.users[0]['username']
        },
    });
    const { data: following } = gqlQuery(FOLLOWING_QUERY, {
        variables: {
            username: user?.search?.users[0]['username']
        },
    });
    const [areFollowing, setAreFollowing] = useState(false);
    useEffect(() => {
        setAreFollowing(false);
    }, [username]);
    useEffect(() => {
        if (followers?.followers?.totalFollowers && followers?.followers?.followers.map((data: { [x: string]: string | undefined; }) =>
            data['username'] === myname)) {
            setAreFollowing(true);
        }
    }, [username, followers]);
    return (
        <>
            <InnerContainer>
                <UserImg>UserImg</UserImg>
                <UserInfo>
                    <InfoBox>
                        <div>
                            <Username>{username}</Username>
                            {areFollowing ? <Following>팔로우 취소</Following> : <Follow onClick={onClickFollow}>팔로우</Follow>}
                        </div>
                    </InfoBox>
                    <InfoBox>
                        <ItemBox>
                            <Item><div>게시물</div></Item>
                            <Item>0</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로워</div></Item>
                            <Item>{followers ? followers?.followers?.totalFollowers : 0}</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로잉</div></Item>
                            <Item>{following ? following?.following?.totalFollowing : 0}</Item>
                        </ItemBox>
                    </InfoBox>
                    {
                        width ?
                            width > 800 ?
                                <>
                                    <SpanItem>
                                        {user?.search?.users[0] ? <p><a href={user.search?.users[0]['website']} target="_blank" rel="noerferer">{user.search?.users[0]['website']}</a></p> : null}
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