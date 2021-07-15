import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'Titulo',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Materia',
    dataIndex: 'course',
    key: 'course',
    render: (cm) => <p>{cm.name}</p>
  },
  {
    title: 'Aporte',
    key: 'contribTypes',
    dataIndex: 'contribTypes',
    render: contribTypes => (
      <span>
        {contribTypes.split(",").map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
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
    title: 'Ver',
    key: 'view',
    render: (text, record) => <Link to={`/classnotes/${record.id}`}>Ver</Link>,
  },
];

const FileListContents = (props) => {

  const {
    data,
    coursesFilter,
    contribsFilter,
    nameFilter
   } = props;

   if(data.loading)
    return <p>Loading</p>;

  const { classMaterials } = data.data;

  console.clear();
  console.log(classMaterials);
  console.log("________");

  return (
  <div>
    <Table columns={columns} dataSource={classMaterials} />
  </div>
  );
}

export default FileListContents;
