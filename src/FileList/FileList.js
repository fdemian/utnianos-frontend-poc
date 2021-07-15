import React, { useState } from 'react';
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
      course {
        id
        name
      }
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

  const courses = useQuery(GET_COURSES);
  const contribTypes = useQuery(GET_CONTRIB_TYPES);
  const contribFiles = useQuery(GET_CONTRIB_FILES);

  const [coursesFilter, setCoursesFilter] = useState([]);
  const [contribsFilter, setContribsFilter] = useState([]);
  const [nameFilter, setNameFilter] = useState(null);
  
  return (
  <div className="file-list-container">
    <FileListHeader
      setCoursesFilter={setCoursesFilter}
      setContribsFilter={setContribsFilter}
      setNameFilter={setNameFilter}
      coursesList={courses}
      contribTypesList={contribTypes}
    />
    <FileListContents
      coursesFilter={coursesFilter}
      contribsFilter={contribsFilter}
      nameFilter={nameFilter}
      data={contribFiles}
    />
  </div>
  );
}

export default FileList;
