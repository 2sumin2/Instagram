import { Link } from "react-router-dom";
import UserName, { UserIntro, UserWebSite } from "./FindMe";
import Photo from "./Photo";
import { useQuery } from "react-query";
import { Btn, ContentContainer, InfoBox, InnerContainer, Item, ItemBox, PhotoBox, SpanItem, UserImg, UserInfo, Username } from "./User";
import { gql, useQuery as gqlQuery } from "@apollo/client";
import styled from "styled-components";
import { UserBox, UserItem } from "./Other";
import { useNavigate, useParams } from "react-router-dom";
import { ReactChild, ReactFragment, ReactPortal } from "react";

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

function Me() {
    const navigate = useNavigate();
    const myname = UserName();
    const myIntro = UserIntro();
    const mywebsite = UserWebSite();
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
    const { data: followers } = gqlQuery(SEE_FOLLOWERS_QUERY, {
        variables: {
            username: myname
        },
    });
    const { data: following } = gqlQuery(SEE_FOLLOWING_QUERY, {
        variables: {
            username: myname
        },
    });
    return (
        <>
            <InnerContainer>
                <UserImg>UserImg</UserImg>
                <UserInfo>
                    <InfoBox>
                        <div>
                            <Username>{myname}</Username>
                            <Link to={`/user/${myname}/edit`}>
                                <Btn>프로필 편집</Btn>
                            </Link>
                        </div>

                    </InfoBox>
                    <InfoBox>
                        <ItemBox>
                            <Item><div>게시물</div></Item>
                            <Item>0</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item><div>팔로워</div></Item>
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
                                        <p><a href={mywebsite} target="_blank" rel="noerferer">{mywebsite}</a></p>
                                        <p>{myIntro}</p>
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
export default Me;