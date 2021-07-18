import React from 'react';
import { Spin, Tag } from 'antd';
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import './FileView.css';

const GET_COURSE_MATERIAL = gql`
  query GetCourseMaterial($id: Int!) {
    classMaterial(id: $id) {
      name
      description
      contribTypes
      course {
        id
        name
      }
    }
  }
`;

const FileView = () => {
  const params = useParams();
  const { id } = params;

  const { loading, error, data } = useQuery(GET_COURSE_MATERIAL, {
      variables: { id: id }
    });

  if(loading)
    return <Spin tip="Loading" />;

  if(error)
    return <p>Error</p>;

  const { classMaterial } = data;

  const {
   name,
   contribTypes,
   course,
   description,
  } = classMaterial;

  return (
  <>
    <h1 className="class-material-title">{name}</h1>
    <h2 className="center-margin">{course.name}</h2>
    <h3 className="center-margin">{description}</h3>
    <p className="center-margin">Tipos de contribución</p>
    <span className="center-margin">
    {contribTypes.split(',').map(t => (
      <Tag key={t}>{t}</Tag>
    ))}
    </span>
  </>
  );
}

export default FileView;
