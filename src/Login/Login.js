import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import TopIcon from './TopIcon';
import Loading from '../Loading/LoadingIndicator';
//import { newLogin, useUser } from './Actions';
import { isLoggedIn, logout, setLoginData} from './utils';

import './Login.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoginScreen = () => {

  const initialLoginState = { username: null, password: null };
  const [loggingIn, setLoggingIn] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [login, setLogin] = useState(initialLoginState);
  const [error, setError] = useState(false);

  //const { user, isLoading } = useUser(userId);
  const { user, isLoading } = {
    user: {},
    isLoading: false
  };

  const useForm = async values => {

    const { username, password } = values;
    setLoggingIn(true);
    /*const data = await newLogin(username, password);

    if(data.id) {
      const { id } = data;
      setError(false);
      setLoggingIn(false);
      setUserId(id);
      setLoginData(id);
    }
    else {
      // An error arrived from the server.
      setError(true);
      setLoggingIn(false);
      logout();
    }*/

  };

  // TODO: show error message here.
  const onFinishFailed = errorInfo => {
    //console.log('Failed:', errorInfo);
  };

  const usernameChange = (username, register) => {
    setLogin({
      username: username,
      password: login.password
    });
  }

  const passwordChange = (password, register) => {
    setLogin({
      username: login.username,
      password: password
    });
  }

  const _isLoading = loggingIn || (userId>=0 && isLoading);

  if(_isLoading)
    return <Loading />;

  if(isLoggedIn() && user)
    return <Redirect to="/"/>;

  return (
  <div className="login-grid-container">
    <TopIcon />
    <Form
      {...layout}
      name="login-form"
      role="form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={useForm}
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
         role="input"
         name="username"
         type="text"
         data-testid="username-input"
         className="input-field"
         placeholder=" Enter your username"
         onChange={usernameChange}
         prefix={<FontAwesomeIcon icon={faUser} size="lg" color="gainsboro" />}
       />
     </Form.Item>
     <Form.Item
       label=""
       name="password"
       type="password"
       rules={[
         {
           required: true,
           message: 'Please input your password!',
         },
       ]}
     >
       <Input.Password
         role="password"
         name="password"
         data-testid="password-input"
         className="input-field"
         placeholder=" Enter password"
         onChange={passwordChange}
         type="password"
         prefix={<FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />}
       />
     </Form.Item>
     <br />
     <Form.Item>
       <Button
          type="primary"
          htmlType="submit"
          block
          className="login-button"
        >
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
