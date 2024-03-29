import styled from "styled-components";
import homeIcon from "../../image/home.png";
import exploreIcon from "../../image/explore.png";
import userIcon from "../../image/user.png";
import sendIcon from "../../image/send.png";
import Upload from "./UploadFeed";
import { Link } from "react-router-dom";
import { useQuery as useReactQuery } from "react-query";
import { useState } from "react";
import UserName from "../User/FindMe";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import SwitchThemes from "./SwitchThemes";
import Search from "./Search";


const ContainerBox = styled.div`
    background: linear-gradient(45deg, #020e31, #562b74, #f97375);
    display:flex;
    position:fixed;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 60px;
    z-index: 2;
`;
const Container = styled.div`
    max-width: 900px;
    width:100%;
    padding: 0 10px;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
`;
const ItemContainer = styled.div`
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
    cursor:pointer;
    user-select:none;
`;
export const Icon = styled.img`
    height:25px;
    width:25px;
    margin: 0 10px;
    :nth-child(2n+1){
        cursor: pointer;
    }
    user-select:none;
`;

const SEARCH_QUERY = gql`
    query Search(
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

function NavigationBar() {
    const username = UserName();
    const getWidth = () => {
        return window.innerWidth;
    };
    const { data: width } = useReactQuery(
        "windowSizes",
        () => getWidth(),
        {
            refetchInterval: 100,
        }
    );
    const [keyword, setKeyword] = useState("");
    return (
        <>
            <ContainerBox>
                <Container>
                    <ItemContainer>
                        <Link to="/home">
                            <Title>Inspacegram</Title>
                        </Link>
                    </ItemContainer>
                    <ItemContainer>
                        {
                            width && width > 800 ? <Search /> : null
                        }
                    </ItemContainer>
                    <ItemContainer>
                        <Link to="/home">
                            <Icon src={homeIcon} />
                        </Link>
                        <Icon src={sendIcon} />
                        <Upload />
                        <Icon src={exploreIcon} />
                        <Link to={`/user/${username}`}>
                            <Icon src={userIcon} />
                        </Link>
                        <SwitchThemes />
                    </ItemContainer>
                </Container>
            </ContainerBox>
        </>
    );
}
export default NavigationBar;
