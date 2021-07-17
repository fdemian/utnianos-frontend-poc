import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag , Spin} from 'antd';

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

   // Name filter is case sensitive.
   const getFilteredData = (data) => data.filter(d => matchesFilters(d));

   if(data.loading)
    return <Spin tip="Loading..." />;

  const { classMaterials } = data.data;
  const dataSource = getFilteredData(classMaterials);

  return (
  <div>
    <Table columns={columns} dataSource={dataSource} />
  </div>
  );
}

export default FileListContents;
