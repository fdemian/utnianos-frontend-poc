import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Alert from 'antd/es/alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopIcon from '../Login/TopIcon';
import { faUser, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from "@apollo/client";
import './Register.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      ok
      id
      message
    }
  }
`;

const RegisterScreen = (props) => {

  const id = localStorage.getItem('ID');
  const isLoggedIn = id !== null;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createUser, {
    loading,
    data
    }] = useMutation(CREATE_USER);

  const onFinish = values => {
     if(values.password !== values.passwordrepeat){
       setError(true);
       setErrorMessage("Password values do not match.")
       return false;
     }

     const { username, password, email } = values;
     createUser({ variables: {
       username: username,
       password: password,
       email: email
     }});

  };

  const onFinishFailed = errorInfo => {
     console.log('Failed:', errorInfo);
  };

  if(loading)
    return <p>Loading</p>;

  if(isLoggedIn)
    return  <Navigate to="/" />;

  if(data){
   const { ok, id } = data.createUser;
   if(ok){
     return <Navigate to={`/registersuccess/${id}`} />;
   }
  }

  return (
  <div className="register-grid-container">
     <TopIcon />
     <Form
        {...layout}
        name="register-form"
        role="form"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
       <Form.Item
         label=""
         name="username"
         rules={[
           {
            required: true,
            message: 'This field is required.',
          },
          ]}
        >
         <Input
            name="username"
            className="input-field"
            placeholder=" Enter your username"
            prefix={<FontAwesomeIcon icon={faUser} size="lg" color="gainsboro" />}
         />
        </Form.Item>
        <Form.Item
          label=""
          name="email"
          rules={[
            {
             required: true,
             message: 'This field is required.',
           },
           {
            type: 'email',
            message: 'Not a valid email format.'
           },
           ]}
         >
          <Input
             name="email"
             className="input-field"
             placeholder=" Enter your email"
             prefix={<FontAwesomeIcon icon={faUser} size="lg" color="gainsboro" />}
          />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[
           {
             required: true,
             message: 'Please input your password!',
            },
          ]}
        >
         <Input.Password
           name="password"
           role="textbox"
           className="input-field"
           placeholder=" Enter password"
           type="password"
           prefix={<FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />}
         />
        </Form.Item>
        <Form.Item
          label=""
          name="passwordrepeat"
          rules={[
           {
             required: true,
             message: 'Repeat your password!',
            },
          ]}
        >
         <Input.Password
           name="passwordrepeat"
           role="textbox"
           className="input-field"
           placeholder=" Repeat password"
           onChange={null}
           type="password"
           prefix={<FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />}
         />
        </Form.Item>
        <br />
        <Form.Item>
          <Button className="register-button" size="large" type="primary" htmlType="submit" block>
            Register &nbsp;
            <FontAwesomeIcon icon={faUserPlus} size="lg" color="white" />
          </Button>
        </Form.Item>
      </Form>
      {
       error &&
        <Alert
          style={{ marginTop: 24 }}
          message={errorMessage}
          type="error"
          showIcon
          closable
        />
      }
  </div>
  );

}

export default RegisterScreen;
