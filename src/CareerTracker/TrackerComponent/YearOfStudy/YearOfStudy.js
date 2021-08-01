import React from 'react';
import Subject from '../Subject/Subject';
import './YearOfStudy.css';

const getCourseStatus = (subject, coursesStatus) =>
coursesStatus.filter(c => c.courseId === subject.id)[0];

const getCoursePrerrequisites = (subject, prerrequisites) =>
prerrequisites.filter(p => p.courseId === subject.id);

const prerreqSatisfy = (req, statuses) => {
  const filteredStatuses = statuses.filter(s =>
    s.courseId === req.prerrequisiteId &&
    s.completionId === req.completionId
  );

  return filteredStatuses.length > 0;
}

const hasPrerrequisites = (subject, prerrequisites, coursesStatus) => {

  const coursePrerreq = getCoursePrerrequisites(subject, prerrequisites);

  // The subject has no prerrequisites.
  if(coursePrerreq.length === 0)
    return true;

  return prerrequisites.every(p => prerreqSatisfy(p, coursesStatus));
}

const YearOfStudy = (props) => {

  const {
    subjects,
    year,
    updateEstado,
    coursesStatus,
    completionStatuses,
    prerrequisites
  } = props;

  return(
  <div className="Container">
    <p className="Heading">
Año
      {year}
    </p>
    <hr className="Separator" />
    {subjects.map((subject) => (
      <div key={subject.id}>
        <Subject
          subject={subject}
          updateEstado={updateEstado}
          completionStatuses={completionStatuses}
          currentStatus={getCourseStatus(subject, coursesStatus)}
          coursePrerrequisites={getCoursePrerrequisites(subject, prerrequisites)}
          canTakeCourse={hasPrerrequisites(subject, prerrequisites.filter(p => p.type === 'C'), coursesStatus)}
          canTakeFinalExam={hasPrerrequisites(subject, prerrequisites.filter(p => p.type === 'F'), coursesStatus)}
        />
      </div>
    ))}
  </div>
  );

};

export default YearOfStudy;
