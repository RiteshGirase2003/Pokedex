
// import React, { useState } from 'react';
// import style from './Search_select.module.css';

// function Search_select1({onApply}) {
//   const [overlayVisible, setOverlayVisible] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const toggleOverlay = () => {
//     setOverlayVisible(!overlayVisible);
//   };

//   const handleCheckboxChange = (option) => {
//     // this will spread the over the array

//     const updatedOptions = [...selectedOptions];

//     //this is to toggles checking of check box

//     // if the option is already in array and again clicked on it then it should remove it from array
//     // if it is not in array then push it 
//     if (updatedOptions.includes(option)) {
//       updatedOptions.splice(updatedOptions.indexOf(option), 1);
//     } else {
//       updatedOptions.push(option);
//     }

//     setSelectedOptions(updatedOptions);
//     onApply(updatedOptions);
//   };

//   return (
//     <div className={style.container} >
//       <div className={style.box} onClick={toggleOverlay} >
//         <div id="Selection1" className={style.text} >

//           {selectedOptions.length > 0 ? 
//             (
//               <>
//               {/* this it to show how many are selected */}
//                 {`${selectedOptions[0]} `}
//                 {selectedOptions.length > 1 ? <span className={style.span}>+{selectedOptions.length - 1} More</span> : ''}
//               </>
//             ) : ('-') 
//           }
//         </div>
//         <img src="https://file.rendit.io/n/9Zxv08xoclElm85JmfnI.svg" alt="Stroke" id="Stroke" className={style.Stroke} />
//       </div>

//       {overlayVisible && (
//         <div className={style.overlay1}>
//           <div className={style.item}>
//             <input type="checkbox" checked={selectedOptions.includes('Normal')} onChange={() => handleCheckboxChange('Normal')}/>
//             <div className={style.item_list}>Normal</div>
//           </div>
//           {/* ---------------------------- */}
//           <div id="Line" className={style.Line} />

//           <div className={style.item}>
//             {/* this check box will be checked if normal is present in selected option
//                 and onchange is calling a function
//             */}
//             <input type="checkbox" checked={selectedOptions.includes('Fighting')} onChange={() => handleCheckboxChange('Fighting')} />
//             <div className={style.item_list}>Fighting</div>
//           </div>


//           {/* ---------------------------- */}
//           <div id="Line" className={style.Line} />

//           <div className={style.item}>
//             <input type="checkbox" checked={selectedOptions.includes('Flying')} onChange={() => handleCheckboxChange('Flying')} />
//             <div className={style.item_list}>Flying</div>
//           </div>


//           {/* ---------------------------- */}
//           <div id="Line" className={style.Line} />

//           <div className={style.item}>
//             <input type="checkbox" checked={selectedOptions.includes('Poison')} onChange={() => handleCheckboxChange('Poison')} />
//             <div className={style.item_list}>Poison</div>
//           </div>


//           {/* ---------------------------- */}
//           <div id="Line" className={style.Line} />

//           <div className={style.item}>
//             <input type="checkbox" checked={selectedOptions.includes('Ground')} onChange={() => handleCheckboxChange('Ground')} />
//             <div className={style.item_list}>Ground</div>
//           </div>


//           {/* ---------------------------- */}
//           <div id="Line" className={style.Line} />

//           <div className={style.item}>
//             <input type="checkbox" checked={selectedOptions.includes('Rock')} onChange={() => handleCheckboxChange('Rock')} />
//             <div className={style.item_list}>Rock</div>
//           </div>

//           {/* ---------------------------------- */}
//           <div id="Line" className={style.Line} />
            
//           <div className={style.btns}>
//             <div>
//               <button type='button' onClick={()=>{setSelectedOptions([]); onApply([])}}> Clear </button>
//             </div>
//           </div>
          
 
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search_select1;


// ------------------------

import React, { useState } from 'react';
import style from './Search_select.module.css';

function Search_select1({onApply}) {
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
    onApply(updatedOptions)
  };

  const types = ['Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'];

  const generateCheckboxes = () => {
    return types.map((type) => (
      <>
        <div id="Line" className={style.Line} />
        <div key={type} className={style.item}>
          <input
            type="checkbox"
            checked={selectedOptions.includes(type)}
            onChange={() => handleCheckboxChange(type)}
          />
          <div className={style.item_list}>{type}</div>
        </div>
      </>
    ));
  };

  return (
    <div className={style.container}>
      <div className={style.box} onClick={toggleOverlay}>
        <div id="Selection1" className={style.text}>
          {selectedOptions.length > 0 ? (
            <>
              {`${selectedOptions[0]} `}
              {selectedOptions.length > 1 ? <span className={style.span}>+{selectedOptions.length - 1} More</span> : ''}
            </>
          ) : (
            '-'
          )}
        </div>
        <img src="https://file.rendit.io/n/9Zxv08xoclElm85JmfnI.svg" alt="Stroke" id="Stroke" className={style.Stroke} />
      </div>

      {overlayVisible && (
        <div className={style.overlay1}>
          {generateCheckboxes()}

          <div id="Line" className={style.Line} />
          <div className={style.btns}>
            <div>
              <button type='button' onClick={() => { setSelectedOptions([]); onApply([]) }}> Clear </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search_select1;


