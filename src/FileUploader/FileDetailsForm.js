import React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import { Editor } from 'elementary-editor';

import './Uploader.css';

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
    selectedTypes,
    setSelectedTypes,
    setSelectedCourse,
    contributions,
    courseData,
    containerRef,
    mobile
  } = props;

  const onTitleChange = (e) => setFileTitle(e.target.value);
  const onContribTypeChange = (e) => setSelectedTypes(e);
  const onCourseChange = (s) => setSelectedCourse(s);

  if(!courseData || !contributions)
    return null;

  const { contribTypes } = contributions;
  const { courses } = courseData;
  const inputClass = mobile ? "input-mobile" : "input-desktop";

  return (
  <>
    <h1 className="details-title">Datos del archivo</h1>
    <br />
    <br />
    <Form
       {...layout}
       name="details-form"
       role="form"
       className={"details-form" + (mobile ? "-mobile" : "")}
       initialValues={{ remember: true }}
       onFinish={null}
       onFinishFailed={null}
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
        <div style={{width:580, height:200, marginBottom: '100px'}}>
          <Editor
            initialState={null}
            containerRef={containerRef}
            placeholder=" Ingrese una descripción."
          />
        </div>
       </Form.Item>
       <Form.Item
        label=""
        name="subject"
        rules={[]}
       >
        <Select
          name="subject"
          defaultValue="default"
          className={inputClass}
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
          className={inputClass}
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
