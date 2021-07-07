import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Form, Input, Button, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopIcon from '../Login/TopIcon';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useMutation, gql } from "@apollo/client";
import { useIsLoggedIn } from '../Login/authToken';
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

  const { isLoggedIn } = useIsLoggedIn();
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
    return <Redirect to="/" />;

  if(data){
   const { ok, id } = data.createUser;
   if(ok){
     return <Redirect to={`/registersuccess/${id}`} />;
   }
  }

  return (
  <div className="register-grid-container">
     <TopIcon />
     <Form
        {...layout}
        name="register-form"
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
           className="input-field"
           placeholder=" Repeat password"
           onChange={null}
           type="password"
           prefix={<FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />}
         />
        </Form.Item>
        <br />
        <Form.Item>
          <Button style={{width:564}} type="primary" htmlType="submit" block>
            Register
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
