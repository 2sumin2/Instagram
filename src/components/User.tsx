import styled from "styled-components";
import NavigationBar from "./NavigationBar";

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
    width:250px;
    height:250px;
    margin-right:50px;
    border-radius: 50%;
    background-color: #8b8b8b;
`;
const UserInfo = styled.div`
    height:250px;
    width:600px;
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    padding:50px ;
`;
const ItemBox = styled.div`
    display:flex;
    align-items: center;
    flex-direction: column;
`;
const Item = styled.span`
    padding-bottom:10px;
    font-size: 18px;
`;
const PhotoBox = styled.div`
    height: max-content;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 250px auto;
    grid-gap:10px;
    padding-bottom: 100px;
`;
const Photo = styled.div`
    height:250px;
    width:250px;
    background-color: #8b8b8b;
`;

function User() {
    return (
        <>
            <NavigationBar />
            <Container>
                <InnerContainer>
                    <UserImg>UserImg</UserImg>
                    <UserInfo>
                        <ItemBox>
                            <Item>0</Item>
                            <Item>게시물</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item>0</Item>
                            <Item>팔로워</Item>
                        </ItemBox>
                        <ItemBox>
                            <Item>0</Item>
                            <Item>팔로잉</Item>
                        </ItemBox>
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