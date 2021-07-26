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
      <span className="ArrowLeft">
        <FontAwesomeIcon icon={faArrowLeft} size="3x" onClick={prevFn} />
      </span>
      <span className="ArrowRight">
        <FontAwesomeIcon icon={faArrowRight} size="3x" onClick={nextFn} />
      </span>
    </>
  );

}

export default CarouselArrows;
