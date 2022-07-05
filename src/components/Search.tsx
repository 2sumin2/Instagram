import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

interface iForm {
    keyword: string
}

const SEARCH_QUERY = gql`
    query search(
        $keyword:String){
        modify(
            keyword:$keyword) {
            [ ]
        }
    }
`;

function Search({ keyword }: iForm) {
    const { data } = useQuery(SEARCH_QUERY, {
        variables: {
            keyword
        },
    });
    const result = data?.search;
    return result;
}
export default Search;