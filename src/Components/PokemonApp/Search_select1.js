
import React, { useState } from 'react';
import style from './Search_select.module.css';

function Search_select1() {
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
      <div id="Selection1" className={style.text}>
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
            <input type="checkbox" checked={selectedOptions.includes('Normal')} onChange={() => handleCheckboxChange('Normal')}/>
            <div className={style.item_list}>Normal</div>
          </div>
          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Fighting')} onChange={() => handleCheckboxChange('Fighting')} />
            <div className={style.item_list}>Fighting</div>
          </div>


          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Flying')} onChange={() => handleCheckboxChange('Flying')} />
            <div className={style.item_list}>Flying</div>
          </div>


          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Poison')} onChange={() => handleCheckboxChange('Poison')} />
            <div className={style.item_list}>Poison</div>
          </div>


          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Ground')} onChange={() => handleCheckboxChange('Ground')} />
            <div className={style.item_list}>Ground</div>
          </div>


          {/* ---------------------------- */}
          <div id="Line" className={style.Line} />

          <div className={style.item}>
            <input type="checkbox" checked={selectedOptions.includes('Rock')} onChange={() => handleCheckboxChange('Rock')} />
            <div className={style.item_list}>Rock</div>
          </div>
 
        </div>
      )}
    </div>
  );
}

export default Search_select1;

