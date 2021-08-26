import React, { lazy, Suspense } from 'react';
import Spin from 'antd/es/spin';
import Card from 'antd/es/card';
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
    isLoading,
    completionStatuses,
    coursesStatus,
    allCourses,
    allPrereq,
    updateFn
  } = props;

  const prerrequisites = getCoursePrerrequisites(course.code, allPrereq);
  const currentStatus = getCourseStatus(course, coursesStatus);
  const finalReq = prerrequisites.filter(p => p.type === 'F');
  const courseReq = prerrequisites.filter(p => p.type === 'C');
  const canTakeCourse = hasPrerrequisites(courseReq, coursesStatus);
  const canTakeFinalExam = hasPrerrequisites(finalReq, coursesStatus);

  if (canTakeCourse) {
    return (
    <Card className="CourseCard" loading={isLoading}>
      <div className="Course">
        <p className="CourseNameContainer">
          <strong className="CourseName">{course.name}</strong>
        </p>
        <StatusDropdown
          isLoading={isLoading}
          updateFn={updateFn}
          courseCode={course.code}
          completionStatuses={completionStatuses}
          currentStatus={currentStatus}
          canTakeFinalExam={canTakeFinalExam}
        />
      </div>
    </Card>
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
