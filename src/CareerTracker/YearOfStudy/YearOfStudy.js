import React from 'react';
import Course from '../Course/Course';
import './YearOfStudy.css';

const getCourseStatus = (subject, coursesStatus) =>
coursesStatus.filter(c => c.courseId === subject.id)[0];

const getCoursePrerrequisites = (courseId, prerrequisites) =>
prerrequisites.filter(p => p.courseId === courseId);

const YearOfStudy = (props) => {

  const {
    courses,
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
    {courses.map((course) => (
      <div key={course.id}>
        <Course
          course={course}
          updateEstado={updateEstado}
          completionStatuses={completionStatuses}
          prerrequisites={getCoursePrerrequisites(course.id, prerrequisites)}
          coursesStatus={coursesStatus}
          currentStatus={getCourseStatus(course, coursesStatus)}
          courses={courses}
        />
      </div>
    ))}
  </div>
  );

};

export default YearOfStudy;
