import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Carousel from './Carousel/Carousel';

const CarouselView = ({ materias, updateEstado }) => {
  const isDesktop = useMediaQuery({query: '(min-device-width: 1200px)'});
  const yearsPerTab = isDesktop ? 3 : 1;

  return(
  <Carousel
    materias={materias}
    yearsPerTab={yearsPerTab}
    updateFn={updateEstado}
  />
  );
}

export default CarouselView;
