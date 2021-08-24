import React, { lazy, Suspense } from 'react';
import { Card, Spin } from 'antd';
import StatusDropdown from './StatusDropdown';
import {
  getCoursePrerrequisites,
  getCourseStatus,
  hasPrerrequisites
} from './utils';
import './Course.css';

const DisabledCourse = lazy(() => import('./DisabledCourse'));

const Course = (props) => {

  const {
    course,
    updateEstado,
    completionStatuses,
    coursesStatus,
    allCourses,
    allPrereq
  } = props;

  const prerrequisites = getCoursePrerrequisites(course.code, allPrereq);
  const currentStatus = getCourseStatus(course, coursesStatus);
  const finalReq = prerrequisites.filter(p => p.type === 'F');
  const courseReq = prerrequisites.filter(p => p.type === 'C');
  const canTakeCourse = hasPrerrequisites(courseReq, coursesStatus);
  const canTakeFinalExam = hasPrerrequisites(finalReq, coursesStatus);

  if (canTakeCourse) {
    return (
    <Suspense fallback={<Spin />}>
      <div className="Course">
        <Card className="CourseCard">
          <p className="CourseNameContainer">
            <strong className="CourseName">{course.name}</strong>
          </p>
          <StatusDropdown
            updateFn={updateEstado}
            courseCode={course.code}
            completionStatuses={completionStatuses}
            currentStatus={currentStatus}
            canTakeFinalExam={canTakeFinalExam}
          />
        </Card>
      </div>
    </Suspense>
    );
  }

  return (
  <Suspense fallback={<Spin />}>
    <DisabledCourse
      key={course.code}
      name={course.name}
      allCourses={allCourses}
      courseReq={courseReq}
      finalReq={finalReq}
    />
  </Suspense>
  );

}

export default Course;
