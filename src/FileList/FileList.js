import React from 'react';
import FileListHeader from './FileListHeader';
import FileListContents from './FileListContents';
import './FileList.css';

const FileList = () => {
  return (
  <div className="file-list-container">
    <FileListHeader />
    <FileListContents />
  </div>
  );
}

export default FileList;
