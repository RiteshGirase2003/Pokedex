

import React, { useState } from 'react';
import style from './Search_select.module.css';

function Search_select2() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handleCheckboxChange = (option) => {
    const updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      updatedOptions.splice(updatedOptions.indexOf(option), 1);
    } else {
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);
  };

  return (
    <div className={style.container} onClick={toggleOverlay}>
      <div className={style.box} >
      <div id="Selection2" className={style.text}>
      {selectedOptions.length > 0 ? 
        (
          <>
            {`${selectedOptions[0]} `}
            {selectedOptions.length > 1 ? <span className={style.span}>+{selectedOptions.length - 1} More</span> : ''}
          </>
        ) : ('-')
      }
    </div>
        <img src="https://file.rendit.io/n/9Zxv08xoclElm85JmfnI.svg" alt="Stroke" id="Stroke" className={style.Stroke} />
      </div>

      {overlayVisible && (
        <div className={style.overlay1}>
          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Male')} onChange={() => handleCheckboxChange('Male')}/>
            <div className={style.item_list}>Male</div>
          </div>
          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Female')} onChange={() => handleCheckboxChange('Female')} />
            <div className={style.item_list}>Female</div>
          </div>


        </div>
      )}
    </div>
  );
}

export default Search_select2;

