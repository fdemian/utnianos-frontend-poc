import React from 'react';
import { Select, Badge } from 'antd';

const { Option } = Select;
const colors = [
  'default',
  'processing',
  'warning',
  'success'
];

const categroyFromStatus = (currentStatus, completionStatuses) =>
  completionStatuses.filter(c => c.id === currentStatus.completionId)[0].name;

const StatusDropdown = ({ updateFn, courseId, completionStatuses, currentStatus, canTakeFinalExam }) => (
  <span>
    <Select
      style={{ width: '100%' }}
      optionFilterProp="children"
      onChange={(value) => {
        const id = completionStatuses.find(c => c.name === value).id;
        updateFn(courseId, id)
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
