import React from 'react';
import { List, Image, Card,} from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as eyeIcon } from '@fortawesome/free-solid-svg-icons';
import {
  getFileTypeName,
  getFileIcon,
  isImageType
} from '../FileUploader/utils';
import './FileView.css';

const splitItemPath = (path) => {
  if(path.includes("%3D"))
    return path.split("%3D")[1];

  return path;
}

const gridStyle = { width: '25%', textAlign: 'center' };

const ImageList = ({ imageList }) => {
  return(
  <Card title="Imagenes subidas">
    {imageList.map(item => (
    <Card.Grid style={gridStyle}>
      <Image src={item.path} width={200} />
    </Card.Grid>
    ))}
  </Card>
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
              title={<Link to={item.path}>{splitItemPath(item.path)}</Link>}
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
