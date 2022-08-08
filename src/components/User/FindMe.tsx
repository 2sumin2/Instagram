import { gql, useQuery } from "@apollo/client";

const ME_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
        id      
        username
        email
        statement
        website
        intro
        createAt
        updateAt    
        }
  }
`;

const token = localStorage.getItem("TOKEN");

export default function UserName() {
  var { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const username = data?.me?.username;
  return username;
}

export function UserId() {
  var { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const id = data?.me?.id;
  return id;
}

export function UserStatement() {
  var { data } = useQuery(ME_QUERY, {
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

export function UserWebSite() {
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const website = data?.me?.website;
  return website;
}

export function UserIntro() {
  const { data } = useQuery(ME_QUERY, {
    variables: {
      token
    },
  });

  const intro = data?.me?.intro;
  return intro;
}