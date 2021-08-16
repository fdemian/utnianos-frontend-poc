import React from 'react';
import { Image, Card } from 'antd';
import './FileView.css';

const gridStyle = { width: '25%', textAlign: 'center' };

const ImageList = ({ imageList }) => (
  <Card title="Imagenes subidas">
    {imageList.map(item => (
    <Card.Grid style={gridStyle} key={item.path}>
      <Image src={item.path} width={200} />
    </Card.Grid>
    ))}
  </Card>
);

export default ImageList;
