import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Carousel from './Carousel/Carousel';

const CarouselView = (props) => {

  const {
    coursesStatus,
    completionStatuses,
    materias,
    updateEstado,
    prerrequisites
  } = props;

  const isDesktop = useMediaQuery({query: '(min-device-width: 1200px)'});
  const yearsPerTab = isDesktop ? 3 : 1;

  return(
  <Carousel
    coursesStatus={coursesStatus}
    completionStatuses={completionStatuses}
    materias={materias}
    prerrequisites={prerrequisites}
    yearsPerTab={yearsPerTab}
    updateFn={updateEstado}
  />
  );
}

export default CarouselView;
