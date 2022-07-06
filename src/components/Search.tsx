import { gql, useQuery } from "@apollo/client";

const SEARCH_QUERY = gql`
    query search(
        $keyword:String){
        search(
            keyword:$keyword) {
            username
        }
    }
`;

export default function Search(keyword: string) {
    const { data } = useQuery(SEARCH_QUERY, {
        variables: {
            keyword
        },
    });
    const result = data?.search;
    return result;
}