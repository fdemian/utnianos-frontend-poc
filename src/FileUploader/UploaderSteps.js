import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import FileDetailsForm from './FileDetailsForm';
import FileUploader from './FileUploader';
import './Uploader.css';

const { Step } = Steps;

const steps = [
  {
    title: "Detalles de archivo.",
    content: <FileDetailsForm />,
  },
  {
    title: "Archivos a subir (opcional).",
    content: <FileUploader />,
  },
  {
    title: "Revisar y subir",
    content: <p>'Last-content'</p>,
  },
];


const UploaderSteps = () => {

  const [currentStep, setCurrentStep] = useState(0);
  //const [isStateValid, setIsStateValid ] = useState(1);

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
