import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Form, Input, Button, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import TopIcon from './TopIcon';
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER,
  USER_LOGIN
} from './queries';
import { setStorageTokens } from './authUtils';
import './Login.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoginScreen = (props) => {

  const [userId, setUserId] = useState(null);
  const [loginMutation, authData] = useMutation(USER_LOGIN, { skip: userId });

  if(!authData.loading && authData.data && !userId){
    const {
      id,
      accessToken,
      refreshToken
    } = authData.data.auth;

    setUserId(id);
    setStorageTokens(id, accessToken, refreshToken);
  }

  const queryOpts = { variables: { id: userId }, skip: !userId };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);

  // Finished checking login values.
  const onFinish = values => {
     const { username, password } = values;
     loginMutation({ variables:{ username, password }});
  };

  // Fail!
  const onFinishFailed = errorInfo => {
     console.log('Failed:', errorInfo);
  };

  if(userId && !loading && data){
    return <Redirect to="/" />;
  }

  return (
  <div className="login-grid-container">
     <TopIcon />
     <Form
        {...layout}
        name="login-form"
        role="form"
        className="login-form"
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
            message: 'Please input your username!',
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
           name="password"
           prefix={<FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />}
           role="textbox"
         />
        </Form.Item>
        <br />
        <Form.Item>
          <Button style={{width:564}} type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
      {
       error &&
        <Alert
          style={{ marginTop: 24 }}
          message="User/Password combination is invalid."
          type="error"
          showIcon
          closable
        />
      }
  </div>
  );

}

export default LoginScreen;
