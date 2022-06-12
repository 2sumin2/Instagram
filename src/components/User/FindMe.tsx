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

const token = localStorage.getItem("TOKEN");

export default function UserName() {
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const username = data?.me?.username;
  return username;
}

export function UserStatement() {
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const statement = data?.me?.statement;
  return statement;
}

export function UserEmail() {
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const email = data?.me?.email;
  return email;
}