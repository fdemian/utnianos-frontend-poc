import React, { lazy, Suspense} from 'react';
import { Popover, Card, Spin } from 'antd';
import { getPrerreqList } from './utils';
import './Course.css';

const PopoverContent = lazy(() => import('../PendingRequisites/Pending'));

const DisabledCourse = ({ name, allCourses, courseReq, finalReq}) => {

  const pendingCourse = getPrerreqList(allCourses, courseReq);
  const pendingFinal  = getPrerreqList(allCourses, finalReq);

  return (
    <div className="Course Disabled" data-testid="disabled-course">
      <Popover
        content={
        <Suspense fallback={<Spin />}>
           <PopoverContent course={pendingCourse} final={pendingFinal} />
        </Suspense>
        }
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
