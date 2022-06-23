import { Link } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import UserName, { UserIntro, UserWebSite } from "./FindMe";
import Photo from "./Photo";
import { useQuery } from "react-query";


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
    div{
        font-weight:600;
    }
`;
const Username = styled(Item)`
    padding-right:20px;
    font-size: 28px;
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
    margin-bottom:11px;
`;
const SpanItem = styled.div`
    word-break:break-all;
    width:400px;  
    min-height:20px;
    overflow:auto;
    margin-bottom:10px;
    -ms-overflow-style: none; 
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none; 
    }
`;

function User() {
    const username = UserName();
    const userintro = UserIntro();
    const userwebsite = UserWebSite();
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
    return (
        <>
            <NavigationBar />
            <Container>
                <InnerContainer>
                    <UserImg>UserImg</UserImg>
                    <UserInfo>
                        <InfoBox>
                            <div>
                                <Username>{username}</Username>
                                <Link to={`/edit/user`}>
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
                                            <p>{userwebsite}</p>
                                            <p>{userintro}</p>
                                        </SpanItem>
                                    </>
                                    : null
                                : null
                        }

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