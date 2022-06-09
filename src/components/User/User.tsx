import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import Photo from "./Photo";
import FindMe from "./FindMe";


const Container = styled.div`
    height:40vw;
    max-height:250px;
    display:flex;
    justify-content: center;
    
`;
const ContentContainer = styled(Container)`
    background-color: inherit;
    padding-top: 20px;
`;
const InnerContainer = styled(Container)`
    max-width:960px;
    padding:30px;
    flex-direction:rows;
    background-color: inherit;
    border-bottom: 2px solid #9e9e9e;
`;

const UserImg = styled.div`
    width:26vw;
    height:26vw;
    max-width:170px;
    max-height:170px;

    margin-right:50px;
    border-radius: 50%;
    background-color: #8b8b8b;
`;
const UserInfo = styled.div`
    height:250px;
    width: 60vw;
    max-width:500px;
    display:flex;
    flex-direction: column;
    padding: 10px 50px 50px 50px;
`;

const InfoBox = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom:10px;
`;
const ItemBox = styled.div`
    display:flex;
    flex-direction: row;
`;
const Item = styled.span`
    padding-bottom:10px;
    padding-right:10px;
    font-size: 15px;
    min-width:max-content;
    width: 50px;
`;
const Username = styled(Item)`
    padding-bottom:10px;
    padding-right:20px;
    font-size: 25px;
`;
const PhotoBox = styled.div`
    height: max-content;
    display:grid;
    grid-template-columns: repeat(3, minmax(max-content,250px));
    grid-template-rows: max-content auto;
    grid-gap:10px;
    padding-bottom: 100px;
`;

const Btn = styled.button`
    height: max-content;
    padding:3px;
    border:1px solid #c0c0c0;
    background: inherit;
`;

function User() {
    return (
        <>
            <NavigationBar />
            <Container>
                <InnerContainer>
                    <UserImg>UserImg</UserImg>
                    <UserInfo>
                        <InfoBox>
                            <div>
                                <Username><FindMe find="username" /></Username>
                                <Link to={`/edit/user`}>
                                    <Btn>프포필 편집</Btn>
                                </Link>
                            </div>
                        </InfoBox>
                        <InfoBox>
                            <ItemBox>
                                <Item>게시물</Item>
                                <Item>0</Item>
                            </ItemBox>
                            <ItemBox>
                                <Item>팔로워</Item>
                                <Item>0</Item>
                            </ItemBox>
                            <ItemBox>
                                <Item>팔로잉</Item>
                                <Item>0</Item>
                            </ItemBox>
                        </InfoBox>
                    </UserInfo>
                </InnerContainer>
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
export default User;