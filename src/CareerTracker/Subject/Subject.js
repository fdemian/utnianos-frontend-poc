import React from 'react';
import { Popover, Card } from 'antd';
import PopoverContent from '../Pendientes/Pendientes';
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

const getPrerreqList = (courses, prerrequisites) => {
  const idsList = prerrequisites.map(p => p.prerrequisiteId);
  const prerreqs = courses.filter(p => idsList.includes(p.id));

  return prerreqs;
}

const Subject = (props) => {

  const {
    subject,
    updateEstado,
    completionStatuses,
    currentStatus,
    prerrequisites,
    coursesStatus,
    courses
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

  const pendingCourse = getPrerreqList(courses, courseReq);
  const pendingFinal  = getPrerreqList(courses, finalReq);

  return (
    <div className="Subject Disabled">
      <Popover
        content={ <PopoverContent course={pendingCourse} final={pendingFinal} /> }
        title={subject.name}
        trigger="hover"
      >
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
      </Popover>
    </div>
  );

}

export default Subject;
