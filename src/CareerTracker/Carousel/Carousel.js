import React, { useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { TransitionGroup, CSSTransition } from 'react-transition-group' // ES6
import Course from '../Course/Course';
import CarouselArrows from './CarouselArrows';
import getYearsArray from './getYearsArray';
import './Carousel.css';
import '../CareerTracker.css';
import {
  GET_PLAN_STATUS,
  GET_COMPLETION_STATUSES,
  GET_PRERREQUISITES
} from '../queries';
import { CHANGE_COURSE_STATUS } from '../mutations';

const Carousel = (props) => {

  const {
    courses,
    yearsPerTab,
    updateFn,
    userId
  } = props;

  const [changeCourseStatus] = useMutation(CHANGE_COURSE_STATUS);
  const [courseStatusesInternal, setCoursesStatuses] = useState(null);

  const statusesQuery = useQuery(GET_COMPLETION_STATUSES);
  const prerreqQuery =  useQuery(GET_PRERREQUISITES);
  const {data, loading, error } = useQuery(GET_PLAN_STATUS, {
    variables: {
      id: userId
    }
  });

  const studyYears = getYearsArray(yearsPerTab, courses);
  const [currentTab, setCurrentTab] = useState(1);
  const [totalTabs] = useState(studyYears.length);
  const index = currentTab - 1;
  const years = studyYears[index];

  function nextTab() {
    if (currentTab < totalTabs) {
      setCurrentTab(currentTab + 1);
    }
  }

  function prevTab() {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  }

  if (studyYears.length <= 0) {
    return null;
  }

  const numberOfYears = Array.from(new Set(courses.map(m => m.year))).length;
  const showArrows = numberOfYears > 3;

  const isLoading = loading || statusesQuery.loading || prerreqQuery.loading;
  const isError = error || statusesQuery.error || prerreqQuery.error;

  if(isError)
    return <p>Error</p>;

  let completionStatuses;
  let coursesStatus;
  let coursePrerrequisites;

  if(!isLoading){
    completionStatuses = statusesQuery.data.completionStatuses;
    coursesStatus = data.coursesStatus;
    coursePrerrequisites = prerreqQuery.data.coursePrerrequisites;
  }

  if(!courseStatusesInternal  && coursesStatus) {
    setCoursesStatuses(coursesStatus);
  }

  const changeStatusFn = (courseCode, statusCode) => {
    changeCourseStatus({ variables: {
      courseCode: courseCode,
      userId: userId,
      statusCode: statusCode
    }});

    let newStatuses = coursesStatus.map(cs => {
       if(cs.courseCode === courseCode){
         return {
           completionCode: statusCode,
           courseCode: cs.courseCode,
          __typename: "CoursesStatusObj"
         }
        }
        return cs;
     });
     
     setCoursesStatuses(newStatuses);
  }

  return (
  <>
    <CarouselArrows prevFn={prevTab} nextFn={nextTab} showArrows={showArrows} />
    <TransitionGroup>
      <CSSTransition
        transitionName="TransitionGroup"
        transitionAppear={false}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionEnter
        transitionLeave
      >
      <div className="YearsVisualizer">
      {years.map((year) => (
        <div className="Container" key={year.year}>
          <p className="Heading">
            Año
            {year.year}
          </p>
          <hr className="Separator" />
          {year.courses.map((course) => (
            <Course
              key={course.code}
              isLoading={isLoading}
              course={course}
              coursesStatus={courseStatusesInternal}
              allCourses={courses}
              allPrereq={coursePrerrequisites}
              completionStatuses={completionStatuses}
              updateFn={changeStatusFn}
            />
          ))}
        </div>
      ))}
      </div>
      </CSSTransition>
    </TransitionGroup>
  </>
  );

}

export default Carousel;
