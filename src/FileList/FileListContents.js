import React from 'react';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Titulo',
    dataIndex: 'title',
    key: 'title',
    render: text => <p>{text}</p>,
  },
  {
    title: 'Materia',
    dataIndex: 'materia',
    key: 'materia',
  },
  {
    title: 'Aporte',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Descargar',
    key: 'download',
    render: (text, record) => <a href="/">Download</a>,
  },
];

const data = [
  {
    key: '1',
    title: 'Star [Aporte][Proba]Resueltos Guía 2017 1C (por Fernandez) Y 2C (por Sylvina)',
    materia: 'Probabilidad y Estadística',
    tags: ['Trabajo Practico', 'Apuntes y Guias']
  },
  {
    key: '2',
    title: '[Aporte][Fisica II] Resoluciones y correcciones.',
    materia: 'Fisica II',
    tags: ['Final']
  },
  {
    key: '3',
    title: '[TP1][RESUELTO] Ecuaciones diferenciales ordinarias.',
    materia: 'Analisis Matematico II',
    tags: ['Guias Ceit', 'Apuntes y Guias']
  },
];

const FileListContents = () => {
  return (
  <div>
    <Table columns={columns} dataSource={data} />
  </div>
  );
}

export default FileListContents;
