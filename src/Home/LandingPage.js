import React from 'react';
import OptionsList from './OptionsList';
import { gql, useQuery } from "@apollo/client";
import { useAuthToken } from '../Login/authToken';
import './Landing.css';

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      username
      avatar
    }
  }
`;

const LandingPage = () => {

  const [authToken, _, _d] = useAuthToken();
  console.clear();
  console.log(authToken);
  const id = authToken['id'];

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: id },
    skip: !id
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div key={data.user.id}>
      <h2 className="welcome-text">Bienvenido {data.user.username}!</h2>
      <OptionsList />
    </div>
  );
}

export default LandingPage;
