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

const FOLLOW_MUTATION = gql`
    mutation follow(
        $othername: String!, 
        $myname: String!) {
        follow(
            othername: $othername, 
            myname: $myname) {
            ok
            error
        }
    }
`;

const SEE_FOLLOWERS_QUERY = gql`
    query seeFollowers(
        $username: String!) {
        seeFollowers(username: $username) {
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

const SEE_FOLLOWING_QUERY = gql`
    query seeFollowing(
        $username: String!) {
        seeFollowing(username: $username) {
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
            follow: { ok, error },
        } = data;
        if (!ok) {
            alert(error);
        }
    };
    const [follow] = useMutation(FOLLOW_MUTATION, {
        onCompleted,
    });
    const onClickFollow = () => {
        follow({
            variables: {
                myname,
                othername: user.search.users[0]['username']
            }
        });
        window.location.reload();
    };
    const { data: followers } = gqlQuery(SEE_FOLLOWERS_QUERY, {
        variables: {
            username: user?.search?.users[0]['username']
        },
    });
    const { data: following } = gqlQuery(SEE_FOLLOWING_QUERY, {
        variables: {
            username: user?.search?.users[0]['username']
        },
    });
    const [areFollowing, setAreFollowing] = useState(false);
    useEffect(() => {
        setAreFollowing(false);
        if (followers?.seeFollowers?.totalFollowers && followers?.seeFollowers?.followers.map((data: { [x: string]: string | undefined; }) =>
            data['username'] === myname)) {
            setAreFollowing(true);
        }
    }, [username, followers, following]);
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
                            <Item>{followers ? followers?.seeFollowers?.totalFollowers : 0}</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로잉</div></Item>
                            <Item>{following ? following?.seeFollowing?.totalFollowing : 0}</Item>
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