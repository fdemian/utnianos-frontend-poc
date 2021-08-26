import React from 'react';
import Spin from 'antd/es/spin';
import Tag from 'antd/es/tag';

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FileViewList from './FileViewList';
import { GET_COURSE_MATERIAL } from './queries';
import './FileView.css';

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
   files
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
    <br />

    <FileViewList files={files} />

  </>
  );
}

export default FileView;
