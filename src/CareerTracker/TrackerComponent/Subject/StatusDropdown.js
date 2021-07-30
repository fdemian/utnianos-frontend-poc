import React from 'react';
import { Select, Badge } from 'antd';

const { Option } = Select;

const colors = [
  'default',
  'processing',
  'warning',
  'success'
];

function handleChange(value, updateFn, materiaId) {

  console.log(value);
  /*
  const categoryId = categories.filter((c) => c.name === value)[0].id;
  const materiaStatus = {
    id: materiaId,
    status: categoryId + 1
  };

  updateFn(materiaStatus);
  */
}

const categroyFromStatus = (currentStatus, completionStatuses) =>
  completionStatuses.filter(c => c.id === currentStatus.completionId)[0].name;

const StatusDropdown = ({ updateFn, materiaId, completionStatuses, currentStatus }) => (
  <span>
    <Select
      style={{ width: '100%' }}
      optionFilterProp="children"
      onChange={(value) => handleChange(value, updateFn, materiaId)}
      defaultValue={categroyFromStatus(currentStatus, completionStatuses)}
    >
      {completionStatuses.map((status, i) => (
        <Option value={status.name} key={status.id} title={status.name}>
          <Badge status={colors[i]} />
          {status.name}
        </Option>
      ))}
    </Select>
  </span>
);

export default StatusDropdown;
