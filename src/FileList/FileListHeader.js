import React from 'react';
import { Select, Input } from 'antd';

import './FileList.css';

const { Option } = Select;

function handleChangeContrib(value) {
  console.log(`selected ${value}`);
}

function handleChangeCourse(value) {
  console.log(`selected ${value}`);
}

const contribTypes = [{
  value: 'parciales',
  label: 'Parciales',
},
{
  value: 'finales',
  label: 'Finales',
},
{
  value: 'trabajopractico',
  label: 'Trabajo Practico',
},
{
  value: 'apuntesguias',
  label: 'Apuntes y Guias',
},
{
  value: 'ejercicios',
  label: 'Ejercicios',
},
{
  value: 'guiasceit',
  label: 'Guias Ceit',
}
];

const courses = [{
  value: 'algebra',
  label: 'Álgebra y Geometría Analítica',
},
{
  value: 'fisica1',
  label: 'Fisica 1',
},
{
  value: 'ingsoc',
  label: 'Ingenieria y Sociedad',
}];

const FileListHeader = () => {
  return (
  <div className="file-list-header-container">

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
            <Option value={c.value} label={c.label}>
              {c.label}
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
           <Option value={c.value} label={c.label}>
             {c.label}
           </Option>
         ))}
        </Select>
    </span>

    <span>
      <h3>Filtrar</h3>
      <Input placeholder="Basic usage" style={{width:'300px'}} />
   </span>

  </div>
  );
}

export default FileListHeader;
