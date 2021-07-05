import React from 'react';
import { Tag, Select, Input } from 'antd';

const { TextArea } = Input;

const FileDetailsForm = () => {

  return (
  <div>
    <h1>Datos del archivo</h1>
    <br />
    <br />
    <Input className="file-title" placeholder="Titulo" />
    <br />
    <br />
    <TextArea rows={4} placeholder="Descripción del aporte" />
    <br />
  </div>
  );
}

export default FileDetailsForm;
