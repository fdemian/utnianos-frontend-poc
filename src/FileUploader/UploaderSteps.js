import React, { useState, useRef } from 'react';
import Steps from 'antd/es/steps';
import Button from 'antd/es/button';
import { Navigate } from 'react-router-dom';
import FileDetailsForm from './FileDetailsForm';
import FileSummary from './FileSummary';
import LoadingIndicator from '../Loading/LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck as checkIcon,
  faArrowLeft as arrowLeft,
  faArrowRight as arrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from "@apollo/client";
import { GET_CONTRIB_TYPES, GET_COURSES, ADD_CONTRIB } from './Queries';
import { getIsMobile } from '../App/utils';
import './Uploader.css';

const { Step } = Steps;

const UploaderSteps = () => {

  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [fileDescription, setFileDescription] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileTitle, setFileTitle] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const contribQuery = useQuery(GET_CONTRIB_TYPES);
  const courseQuery = useQuery(GET_COURSES);
  const [addContrib, response] = useMutation(ADD_CONTRIB);

  let error = contribQuery.error || courseQuery.error;
  let loading = contribQuery.loading || courseQuery.loading;

  if(error)
    return <p>Error!</p>;

  if(loading)
    return <LoadingIndicator />;

 if(response.data && response.data.addContrib.ok)
    return <Navigate to="/classnotes" />

    const contributions = contribQuery.data;
    const courseData = courseQuery.data;
    const isMobile = getIsMobile();


  const detailsProps = {
    fileTitle,
    setFileTitle,
    containerRef,
    selectedTypes,
    setSelectedTypes,
    setSelectedCourse,
    contributions,
    courseData,
    mobile: isMobile
  };

  const summaryProps = {
    fileList,
    fileTitle,
    fileDescription,
    selectedTypes,
    selectedCourse,
    setFileTitle,
    setFileList,
  };

  const onFinish = () => {
    const files = fileList.map(f => f.response);
    const variables = {
      title: fileTitle,
      description: JSON.stringify(fileDescription),
      types: selectedTypes.join(),
      course: selectedCourse,
      filesList: files
    };

    addContrib({ variables: variables});
  }

  const steps = [
    {
      title: isMobile ? "Detalles" : "Detalles de archivo.",
      content: <FileDetailsForm {...detailsProps} />,
    },
    {
      title: isMobile ? "Confirmar" : "Revisar y subir",
      content: <FileSummary {...summaryProps} />,
    }
  ];

  const previous = () => setCurrentStep(currentStep-1);
  const next = () => {
    if(currentStep === 0){
      setFileDescription(containerRef.current.getContent());
    }
    setCurrentStep(currentStep+1);
  }

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

    <div className="steps-action">
      {currentStep > 0 && (
        <Button
          size="large"
          style={{ margin: '0 8px' }}
          onClick={previous}
          data-testid="prev-button"
        >
          <FontAwesomeIcon icon={arrowLeft} />
          &nbsp; Anterior
        </Button>
      )}
      {currentStep < 1 && (
        <Button
          size="large"
          type="primary"
          onClick={next}
          data-testid="next-button"
        >
          Siguiente &nbsp;
         <FontAwesomeIcon icon={arrowRight} />
        </Button>
      )}
      {currentStep === 1 && (
        <Button
          size="large"
          type="primary"
          onClick={onFinish}
          data-testid="ok-button"
        >
          Listo &nbsp;
          <FontAwesomeIcon icon={checkIcon} />
        </Button>
      )}
     </div>

     <br />

  </div>
  );



}

export default UploaderSteps;
