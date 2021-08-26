import React from 'react';
import Select from 'antd/es/select';
import '../CareerTracker.css';

const { Option } = Select;

const subjectViews = [{
  value: 'carousel',
  text: 'Vista normal'
},
{
  value: 'tree',
  text: 'Vista compacta'
},
{
  value: 'finales',
  text: 'Finales Pendientes'
}];

const filterOption = (input, option) => option.props.children.toLowerCase()
  .indexOf(input.toLowerCase()) >= 0

const getViews = (desktop) => {
  if (desktop) return subjectViews;

  return subjectViews.filter((v) => v.value !== 'tree');
}

const TrackerHeading = ({ changeViewType, currentView, desktop }) => (
  <div className={`ViewChooser ${desktop ? ' Desktop' : ' Mobile'}`}>
    <span>Vista materias &nbsp;</span>
    <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Elegir una vista"
        optionFilterProp="children"
        onChange={(value) => changeViewType(value)}
        defaultValue={currentView}
        filterOption={(input, option) => filterOption(input, option)}
        className="ViewChooserSelect"
      >
        {getViews(desktop).map((v) => (
          <Option key={v.value} view={v.value}>
            {v.text}
          </Option>
        ))}
      </Select>

  </div>
  );

export default TrackerHeading;
