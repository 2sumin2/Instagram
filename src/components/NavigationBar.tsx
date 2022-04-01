import styled from "styled-components";
import homeIcon from "../image/home.png";
import exploreIcon from "../image/explore.png";
import userIcon from "../image/user.png";
import sendIcon from "../image/send.png";
import plusIcon from "../image/plus.png";
import { Link } from "react-router-dom";

const ContainerBox = styled.div`
    background: linear-gradient(45deg, #020e31, #562b74, #f97375);;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 60px;
    border: 0.1px solid #dfdfdf;
`;
const Container = styled.div`
    width: 900px;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
`;
const ItemContainer = styled.div`
    margin: 0 10px;
    display:flex;
    align-items:center;
    :nth-last-child(1){
        justify-content:right;
    }
`;
const Title = styled.span`
    text-align: center;
    font-family: 'Hurricane', cursive;
    color:black;
    font-size: 37px;
    color:white;
`;
const Icon = styled.img`
    height:25px;
    width:25px;
    cursor: pointer;
    margin: 0 10px;
`;
const Input = styled.input`
    align-self: stretch;
    padding-left:15px;
    font-size:15px;
    height: 37px;
    width: 250px;;
    background-color: #ececec;
    border: 0;
    border-radius: 5px;;
`;

function NavigationBar() {
    return (
        <ContainerBox>
            <Container>
                <ItemContainer>
                    <Title>Inspacegram</Title>
                </ItemContainer>
                <ItemContainer>
                    <form>
                        <Input type="text" placeholder="검색" />
                    </form>
                </ItemContainer>
                <ItemContainer>
                    <Link to="/home">
                        <Icon src={homeIcon} />
                    </Link>
                    <Icon src={sendIcon} />
                    <Icon src={plusIcon} />
                    <Icon src={exploreIcon} />
                    <Link to="/user">
                        <Icon src={userIcon} />
                    </Link>
                </ItemContainer>
            </Container>
        </ContainerBox>
    );
}
export default NavigationBar;