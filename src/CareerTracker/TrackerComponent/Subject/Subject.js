import React from 'react';
import { Popover, Card } from 'antd';
//import PopoverContent from '../Pendientes/Container';
import StatusDropdown from './StatusDropdown';
import './Subject.css';

const prerreqSatisfy = (req, statuses) => {
  const filteredStatuses = statuses.find(s =>
    s.courseId === req.prerrequisiteId &&
    s.completionId >= req.completionId
  );

  return filteredStatuses !== undefined;
}

const hasPrerrequisites = (subject, prerrequisites, coursesStatus) => {

  // The subject has no prerrequisites.
  if(prerrequisites.length === 0)
    return true;

  return prerrequisites.every(req => prerreqSatisfy(req, coursesStatus));
}

const Subject = (props) => {

  const {
    subject,
    updateEstado,
    completionStatuses,
    currentStatus,
    prerrequisites,
    coursesStatus
  } = props;
  
  const finalReq = prerrequisites.filter(p => p.type === 'F');
  const courseReq = prerrequisites.filter(p => p.type === 'C');
  const canTakeCourse = hasPrerrequisites(subject, courseReq, coursesStatus);
  const canTakeFinalExam = hasPrerrequisites(subject, finalReq, coursesStatus);

  if (canTakeCourse) {
    return (
      <div className="Subject">
        <Card className="SubjectCard">
          <p className="SubjectNameContainer">
            <strong className="SubjectName">{subject.name}</strong>
          </p>
          <StatusDropdown
            updateFn={updateEstado}
            materiaId={subject.id}
            completionStatuses={completionStatuses}
            currentStatus={currentStatus}
            canTakeFinalExam={canTakeFinalExam}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="Subject Disabled">
      {/*<Popover
        content={<PopoverContent pendientes={subject.pendientes} />}
        title={subject.name}
        trigger="hover"
      >*/}
        <Card className="SubjectCard">

          <p className="Unselectable">
            <strong className="SubjectName">
              {subject.name}
            </strong>
          </p>

          <p className="Unselectable">
            No se cumplen las coorrelativas para que curses esta materia.
          </p>

        </Card>
      {/*</Popover>*/}
    </div>
  );

}

export default Subject;
