import React from 'react';
import '../CareerTracker.css';
import YearOfStudy from '../YearOfStudy/YearOfStudy';

const SubjectYears = (props) => {

    const {
      years,
      updateFn,
      coursesStatus,
      completionStatuses,
      prerrequisites
    } = props;

    return(
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
    )
}


export default SubjectYears;
