import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Spin from 'antd/es/spin';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as eyeIcon } from '@fortawesome/free-solid-svg-icons';

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
    render: (text, record) => <Link to={`/classnotes/${record.id}`}>
      <FontAwesomeIcon icon={eyeIcon} size="1x" />
      </Link>,
  },
];

const isNullOrUndefined = (val) => val === undefined || val === null;
const isNullOrEmpty = (val) => isNullOrUndefined(val) || val.trim() === "";

const FileListContents = (props) => {

  const {
    data,
    coursesFilter,
    contribsFilter,
    nameFilter
   } = props;

   const nameFilterFn = (data) => {
     const nameToFilter = isNullOrEmpty(nameFilter) ? "" : nameFilter;
     return (
      data.name.includes(nameToFilter) ||
      (nameToFilter.trim()==="")
     );
   }

   const courseFilterFn = (data) => {
     if(coursesFilter.length === 0)
        return true;

     return coursesFilter.includes(data.course.name)
   }

   const contribFilterFn = (data) => {
     if(contribsFilter.length === 0)
       return true;

     const dataContribs = data.contribTypes.split(",");

     return contribsFilter.some(cf => dataContribs.includes(cf));
   }

   const matchesFilters = (data) => {
     return (nameFilterFn(data) && courseFilterFn(data) && contribFilterFn(data));
   }

   if(data.loading)
    return <Spin tip="Loading..." />;

  if(data.error)
    return <p>Error</p>;

  // Name filter is case sensitive.
  const getFilteredData = (data) => data.filter(d => matchesFilters(d));
  const { classMaterials } = data.data;
  const dataSource = getFilteredData(classMaterials);

  return (
  <Table
    columns={columns}
    dataSource={dataSource}
    locale={{emptyText: 'No hay apuntes subidos.'}}
  />
  );
}

export default FileListContents;
