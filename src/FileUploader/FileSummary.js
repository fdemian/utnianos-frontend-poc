import React from 'react';
import Tag from 'antd/es/tag';
import Upload from 'antd/es/upload';
import message from 'antd/es/message';

import './Uploader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileList from './FileList';
import {
  faUpload as uploadIcon
} from '@fortawesome/free-solid-svg-icons';
import { DefaultRenderer }  from 'elementary-editor';

const actionURL = '/api/uploads';

const { Dragger } = Upload;

const FileSummary = (props) => {

  const {
    fileList,
    setFileList,
    fileTitle,
    selectedTypes,
    selectedCourse,
    fileDescription
  } = props;

  const uploaderProps = {
    name: 'file',
    multiple: true,
    action: actionURL,
    disabled: false,
    showUploadList:false,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        //console.log(info.file, info.fileList);
        console.log("Uploading");
      }
      if (status === 'done') {
        message.success(`${info.file.name} archivo subido correctamente.`);
        setFileList([...fileList, info.file]);
      } else if (status === 'error') {
        message.error(`${info.file.name} hubo un error al subir el archivo.`);
      }
    }
  };

  return (
  <div className="details-container">
    <h1 className="details-title">{fileTitle}</h1>
    <DefaultRenderer raw={fileDescription} />
    <p>Materia: {selectedCourse}</p>
    <div className="contribution-tags">
      <p>Tipo de contribución</p>
      {selectedTypes.map(t => (
        <Tag>{t}</Tag>
      ))}
    </div>
    <br />
    <br />
    <br />

    <h2 style={{textAlign:'center'}}>Archivos a subir</h2>
    <br />
    <Dragger
       {...uploaderProps}
       data-testid="file-uploader"
    >
      <p className="ant-upload-drag-icon">
        <FontAwesomeIcon icon={uploadIcon} size="2x" />
      </p>
      <p className="ant-upload-text">
        Hace click o arrastra un archivo para subirlo al servidor.
      </p>
      <p className="ant-upload-hint">Podes subir uno o varios archivos.</p>
    </Dragger>

    <FileList fileList={fileList} setFileList={setFileList} />
  </div>
  );
}

export default FileSummary;
