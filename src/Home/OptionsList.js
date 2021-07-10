import React from 'react';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const cardStyle = { width: 240 };
const marginStyle = {marginLeft: '25%', marginTop: '50px'};

const OptionsList = () => {

  return (
  <div style={marginStyle}>
    <Row gutter={16}>
      <Col span={6}>
        <Card hoverable style={cardStyle} role="button">
           <Meta title="Seguidor de carrera" description="Seguidor academico de carrera." />
        </Card>
      </Col>
      <Col span={6}>
        <Link to="/classnotes">
        <Card hoverable style={cardStyle} role="button">
           <Meta title="Apuntes de materias" description="Colección de apuntes de materias, incluyendo parciales y finales." />
        </Card>
        </Link>
      </Col>
      <Col span={6}>
        <Link to="/classnotes/upload">
          <Card hoverable style={cardStyle} role="button">
             <Meta title="Subir apuntes" description="Colabora con la comunidad subiendo parciales y finales." />
          </Card>
        </Link>
      </Col>
    </Row>
  </div>
  );
}

export default OptionsList;
