import React from 'react';
import Subject from '../Subject/Subject';
import './YearOfStudy.css';

const YearOfStudy = ({ subjects, year, updateEstado, coursesStatus, completionStatuses }) => {

  const getCourseStatus = (subject, coursesStatus) =>
  coursesStatus.filter(c => c.courseId === subject.id)[0];

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
        />
      </div>
    ))}
  </div>
  );

};

export default YearOfStudy;
