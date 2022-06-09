import { gql, useQuery } from "@apollo/client";

interface iForm {
  find: string;
}
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

function FindMe({ find }: iForm) {
  const token = localStorage.getItem("TOKEN");
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const username = data?.me?.username;
  return (<> {find === "username" ? username : null}</>);
}


export default FindMe;
