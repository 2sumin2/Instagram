import { gql, useQuery } from "@apollo/client";

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
function FindUserName() {
  const token = localStorage.getItem("TOKEN");
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });
  const username = data?.me?.username;
  return (<span>{username}</span>);
}


export default FindUserName;