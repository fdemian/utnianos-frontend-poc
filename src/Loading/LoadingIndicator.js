import React from 'react';
import Spin from 'antd/es/spin';
import Alert from 'antd/es/alert';
import './Loading.css';

const FetchingIndicator = () => (
	<div className="loading-indicator">
	   <Spin tip="Loading...">
       <Alert
          message="Loading"
          description="Please wait."
          type="info"
       />
       </Spin>
	 </div>
);

export default FetchingIndicator;
