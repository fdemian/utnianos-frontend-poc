import React from 'react';
import Course from '../Course/Course';
import './YearOfStudy.css';

const YearOfStudy = (props) => {

  const {
    courses,
    year,
    updateEstado,
    coursesStatus,
    completionStatuses,
    prerrequisites,
    allCourses
  } = props;

  return(
  <div className="Container">
    <p className="Heading">
      Año
      {year}
    </p>
    <hr className="Separator" />
    {courses.map((course) => (
      <div key={course.id}>
        <Course
          course={course}
          updateEstado={updateEstado}
          completionStatuses={completionStatuses}
          allPrereq={prerrequisites}
          coursesStatus={coursesStatus}
          allCourses={allCourses}
        />
      </div>
    ))}
  </div>
  );

};

export default YearOfStudy;
