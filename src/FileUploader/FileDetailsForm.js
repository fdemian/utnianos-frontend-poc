import React from 'react';
import { Form, Input, Select } from 'antd';
import './Uploader.css';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const formRules = {
'titulo': [
  {
   required: true,
   message: 'El aporte necesita un titulo.',
 }
],
'descripcion': [
  {
   required: true,
   message: 'Da una breve descripción del apunte.',
  }
],
'tipoApunte': [
  {
    required: true,
    message: 'Elija al menos un tipo de apunte.',
  }]
};

const FileDetailsForm = (props) => {

  const {
    setFileTitle,
    setFileDescription,
    selectedTypes,
    setSelectedTypes,
    setSelectedCourse,
    contributions,
    courseData
  } = props;


  const onTitleChange = (e) => setFileTitle(e.target.value);
  const onDescriptionChange = (e) => setFileDescription(e.target.value);
  const onContribTypeChange = (e) => setSelectedTypes(e);
  const onCourseChange = (s) => setSelectedCourse(s);

  if(!courseData || !contributions)
    return null;

  const { contribTypes } = contributions;
  const { courses } = courseData;

  return (
  <>
    <h1 className="details-title">Datos del archivo</h1>
    <br />
    <br />
    <Form
       {...layout}
       name="details-form"
       role="form"
       className="details-form"
       initialValues={{ remember: true }}
     >
     <Form.Item
       label=""
       name="title"
       rules={formRules['title']}
      >
       <Input
          onChange={onTitleChange}
          name="title"
          className="input-field"
          placeholder=" Ingrese un título."
       />
      </Form.Item>
      <Form.Item
        label=""
        name="description"
        rules={formRules['descripcion']}
       >
        <TextArea
           style={{width:580, height:200}}
           onChange={onDescriptionChange}
           name="description"
           className="input-field"
           placeholder=" Ingrese una descripción."
           maxWidth={700}
           width={700}
           height={500}
        />
       </Form.Item>
       <Form.Item
        label=""
        name="subject"
        rules={[]}
       >
        <Select
          name="subject"
          defaultValue="default"
          style={{ width: 560 }}
          onChange={onCourseChange}
        >
          <Option value="default">
            Seleccione materia
          </Option>
          {courses.map(c => (
            <Option value={c.name}>{c.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
       label=""
       name="Tipo de apunte"
       rules={formRules['tipoApunte']}
      >
        <Select
          mode="multiple"
          style={{ width: 560 }}
          placeholder="Elija un o más tipo(s) de apunte(s)."
          defaultValue={selectedTypes}
          onChange={onContribTypeChange}
          >
          {contribTypes.map(a => (
            <Option value={a.name}>{a.name}</Option>
          ))}
        </Select>
     </Form.Item>

    </Form>
  </>
  );
}

export default FileDetailsForm;
