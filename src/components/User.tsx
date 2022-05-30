import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import Photo from "./Photo";

const Container = styled.div`
    height:35vh;
    display:flex;
    justify-content: center;
    background-color: #e6e6e6;
`;
const ContentContainer = styled(Container)`
    background-color: inherit;
    padding-top: 20px;
`;
const InnerContainer = styled(Container)`
    max-width:960px;
    padding:50px;
    flex-direction:rows;
    background-color: inherit;
`;

const UserImg = styled.div`
    width:230px;
    height:230px;
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
`;
const Username = styled(Item)`
    padding-bottom:10px;
    padding-right:10px;
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

const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id      
        username
        statement
        createAt
        updateAt    
        }
  }
`;

function User() {
    const token = localStorage.getItem("TOKEN");
    const { data } = useQuery(ME_QUERY, {
        variables: {
            token
        },
    });
    return (
        <>
            <NavigationBar />
            <Container>
                <InnerContainer>
                    <UserImg>UserImg</UserImg>
                    <UserInfo>
                        <InfoBox>
                            <Username>{data?.me?.username}</Username>
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