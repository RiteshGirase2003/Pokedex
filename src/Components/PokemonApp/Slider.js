
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = ({ value, onChange }) => {
  return (
    <div className={style.container}>
      <div>
        {value[0]}
      </div>
      <div className={style.SlidingBar}>
      <Slider
        range
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={onChange}
      />
      </div>
      <div>
        {value[1]}
      </div>
    </div>
  );
};

export default RangeSlider;

