import React from 'react';
import { Popover, Card } from 'antd';
import PopoverContent from '../PendingRequisites/Pending';
import StatusDropdown from './StatusDropdown';
import './Course.css';

const prerreqSatisfy = (req, statuses) => {
  const filteredStatuses = statuses.find(s =>
    s.courseId === req.prerrequisiteId &&
    s.completionId >= req.completionId
  );

  return filteredStatuses !== undefined;
}

const hasPrerrequisites = (prerrequisites, coursesStatus) => {

  // The course has no prerrequisites.
  if(prerrequisites.length === 0)
    return true;

  return prerrequisites.every(req => prerreqSatisfy(req, coursesStatus));
}

const getPrerreqList = (courses, prerrequisites) => {
  const idsList = prerrequisites.map(p => p.prerrequisiteId);
  const prerreqs = courses.filter(p => idsList.includes(p.id));
  
  return prerreqs;
}

const Course = (props) => {

  const {
    course,
    updateEstado,
    completionStatuses,
    currentStatus,
    prerrequisites,
    coursesStatus,
    allCourses
  } = props;

  const finalReq = prerrequisites.filter(p => p.type === 'F');
  const courseReq = prerrequisites.filter(p => p.type === 'C');
  const canTakeCourse = hasPrerrequisites(courseReq, coursesStatus);
  const canTakeFinalExam = hasPrerrequisites(finalReq, coursesStatus);


  if (canTakeCourse) {
    return (
      <div className="Course">
        <Card className="CourseCard">
          <p className="CourseNameContainer">
            <strong className="CourseName">{course.name}</strong>
          </p>
          <StatusDropdown
            updateFn={updateEstado}
            courseId={course.id}
            completionStatuses={completionStatuses}
            currentStatus={currentStatus}
            canTakeFinalExam={canTakeFinalExam}
          />
        </Card>
      </div>
    );
  }


  const pendingCourse = getPrerreqList(allCourses, courseReq);
  const pendingFinal  = getPrerreqList(allCourses, finalReq);

  return (
    <div className="Course Disabled">
      <Popover
        content={ <PopoverContent course={pendingCourse} final={pendingFinal} /> }
        title={course.name}
        trigger="hover"
      >
        <Card className="CourseCard">

          <p className="Unselectable">
            <strong className="CourseName">
              {course.name}
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

export default Course;
