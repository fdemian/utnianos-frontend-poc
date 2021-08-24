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
completionStatuses.filter(c => c.status === currentStatus.completionCode)[0].name;

const StatusDropdown = ({ updateFn, courseCode, completionStatuses, currentStatus, canTakeFinalExam }) => (
  <span>
    <Select
      style={{ width: '100%' }}
      optionFilterProp="children"
      onChange={(value) => {
          const code = completionStatuses.find(c => c.name === value).status;
          updateFn(courseCode, code)
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
