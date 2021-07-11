import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import FileDetailsForm from './FileDetailsForm';
import FileUploader from './FileUploader';
import FileSummary from './FileSummary';
import LoadingIndicator from '../Loading/LoadingIndicator';
import { gql, useQuery } from "@apollo/client";
import './Uploader.css';

const { Step } = Steps;

const GET_CONTRIB_TYPES = gql`
  query GetContribTypes {
    contribTypes {
      id
      name
    }
  }
`;

const UploaderSteps = () => {

  const [currentStep, setCurrentStep] = useState(0);

  const [previewVisible, setPreviewVisible] =  useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  //
  const [fileTitle, setFileTitle] = useState("");
  const [fileDescription, setFileDescription] = useState("");

  const {data, error, loading } = useQuery(GET_CONTRIB_TYPES);

  if(error)
    return <p>Error!</p>;

  if(loading)
    return <LoadingIndicator />;

  if(!data.contribTypes && !loading)
    return <p>Error</p>;
    
    const detailsProps = {
      fileTitle,
      setFileTitle,
      fileDescription,
      setFileDescription,
      data
    };

    const uploaderProps = {
      previewVisible,
      setPreviewVisible,
      previewImage,
      setPreviewImage,
      previewTitle,
      setPreviewTitle,
      fileList,
      setFileList
    };

    const summaryProps = {
      fileList,
      setFileList,
      fileTitle,
      setFileTitle,
      fileDescription,
      setFileDescription
    };

  const steps = [
    {
      title: "Detalles de archivo.",
      content: <FileDetailsForm {...detailsProps} />,
    },
    {
      title: "Archivos a subir (opcional).",
      content: <FileUploader {...uploaderProps} />,
    },
    {
      title: "Revisar y subir",
      content: <FileSummary {...summaryProps} />,
    },
  ];

  const previous = () => setCurrentStep(currentStep-1);
  const next = () => setCurrentStep(currentStep+1);

  return(
  <div className="uploader-container">
    <Steps current={currentStep}>
      {steps.map(item => (
        <Step key={item.title} title={item.title} />
      ))}
    </Steps>

    <div className="steps-content" style={{marginTop:50}}>
      {steps[currentStep].content}
    </div>

    <div className="steps-action" style={{marginTop:50}}>
      {currentStep < 2 && (
        <Button
          type="primary"
          onClick={next}
          data-testid="next-button"
        >
         Siguiente
        </Button>
      )}
      {currentStep === 2 && (
        <Button
          type="primary"
          onClick={() => message.success('Archivo subido!')}
          data-testid="ok-button"
        >
          Listo
        </Button>
      )}
      {currentStep > 0 && (
        <Button
          style={{ margin: '0 8px' }}
          onClick={previous}
          data-testid="prev-button"
        >
          Anterior
        </Button>
      )}
     </div>


  </div>
  );



}

export default UploaderSteps;
