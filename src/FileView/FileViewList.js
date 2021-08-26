import React from 'react';
import DownloadLink from "react-download-link";
import List from 'antd/es/list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload as downloadIcon } from '@fortawesome/free-solid-svg-icons';
import {
  getFileTypeName,
  getFileIcon,
  isImageType
} from '../FileUploader/utils';
import {
  getFullURL,
  getDataFromURL,
  splitItemPath
} from './utils';
import ImageList from './ImageList';
import './FileView.css';

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
               <DownloadLink
                  label={
                    <FontAwesomeIcon
                       icon={downloadIcon}
                       onClick={null}
                       size="2x"
                       color="black"
                     />
                  }
                  filename={splitItemPath(item.path)}
                  exportFile={() => Promise.resolve(getDataFromURL(getFullURL(item.path)))}
                />

              ]}
            >
            <List.Item.Meta
              avatar={
               <FontAwesomeIcon icon={getFileIcon(item.type)} size="2x" />
              }
              title={
                <a href={getFullURL(item.path)} rel="noreferrer" target="_blank">
                  {splitItemPath(item.path)}
                </a>
              }
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
