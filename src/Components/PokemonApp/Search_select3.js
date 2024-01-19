
import React, { useState } from 'react';
import style from './Search_select.module.css';
import RangeSlider from './Slider';

function Search_select3() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedSliders, setSelectedSliders] = useState([]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleSliderChange = (sliderName, newRange) => {
    // Update selected sliders
    const updatedSelectedSliders = [...selectedSliders];
    const sliderIndex = updatedSelectedSliders.findIndex((slider) => slider.name === sliderName);

    if (newRange[1] > 0) {
      // If the slider has a value greater than 0, update or add it to the list
      if (sliderIndex !== -1) {
        updatedSelectedSliders[sliderIndex].range = newRange;
      } else {
        updatedSelectedSliders.push({ name: sliderName, range: newRange });
      }
    } else {
      // If the slider has a value of 0, remove it from the list
      if (sliderIndex !== -1) {
        updatedSelectedSliders.splice(sliderIndex, 1);
      }
    }

    setSelectedSliders(updatedSelectedSliders);
  };

  return (
    <div className={style.container} onClick={toggleOverlay}>
      <div className={style.box} >
        <div id="Selection3" className={style.text}>
          
        {selectedSliders.length > 0 ? (
          <>
            {`${selectedSliders[0].name} `}
            {selectedSliders.length > 1 ? <span className={style.span}>+{selectedSliders.length - 1} More</span> : ''}
          </>
        ) : (
          '-'
        )}

        </div>
        <img src="https://file.rendit.io/n/9Zxv08xoclElm85JmfnI.svg" alt="Stroke2" id="Stroke2" className={style.Stroke} />
      </div>

      {overlayVisible && (
        <div className={style.overlay2}>
          <div className={style.SliderBar}>
            <div>HP</div>
            <RangeSlider value={selectedSliders.find((slider) => slider.name === 'HP')?.range || [0, 0]} onChange={(newRange) => handleSliderChange('HP', newRange)} />
          </div>

          <div className={style.SliderBar}>
            <div>Attack</div>
            <RangeSlider value={selectedSliders.find((slider) => slider.name === 'Attack')?.range || [0, 0]} onChange={(newRange) => handleSliderChange('Attack', newRange)} />
          </div>

          <div className={style.SliderBar}>
            <div>Defense</div>
            <RangeSlider
              value={selectedSliders.find((slider) => slider.name === 'Defense')?.range || [0, 0]}
              onChange={(newRange) => handleSliderChange('Defense', newRange)}
            />
          </div>

          <div className={style.SliderBar}>
            <div>Speed</div>
            <RangeSlider
              value={selectedSliders.find((slider) => slider.name === 'Speed')?.range || [0, 0]}
              onChange={(newRange) => handleSliderChange('Speed', newRange)}
            />
          </div>

          <div className={style.SliderBar}>
            <div>Sp. Attack</div>
            <RangeSlider
              value={selectedSliders.find((slider) => slider.name === 'Sp. Attack')?.range || [0, 0]}
              onChange={(newRange) => handleSliderChange('Sp. Attack', newRange)}
            />
          </div>

          <div className={style.SliderBar}>
            <div>Sp. Defense</div>
            <RangeSlider
              value={selectedSliders.find((slider) => slider.name === 'Sp. Defense')?.range || [0, 0]}
              onChange={(newRange) => handleSliderChange('Sp. Defense', newRange)}
            />
          </div>

        </div>
      )}
    </div>
  );
}

export default Search_select3;
