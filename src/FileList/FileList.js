import React, { useState } from 'react';
import FileListHeader from './FileListHeader';
import FileListContents from './FileListContents';
import { useQuery } from "@apollo/client";
import { GET_CONTRIB_FILES, GET_CONTRIB_TYPES, GET_COURSES } from './Queries';
import './FileList.css';

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
