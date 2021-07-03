import React from 'react';
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id,
      username
      avatar
    }
  }
`;

const Home = () => {

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: 1 },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div key={data.user.id}>
      <p>
        {data.user.id}: {data.user.username}
      </p>
    </div>
  );


}

export default Home;
