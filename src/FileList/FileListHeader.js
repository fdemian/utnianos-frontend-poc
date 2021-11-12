import React from 'react';
import Select from 'antd/es/select';
import Input from 'antd/es/input';
import Spin from 'antd/es/spin';
import { getIsMobile } from '../App/utils';

import './FileList.css';

const { Option } = Select;

const FileListHeader = (props) => {

  const {
   setCoursesFilter,
   setContribsFilter,
   setNameFilter,
   coursesList,
   contribTypesList,
  } = props;

  const handleChangeContrib = (value) => setContribsFilter(value);
  const handleChangeCourse = (value) => setCoursesFilter(value);
  const handleChangeName = (e) => setNameFilter(e.target.value);

  if(coursesList.loading || contribTypesList.loading)
    return <Spin tip="Loading..." />;

  const { courses } = coursesList.data;
  const { contribTypes } = contribTypesList.data;

  const isMobile = getIsMobile();
  const cssClass = `file-list-header-container${isMobile ? "-mobile": ""}`;

  return (
  <div className={cssClass}>

    <span className="contribution-type-select">
      <h3>Tipo de apunte</h3>
      <Select
        mode="multiple"
        style={{ width: '300px' }}
        placeholder="Elija tipo de apunte."
        defaultValue={[]}
        onChange={handleChangeContrib}
        optionLabelProp="label"
        >
          {contribTypes.map(c => (
            <Option value={c.name} label={c.name}>
              {c.name}
            </Option>
          ))}
       </Select>
     </span>

     <span className="contribution-type-select">
        <h3>Materia</h3>
        <Select
         mode="multiple"
         style={{ width: '300px' }}
         placeholder="Elija materia"
         defaultValue={[]}
         onChange={handleChangeCourse}
         optionLabelProp="label"
        >
         {courses.map(c => (
           <Option value={c.name} label={c.name}>
             {c.name}
           </Option>
         ))}
        </Select>
    </span>

    <span>
      <h3>Filtrar</h3>
      <Input
        onChange={handleChangeName}
        placeholder="Filtrar por titulo del apunte"
        style={{width:'300px'}}
      />
   </span>

  </div>
  );
}

export default FileListHeader;
