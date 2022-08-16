import { useNavigate, useParams } from "react-router-dom";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { ContentContainer, InfoBox, InnerContainer, Item, ItemBox, ItemBoxNew, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useMutation, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";
import UserName from "./FindMe";
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";


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

export const TriangleOne = styled.div`
    position:relative; 
    width:30px; 
    height:47px; 
    margin-left:15px;
    margin-bottom:10px;
    color: #FFF; 
    border-radius: 10px; 

    content:""; 
    position: absolute; 
    border-left: 15px solid transparent; 
    border-right: 15px solid transparent; 
    border-bottom: 15px solid #b3b3b3;
    z-index:1;
    opacity:15%;
`;

export const TriangleTwo = styled(TriangleOne)`
    margin-top:2px;
    border-bottom: 15px solid ${props => props.theme.bgColor};
    z-index:3;
    opacity:100%;  
`;

export const UserBox = styled.div`
    background:#b3b3b3;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 0px #b3b3b3;
    color:${props => props.theme.textColor};
    width: 250px;
    max-height: 300px;
    overflow: auto;
    position:absolute;
    z-index: 1;
    top:250px;
    display:grid;
    grid-row: auto;
    gap:1px;
    margin-left:-100px;
    -ms-overflow-style: none;
    scrollbar-width: none; 
    &::-webkit-scrollbar {
    display: none; 
    }
`;
export const UserItem = styled.button`
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
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
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
                        <ItemBoxNew onClick={() => { setShowFollowers(!showFollowers) }}>
                            <Item><div>팔로워</div></Item>
                            <Item>{followers ? followers?.seeFollowers?.totalFollowers : 0}</Item>
                            {
                                width && width > 800 && followers && showFollowers ? followers?.seeFollowers?.totalFollowers === 0 ? null :
                                    <>
                                        <TriangleOne></TriangleOne>
                                        <TriangleTwo></TriangleTwo>
                                        <UserBox>
                                            {followers?.seeFollowers?.followers.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) =>
                                                <UserItem key={index} onClick={() => { navigate(`/user/${data['username']}`) }}>{data['username']}</UserItem>)}
                                        </UserBox>
                                    </> : null
                            }
                        </ItemBoxNew>
                        <ItemBoxNew onClick={() => { setShowFollowing(!showFollowing) }}>
                            <Item><div>팔로잉</div></Item>
                            <Item>{following ? following?.seeFollowing?.totalFollowing : 0}</Item>
                            {
                                width && width > 800 && following && showFollowing ? following?.seeFollowing?.totalFollowing === 0 ? null :
                                    <>
                                        <TriangleOne></TriangleOne>
                                        <TriangleTwo></TriangleTwo>
                                        <UserBox>
                                            {following?.seeFollowing?.following.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) =>
                                                <UserItem key={index} onClick={() => { navigate(`/user/${data['username']}`) }}>{data['username']}</UserItem>)}
                                        </UserBox>
                                    </> : null
                            }
                        </ItemBoxNew>
                    </InfoBox>
                    {
                        width && width > 800 ?
                            <>
                                <SpanItem>
                                    {user?.search?.users[0] ? <p><a href={user.search?.users[0]['website']} target="_blank">{user.search?.users[0]['website']}</a></p> : null}
                                    {user?.search?.users[0] ? <p>{user.search?.users[0]['intro']}</p> : null}
                                </SpanItem>
                            </>
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