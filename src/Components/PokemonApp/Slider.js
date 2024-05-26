
import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import style from './Slider.module.css'

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
        // value : actual value when slider is moved or else by default it return 0,0
        value={value}
        // this give range to its parent component
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

