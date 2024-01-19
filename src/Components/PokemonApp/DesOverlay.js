import React  from 'react';

import style from './DesOverlay.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX } from '@fortawesome/free-solid-svg-icons';



const DesOverlay = ({ Des,onClose }) => {


    return (
        <div>
            <div className={style.overlay}>
                
                <div className={style.overlayContent}>
                    <div className={style.btn}>
                        <div><button className={style.Button} onClick={onClose}> <FontAwesomeIcon  icon={faX} beat /> </button></div>
                    </div>
                    <div><p>{Des}</p></div>
                    
                </div>
            </div>

        </div>
    );
}

export default DesOverlay;
