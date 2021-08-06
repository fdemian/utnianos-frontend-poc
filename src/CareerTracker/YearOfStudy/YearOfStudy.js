import React from 'react';
import Subject from '../Subject/Subject';
import './YearOfStudy.css';

const getCourseStatus = (subject, coursesStatus) =>
coursesStatus.filter(c => c.courseId === subject.id)[0];

const getCoursePrerrequisites = (courseId, prerrequisites) =>
prerrequisites.filter(p => p.courseId === courseId);

const YearOfStudy = (props) => {

  const {
    subjects,
    year,
    updateEstado,
    coursesStatus,
    completionStatuses,
    prerrequisites,
    materias
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
          prerrequisites={getCoursePrerrequisites(subject.id, prerrequisites)}
          coursesStatus={coursesStatus}
          currentStatus={getCourseStatus(subject, coursesStatus)}
          courses={materias}
        />
      </div>
    ))}
  </div>
  );

};

export default YearOfStudy;
