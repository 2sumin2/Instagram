import { useNavigate, useParams } from "react-router-dom";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { ContentContainer, InfoBox, InnerContainer, Item, ItemBox, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useMutation, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";
import UserName from "./FindMe";
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";


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

const Full = styled.div`
    height: 100vh;
    width:100vw;
    background:black;
    opacity: 80%;
    position:fixed;
    top:0;
    left:0;
    z-index: 1;
`;
const Container = styled.div`
    width:100vw;
    height:100%;
    display:flex;
    position:fixed;
    top:320px;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding-bottom:200px;
`;

const UserBox = styled.div`
    background:${props => props.theme.textColor};
    border:2px solid ${props => props.theme.textColor};
    border-radius: 10px;
    box-shadow: 2px 2px 20px 1px #b3b3b3;
    color:black;
    width: 250px;
    max-height: 300px;
    overflow: auto;
    position:absolute;
    z-index: 1;
    top:250px;
    display:grid;
    grid-row: auto;
    gap:2px;
    margin-left:-100px;
`;

const UserItem = styled.button`
    width: 100%;
    height: 50px;
    background:inherit;
    border:0;
    background:${props => props.theme.bgColor};
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

const UNFOLLOW_MUTATION = gql`
    mutation unfollow(
        $othername: String!, 
        $myname: String!) {
        unfollow(
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
    const navigate = useNavigate();
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
    const [follow, { error: followError }] = useMutation(FOLLOW_MUTATION);
    if (followError) {
        alert(followError);
    }
    const onClickFollow = () => {
        follow({
            variables: {
                myname,
                othername: user.search.users[0]['username']
            }
        });
        window.location.reload();
    };
    const [unfollow, { error: unfollowError }] = useMutation(UNFOLLOW_MUTATION);
    if (unfollowError) {
        alert(unfollowError);
    }
    const onClickUnfollow = () => {
        unfollow({
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
                            {areFollowing ? <Following onClick={onClickUnfollow}>팔로우 취소</Following> : <Follow onClick={onClickFollow}>팔로우</Follow>}
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
                            {
                                followers ? followers?.seeFollowers?.totalFollowers === 0 ? null :
                                    <UserBox>
                                        {followers?.seeFollowers?.followers.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) =>
                                            <UserItem onClick={() => { navigate(`/user/${data['username']}`) }}>{data['username']}</UserItem>)}
                                    </UserBox> : null
                            }
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로잉</div></Item>
                            <Item>{following ? following?.seeFollowing?.totalFollowing : 0}</Item>
                            {
                                following ? following?.seeFollowing?.totalFollowing === 0 ? null :
                                    <UserBox>
                                        {following?.seeFollowing?.following.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) =>
                                            <UserItem onClick={() => { navigate(`/user/${data['username']}`) }}>{data['username']}</UserItem>)}
                                    </UserBox> : null
                            }
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
            <Container>

            </Container>
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