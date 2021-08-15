import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf as pdfIcon,
  faImage as imageIcon,
  faFileArchive as fileArchive,
  faTrash as trashIcon
} from '@fortawesome/free-solid-svg-icons';
import './Uploader.css';

const getFileTypeName = (type) => {
  switch(type) {
    case "image/png":
    case "image/jpg":
      return "Imagen";
    case "application/pdf":
      return "PDF";
    default:
      return "Archivo";
  }
}

const getFileIcon = (type) => {
  switch(type) {
    case "image/png":
      return imageIcon;
    case "application/pdf":
      return pdfIcon;
    default:
      return fileArchive;
  }
}

const FileList = ({fileList, setFileList}) => {

  if(fileList.length <= 0)
    return null;

  const removeItem = (item) => setFileList(fileList.filter(f => f.uid !== item.uid));

  return (
  <div className="file-list-container">
  <h3>Archivos subidos</h3>
  <List
     bordered={true}
     itemLayout="horizontal"
     dataSource={fileList}
     renderItem={item => (
       <List.Item
        actions={[
          <FontAwesomeIcon
            icon={trashIcon}
            onClick={() => removeItem(item)}
            size="2x"
          />
        ]}
      >
         <List.Item.Meta
           avatar={
            <FontAwesomeIcon icon={getFileIcon(item.type)} size="2x" />}
           title={<a href="item.link">{item.name}</a>}
           description={`${getFileTypeName(item.type)} | ${item.size/1000}KB`}
         />
       </List.Item>
     )}
  />
  </div>
  );
}

export default FileList;
