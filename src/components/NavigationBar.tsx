import styled from "styled-components";
import homeIcon from "../image/home.png";
import exploreIcon from "../image/explore.png";
import userIcon from "../image/user.png";
import sendIcon from "../image/send.png";
import plusIcon from "../image/plus.png";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLightAtom } from "../atoms";
import Switch from "react-switch";
import { useQuery as useReactQuery } from "react-query";
import FeedUpload from "./FeedUpload";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import UserName from "./User/FindMe";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";


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
`;
const Icon = styled.img`
    height:25px;
    width:25px;
    margin: 0 10px;
    :nth-child(2n+1){
        cursor: pointer;
    }
`;
const Input = styled.input`
    align-self: stretch;
    padding-left:15px;
    font-size:15px;
    height: 37px;
    width: 250px;;
    background-color: #ececec;
    color:black;
    border: 0;
    border-radius: 5px;
`;
const SwitchBox = styled.div`
    display:flex;
    justify-content: right;
    align-items: center;
    margin-left: 5px;
`;
const CloseBtn = styled.button`
    color:white;
    background:inherit;
    border:0;
    position:fixed;
    top:15px;
    right:15px;
    font-size:30px;
    z-index: 2;
`;
const SerachingBox = styled.div`
    background:#b3b3b3;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 1px #b3b3b3;
    color:${props => props.theme.textColor};
    width: 250px;
    max-height: 300px;
    overflow: auto;
    position:fixed;
    z-index: 5;
    top:60px;
    display:grid;
    grid-row: auto;
    gap:1px;
`;

const ResultBox = styled.button`
    width: 100%;
    height: 50px;
    background:inherit;
    border:0;
    background:${props => props.theme.bgColor};
`;

const ResultNone = styled(ResultBox)`
    cursor:default;
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
    const navigate = useNavigate();
    const [uploadbox, setUploadbox] = useState(false);
    const [isLight, setLightAtom] = useRecoilState(isLightAtom);
    const username = UserName();
    const onChange = () => {
        setLightAtom((props) => !props);
    };
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
    const toggleUploadBox = () => {
        setUploadbox(!uploadbox);
    };
    const [keyword, setKeyword] = useState("");
    const [keywordChange, setKeywordChange] = useState(false);
    const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
        setKeywordChange(true);
    };
    const { data } = useQuery(SEARCH_QUERY, {
        variables: {
            keyword
        },
    });
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
                            width ?
                                width > 800 ? (
                                    <>
                                        <form>
                                            <Input
                                                type="text"
                                                placeholder="검색"
                                                onChange={onChangeKeyword}
                                                onBlur={() => {
                                                    setTimeout(() => { setKeywordChange(false) }, 3000);
                                                }} />
                                        </form>
                                        {keywordChange ?
                                            <SerachingBox>
                                                {
                                                    data?.search?.ok && data?.search?.count === 0 ?
                                                        <ResultNone>검색 결과 없음</ResultNone> :
                                                        data?.search?.users.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => data['username'] === username ? null :
                                                            <ResultBox key={index} onClick={() => { navigate(`/user/${data['username']}`); setKeywordChange(true); }}>{data['username']}</ResultBox>)
                                                }
                                            </SerachingBox>
                                            : null}

                                    </>
                                )
                                    : null
                                : null
                        }
                    </ItemContainer>
                    <ItemContainer>
                        <Link to="/home">
                            <Icon src={homeIcon} />
                        </Link>
                        <Icon src={sendIcon} />
                        <Icon src={plusIcon} onClick={toggleUploadBox} />
                        <Icon src={exploreIcon} />
                        <Link to={`/user/${username}`}>
                            <Icon src={userIcon} />
                        </Link>
                        <SwitchBox>
                            <Switch
                                onChange={onChange}
                                checked={isLight}
                                handleDiameter={13}
                                height={18}
                                width={40}
                                onColor={"#fcedee"}
                                offColor={"#341941"}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                onHandleColor={"#341941"}
                                offHandleColor={"#fcedee"}
                            />
                        </SwitchBox>
                    </ItemContainer>
                </Container>
            </ContainerBox>
            {
                uploadbox ? (
                    <>
                        <CloseBtn onClick={toggleUploadBox}>X</CloseBtn>
                        <FeedUpload />
                    </>
                ) : null
            }
        </>
    );
}
export default NavigationBar;