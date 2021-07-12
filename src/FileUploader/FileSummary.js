import React from 'react';
import { Image, Tag } from 'antd';

///uploads
const FileSummary = (props) => {

  const {
    fileList,
    fileTitle,
    fileDescription,
    selectedTypes,
    selectedCourse,
    /*,
    setFileTitle,
    setFileList,
    setFileDescription*/
  } = props;

  return (
  <div style={{marginTop:'100px'}}>
    <h1>{fileTitle}</h1>
    <p>{fileDescription}</p>
    <p>Materia: {selectedCourse}</p>
    <div>
      <p>Tipo de contribución</p>
      {selectedTypes.map(t => (
        <Tag>{t}</Tag>
      ))}
    </div>
    <br />
    <br />
    <br />        
    <h3>Archivos incluidos</h3>
    <div>
    {fileList.map(f => (
      <Image
       width={200}
       src={f.thumbUrl}
      />
    ))}
    </div>


  </div>
  );
}

export default FileSummary;
