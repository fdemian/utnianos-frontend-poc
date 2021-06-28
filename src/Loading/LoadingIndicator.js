import React from 'react';
import { Spin, Alert } from 'antd';
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
