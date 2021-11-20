import React from 'react';
import OptionsList from './OptionsList';
import { useQuery } from "@apollo/client";
import { GET_USER } from './queries';
import './Landing.css';

const LandingPage = ({ id }) => {

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
