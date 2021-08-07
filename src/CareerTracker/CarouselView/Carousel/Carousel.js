import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group' // ES6
import SubjectYears from '../SubjectYears';
import CarouselArrows from './CarouselArrows';
import getYearsArray from './getYearsArray';
import './Carousel.css';

const Carousel = (props) => {

  const {
    materias,
    yearsPerTab,
    updateFn,
    coursesStatus,
    completionStatuses,
    prerrequisites
  } = props;
  const studyYears = getYearsArray(yearsPerTab, materias);

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

  const numberOfYears = Array.from(new Set(materias.map(m => m.year))).length;
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
          <SubjectYears
            years={years}
            courses={materias}
            updateFn={updateFn}
            coursesStatus={coursesStatus}
            completionStatuses={completionStatuses}
            prerrequisites={prerrequisites}
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );

}

export default Carousel;
