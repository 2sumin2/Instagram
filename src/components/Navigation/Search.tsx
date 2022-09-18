import styled from "styled-components";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import UserName from "../User/FindMe";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const Icon = styled.img`
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
    height: 37px;
    width: 250px;;
    background-color: #ececec;
    color:black;
    border: 0;
    border-radius: 5px;
`;
const SearchBox = styled.div`
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
    -ms-overflow-style: none;
    scrollbar-width: none; 
    &::-webkit-scrollbar {
    display: none; 
    }
`;
const ResultBox = styled.button`
    width: 100%;
    height: 50px;
    background:inherit;
    border:0;
    background:${props => props.theme.bgColor};
    font-size:13px;
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

function Search() {
    const navigate = useNavigate();
    const username = UserName();
    const getWidth = () => {
        return window.innerWidth;
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
                <SearchBox>
                    {
                        data?.search?.ok && data?.search?.count === 0 ?
                            <ResultNone>검색 결과 없음</ResultNone> :
                            data?.search?.users.map((data: { [x: string]: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => data['username'] === username ? null :
                                <ResultBox key={index} onClick={() => { navigate(`/user/${data['username']}`); setKeywordChange(true); }}>{data['username']}</ResultBox>)
                    }
                </SearchBox>
                : null}
        </>
    );
};

export default Search;