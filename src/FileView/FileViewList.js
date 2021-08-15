import React from 'react';
import { List, Image } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as eyeIcon } from '@fortawesome/free-solid-svg-icons';
import {
  getFileTypeName,
  getFileIcon,
  isImageType
} from '../FileUploader/utils';
import './FileView.css';

const splitItemPath = (path) => {
  if(path.includes("/"))
    return path.split("/")[1];

  return path;
}

const ImageList = ({ imageList }) => {
  return(
  <>
    {imageList.map(item => (
      <Image src={item.path} width={200} />
    ))}
  </>
  );

}

const FileViewList = ({ files }) => {
  const otherFiles = files.filter(f => !isImageType(f.type));
  const imageFiles = files.filter(f => isImageType(f.type));
  return (
  <div className="file-list-container">
     <h3 className="class-material-title">Archivos</h3>
     <br />
     <ImageList imageList={imageFiles} />
     <br />
     { otherFiles.length > 0 ?
     (<List
        bordered={true}
        itemLayout="horizontal"
        dataSource={otherFiles}
        renderItem={item => (
          <List.Item
             actions={[
               <FontAwesomeIcon
                  icon={eyeIcon}
                  onClick={null}
                  size="2x"
                />
              ]}
            >
            <List.Item.Meta
              avatar={
               <FontAwesomeIcon icon={getFileIcon(item.type)} size="2x" />
              }
              title={<a href={item.path}>{splitItemPath(item.path)}</a>}
              description={`Tipo de aporte: ${getFileTypeName(item.type)}`}
            />
          </List.Item>
        )}
    />)
     : null
    }
  </div>
  );
}

export default FileViewList;
