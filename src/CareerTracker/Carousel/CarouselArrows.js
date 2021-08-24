import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight
} from '@fortawesome/fontawesome-free-solid';
import './CarouselArrows.css';

const CarouselArrows = ({ prevFn, nextFn, showArrows }) => {
  if(!showArrows)
    return null;

  return (
  <>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size="3x"
        onClick={prevFn}
        data-testid="arrow-left"
        role="button"
        className="ArrowLeft"
      />
      <FontAwesomeIcon
        icon={faArrowRight}
        size="3x"
        onClick={nextFn}
        data-testid="arrow-right"
        role="button"
        className="ArrowRight"
       />
  </>
  );

}

export default CarouselArrows;
