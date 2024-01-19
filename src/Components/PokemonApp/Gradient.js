

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './GradientCss.module.css';

const GradientDiv = ({data}) => {

  // console.log(` Gradient id : ${props.data.id}`);
  const [types, setTypes] = useState([]);
  

  const fetchData = async () => {
    const apiTypes = data.types;

    if (Array.isArray(apiTypes)) {
      setTypes(apiTypes.map((type) => type.type.name.toUpperCase()));
    } 
    else if (apiTypes && apiTypes.type) {
      setTypes([apiTypes.type.name.toUpperCase()]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const isSingleType = Array.isArray(types) && types.length === 1;
  const categories = generateCategories(); 
  const backgroundColor = isSingleType ? categories.find((cat) => cat.category === types[0]).color : '';
  const gradientString = isSingleType ? '' : `linear-gradient(to bottom, ${types.map((type) => categories.find((cat) => cat.category === type).color).join(', ')})`;

  const divStyle = {
    
    background: backgroundColor || gradientString,
    
  };
  
  return (
    
            <div style={divStyle} className={style.card}>
            <img src={data.sprites.other.dream_world.front_default} alt="" />
            <h2>{data.name}</h2>
            <h2>{data.id}</h2>
            {/* <h3>{props.data.ability.effect_entries.effect}</h3> */}
            </div>
        
    
  );
};

export default GradientDiv;


const generateCategories = () => {
  return [
    
    { category: 'NORMAL', color: '#DDCBD0' },
    { category: 'FIGHTING', color: '#FCC1B0' },
    { category: 'FLYING', color: '#B2D2E8' },
    { category: 'POISON', color: '#CFB7ED' },
    { category: 'GROUND', color: '#F4D1A6' },
    { category: 'ROCK', color: '#C5AEA8' },
    { category: 'BUG', color: '#C1E0C8' },
    { category: 'GHOST', color: '#D7C2D7' },
    { category: 'STEEL', color: '#C2D4CE' },
    { category: 'FIRE', color: '#EDC2C4' },
    { category: 'WATER', color: '#CBD5ED' },
    { category: 'GRASS', color: '#C0D4C8' },
    { category: 'ELECTRIC', color: '#E2E2A0' },
    { category: 'PSYCHIC', color: '#DDC0CF' },
    { category: 'ICE', color: '#C7D7DF' },
    { category: 'DRAGON', color: '#CADCDF' },
    { category: 'DARK', color: '#C6C5E3' },
    { category: 'FAIRY', color: '#E4C0CF' },
    { category: 'UNKNOWN', color: '#C0DFDD' },
    { category: 'SHADOW', color: '#CACACA' }
    
  ];
};
