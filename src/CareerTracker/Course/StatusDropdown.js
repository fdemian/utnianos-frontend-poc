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

const StatusDropdown = (props) => {

  const {
    updateFn,
    courseCode,
    completionStatuses,
    currentStatus,
    canTakeFinalExam,
    isLoading
  } = props;

  if(isLoading)
    return null;

  const changeInputFn = (value) => {
    const code = completionStatuses.find(c => c.name === value).status;
    updateFn(courseCode, code)
  }
  const defaultValue = categroyFromStatus(currentStatus, completionStatuses);

  return(
  <span>
    <Select
      id={"search-attributes-" + courseCode}
      key={"search-attributes-" + courseCode}
      aria-expanded="true"
      name="courses"
      placeholder="Cambiar estado de materia."
      aria-label="Cambiar estado de materia."
      style={{ width: '100%' }}
      optionFilterProp="children"
      onChange={changeInputFn}
      defaultValue={defaultValue}
    >
      {completionStatuses.map((status, i) => (
        <Option
          title={status.name}
          value={status.name}
          key={"search-attributes-" + courseCode + "-" + status.id}
          role="option"
          disabled={status.name === "Aprobada" && !canTakeFinalExam}
        >
          <Badge status={colors[i]} />
          {status.name}
        </Option>
      ))}
    </Select>
  </span>
  )
};

export default StatusDropdown;
