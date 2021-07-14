import React from 'react';
import FileListHeader from './FileListHeader';
import FileListContents from './FileListContents';
import { gql, useQuery } from "@apollo/client";
import './FileList.css';

const GET_CONTRIB_FILES = gql`
  query GetContributions {
    classMaterials {
      id
      name
      filePath
      contribTypes
      course
    }
  }
`;

const GET_CONTRIB_TYPES = gql`
  query GetContribTypes {
    contribTypes {
      id
      name
    }
  }
`;

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
    }
  }
`;


const FileList = () => {

  //const contribFiles = useQuery(GET_CONTRIB_FILES);

  return (
  <div className="file-list-container">
    <FileListHeader />
    <FileListContents />
  </div>
  );
}

export default FileList;
