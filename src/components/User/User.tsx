import { useParams } from "react-router-dom";
import styled from "styled-components";
import NavigationBar from "../Navigation/NavigationBar";
import UserName from "./FindMe";
import GetToken from "../GetToken";
import Me from "./Me";
import Other from "./Other";


const Container = styled.div`
    height:max-content;
    max-height:250px;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
`;
export const ContentContainer = styled.div`
    background-color: inherit;
    flex-direction: column;
    display:flex;
    align-items:center;
    padding-top: 20px;
`;
export const InnerContainer = styled(Container)`
    max-width:750px;
    width:100%;
    padding:40px;
    height: max-content;
    align-items:flex-start;
    flex-direction:row;
    background-color: inherit;
    border-bottom: 2px solid #9e9e9e;
    align-items: center;
`;
export const UserImg = styled.div`
    width:28vw;
    height:28vw;
    max-width:170px;
    max-height:170px;
    border-radius: 50%;
    background-color: #8b8b8b;
`;
export const UserInfo = styled.div`
    height:250px;
    width: 60vw;
    max-width:500px;
    display:flex;
    flex-direction: column;
    padding: 50px 50px 50px 5vw;
`;
export const InfoBox = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom:10px;
`;
export const ItemBox = styled.div`
    display:flex;
    flex-direction: row;
    padding-right: 10px;
`;
export const ItemBoxNew = styled(ItemBox)`
    cursor: pointer;
`;
export const Item = styled.span`
    padding-bottom:10px;
    padding-right:10px;
    min-width:max-content;
    width: 50px;
    font-size: 16px;
    div{
        font-weight:600;
    }
`;
export const Username = styled(Item)`
    padding-right:20px;
    font-size: 30px;
    font-family: 'BenchNine', sans-serif;
`;
export const PhotoBox = styled.div`
    height: max-content;
    display:grid;
    grid-template-columns: repeat(3, minmax(20px,245px));
    grid-template-rows: max-content auto;
    grid-gap:8px;
    padding-bottom: 100px;
    padding: 0;
`;
export let Btn = styled.button`
    height: max-content;
    padding:3px;
    border:1px solid #c0c0c0;
    background: inherit;
    margin-bottom:11px;
`;
export const SpanItem = styled.div`
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
export const Logo = styled(InnerContainer)`
    margin:20px;
    padding:60px;
    border-bottom: 0;
    justify-content: center;
    border-top: 2px solid #9e9e9e;
    color: ${props => props.theme.accentColor};
`;
export const NothingSpan = styled.span`
    color: ${props => props.theme.textColor};
    font-size:12px;
    padding:100px;
`;

function User() {
    const myname = UserName();
    let { username } = useParams();
    return (
        <>
            <GetToken />
            <NavigationBar />
            <Container>
                {myname === username ?
                    <Me />
                    :
                    <Other />}
                <Logo>
                    Inspacegram
                </Logo>
            </Container>
        </>
    );
}
export default User;