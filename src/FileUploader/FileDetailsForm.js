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

const handleChange = (value) => {
  console.log(`selected ${value}`);
}

const FileDetailsForm = ({setFileTitle, setFileDescription, data}) => {

  // Finished checking login values.
  const onFinish = values => {
    console.clear();
    console.log(values);
  };

  // Fail!
  const onFinishFailed = errorInfo => {
     console.log('Failed:', errorInfo);
  };

  const { contribTypes } = data;

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
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
     >
     <Form.Item
       label=""
       name="title"
       rules={[
         {
          required: true,
          message: 'El aporte necesita un titulo.',
        }
        ]}
      >
       <Input
          name="username"
          className="input-field"
          placeholder=" Ingrese un título."
       />
      </Form.Item>
      <Form.Item
        label=""
        name="description"
        rules={[
          {
           required: true,
           message: 'Da una breve descripción del apunte.',
         }
         ]}
       >
        <TextArea
           name="description"
           className="input-field"
           placeholder=" Ingrese una descripción."
           maxWidth={560}
           width={560}
           height={500}
        />
       </Form.Item>
       <Form.Item
        label=""
        name="description"
        rules={[]}
       >
        <Select
          defaultValue="default"
          style={{ width: 560 }}
          onChange={() =>{}}
        >
          <Option value="default">
            Seleccione materia
          </Option>
        </Select>
      </Form.Item>
      <Form.Item
       label=""
       name="Tipo de apunte"
       rules={[
         {
           required: true,
           message: 'Elija al menos un tipo de apunte.',
         }]}
      >
        <Select
          mode="multiple"
          style={{ width: 560 }}
          placeholder="Elija un o más tipo(s) de apunte(s)."
          defaultValue={[]}
          onChange={() => {}}
          >
          {contribTypes.map(a => (
            <Option value={a.id}>{a.name}</Option>
          ))}
        </Select>
     </Form.Item>

    </Form>
  </>
  );
}

export default FileDetailsForm;
