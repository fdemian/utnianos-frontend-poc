import React from 'react';
import { Popover, Card } from 'antd';
import PopoverContent from '../PendingRequisites/Pending';
import { getPrerreqList } from './utils';
import './Course.css';
 
const DisabledCourse = ({ name, allCourses, courseReq, finalReq}) => {

  const pendingCourse = getPrerreqList(allCourses, courseReq);
  const pendingFinal  = getPrerreqList(allCourses, finalReq);

  return (
    <div className="Course Disabled">
      <Popover
        content={ <PopoverContent course={pendingCourse} final={pendingFinal} /> }
        title={name}
        trigger="hover"
      >
        <Card className="CourseCard">

          <p className="Unselectable">
            <strong className="CourseName">
              {name}
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

export default DisabledCourse;
