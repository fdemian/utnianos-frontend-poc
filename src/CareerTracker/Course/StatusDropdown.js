import React from 'react';
import { Select, Badge } from 'antd';

const { Option } = Select;
const colors = [
  'default',
  'processing',
  'warning',
  'success'
];

const categroyFromStatus = (currentStatus, completionStatuses) => {
  console.clear();
  console.log(":_::::");
  console.log(completionStatuses);
  console.log(currentStatus);
  console.log(":_::::");

  return completionStatuses.filter(c => c.id === currentStatus.completionId)[0].name;
}
const StatusDropdown = ({ updateFn, courseCode, completionStatuses, currentStatus, canTakeFinalExam }) => (
  <span>
    <Select
      style={{ width: '100%' }}
      optionFilterProp="children"
      onChange={(value) => {
          const id = completionStatuses.find(c => c.name === value).id;
          updateFn(courseCode, id)
        }
      }
      defaultValue={categroyFromStatus(currentStatus, completionStatuses)}
    >
      {completionStatuses.map((status, i) => (
        <Option
          value={status.name}
          key={status.id}
          title={status.name}
          disabled={status.name === "Aprobada" && !canTakeFinalExam}
        >
          <Badge status={colors[i]} />
          {status.name}
        </Option>
      ))}
    </Select>
  </span>
);

export default StatusDropdown;
