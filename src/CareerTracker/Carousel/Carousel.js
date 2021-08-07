import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group' // ES6
import YearOfStudy from '../YearOfStudy/YearOfStudy';
import CarouselArrows from './CarouselArrows';
import getYearsArray from './getYearsArray';
import './Carousel.css';
import '../CareerTracker.css';

const Carousel = (props) => {

  const {
    courses,
    yearsPerTab,
    updateFn,
    coursesStatus,
    completionStatuses,
    prerrequisites
  } = props;
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

  return (
    <div>
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
          <YearOfStudy
            key={year.year}
            year={year.year}
            courses={year.courses}
            updateEstado={updateFn}
            coursesStatus={coursesStatus}
            completionStatuses={completionStatuses}
            prerrequisites={prerrequisites}
          />
        ))}
        </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );

}

export default Carousel;
