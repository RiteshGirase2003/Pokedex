import React from 'react';
import style from './Progress.module.css';

const BaseStats = [
  { stat: "hp", value: 255 },
  { stat: "attack", value: 180 },
  { stat: "defense", value: 230 },
  { stat: "special-attack", value: 180 },
  { stat: "special-defense", value: 230 },
  { stat: "speed", value: 160 }
];

function ProgressBar({ name, fig }) {
  const figCal = (fig, stat) => {
    const statValue = BaseStats.find(entry => entry.stat === stat)?.value || null;
    // const percentage = (fig / statValue) * 100;
    const percentage = parseFloat(((fig / statValue) * 100).toFixed(2));
    // console.log(percentage)
    return percentage; 
  };

  return (
    <div className={style.progressBar}>
      <div className={style.item}>
        <div className={style.name}>{name}</div>
        <div className={style.bar}>
          <div className={style.progress} style={{ width: `${figCal(fig, name)}%` }}>{figCal(fig, name)}%</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
