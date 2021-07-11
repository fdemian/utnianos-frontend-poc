import React from 'react';
import { Image } from 'antd';

///uploads
const FileSummary = (props) => {

  const {
    fileList,
    setFileList,
    fileTitle,
    setFileTitle,
    fileDescription,
    setFileDescription
  } = props;

  /*
  console.clear();
  console.log(props);
  console.log("_______");
  */
  return (
  <div>
    <h1>{fileTitle}</h1>
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
