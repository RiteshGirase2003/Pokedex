import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import style from './Overlay.module.css';
import GradientDiv from './Gradient';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft, faX, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './ProgressBar';
import DesOverlay from './DesOverlay';


const Overlay = ({ data, evolutionGroups, id, onClose }) => {
  const [pokeID, setPokeID] = useState(id);
  const [pokeUrl, setPokeUrl] = useState(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const [pokeIndex, setPokeIndex] = useState(id-data[0].id)
  const [pokemonData, setPokemonData] = useState(() => data[pokeIndex]);
  const [selectedEvolutions, setSelectedEvolutions] = useState(evolutionGroups[pokemonData.name]);
  const [eggGroups, setEggGroups] = useState([]);
  const [description, setDescription] = useState('');
  const [genderRate, setGenderRate] = useState(null);
  const [gender, setGender] = useState();
  const [readMore, setReadMore] = useState(false)
  // Function to fetch additional data
  const fetchAdditionalData = async () => {
    try {
      
      const response = await axios.get(pokeUrl);
      const resData = response.data;
      // console.log(resData.gender_rate);
      setGenderRate(resData.gender_rate);

      const eggGroup =[];
      resData.egg_groups.map(name => eggGroup.push(name.name));
      setEggGroups(eggGroup);
      
      let Description='' 
      resData.flavor_text_entries.forEach(entry => {
        if (entry.language.name === 'en') {
          Description += entry.flavor_text;
        }
      });
      setDescription(Description);    
      
      
      

      console.log()
      
    } catch (error) {
      console.error('Error fetching additional data:', error.message);
    }
  };

  const handleRightClick = async() => {
    const nextId = pokeIndex+1 ;
    if (nextId ===data.length)
    {
      onClose();
    }
    else{
      const newPokemonData = data[nextId ]
      setPokeID(newPokemonData.id);
      setPokeUrl(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`)
      // setStats(newPokemonData.stats)
      setPokeIndex(nextId);
      setPokemonData(newPokemonData);
      setSelectedEvolutions(evolutionGroups[newPokemonData.name]);
    }
  };

  const handleLeftClick = async() => {
    const nextId = pokeIndex-1;
    if ( nextId<0)
    {
      onClose();
    }
    else{
      const newPokemonData = data[nextId ]
      setPokeID(newPokemonData.id);
      setPokeUrl(`https://pokeapi.co/api/v2/pokemon-species/${pokeID}`)
      // setStats(newPokemonData.stats)
      setPokeIndex(nextId);
      setPokemonData(newPokemonData);
      setSelectedEvolutions(evolutionGroups[newPokemonData.name]);
    }
  };

  

  

  const fetchData = async () =>{
    await fetchAdditionalData();
  }
  useEffect(() =>{
    
    
    fetchData();
    setGender(CheckGender());
    setDescription(formatDescription(description))

  },[pokeUrl])

  // description

  const formatDescription =(description) => {
    setDescription('')
    // Replace '\n' and '\f' with a space
    let formattedText = description.replace(/\\n|\\f/g, ' ');
    formattedText = description.replace(/\\f/g, ' ');

  
    // Replace single quotes with double quotes
    formattedText = formattedText.replace(/'/g, '"');
  
    return formattedText;
  };

  // gender extraction

  const CheckGender = ()=>{

    if (genderRate === 0)
    {
      return "Male";
    }
    else if (genderRate === 8)
    {
      return "Female";
    }
    else if (genderRate === -1)
    {
      return "Gender-Less";
    }
    else if (genderRate>0 && genderRate <8)
    {
      return "Male/Female";
    }
    

  }
  
  // height weight conversion
  const convertWeightToKilograms = (weightInHectograms) => {
    const weightInKilograms = weightInHectograms / 10;
    return `${weightInKilograms} kg`;
  };

  const convertHeightToFeetInches = (heightInDecimetres) => {
    const totalInches = heightInDecimetres * 3.93701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  };

  // description 
  const renderDescription = () => {
    const words =description.split(' ');
    const Text = words.slice(0, 20).join(' ');
    return <p>{Text}</p>;
  };
  const renderDes = renderDescription();

  // toggle read more
  const ReadMoreToggle = () =>{
    setReadMore(true)
  }
  return (
    <div className={style.overlay}>
      <div className={style.overlayContent}>
        
        <div className={style.first}>
                   
          <div key={pokeID} className={style.card}>
            <GradientDiv data={pokemonData}/>
          </div>


          
          <div className={style.Info}>
            <div className={style.name_id}>
        
              <h1 className={style.pokeName}>{pokemonData.name.toUpperCase()}</h1>
              <div className={style.line}></div>
              <h2 className={style.id} >{pokemonData.id}</h2>
              <div className={style.line}/>
              <div className={style.line}/>
              <button className={style.firstButton} onClick={() => handleLeftClick()}> <FontAwesomeIcon  icon={faArrowLeft} beat /> </button>
              <div className={style.line}/>
              <button className={style.firstButton} onClick={onClose}> <FontAwesomeIcon  icon={faX} beat /> </button>
              <div className={style.line}/>
              <button className={style.firstButton} onClick={() => handleRightClick()}><FontAwesomeIcon  icon={faArrowRight} beat /></button>
            </div> 
            <div className={style.des}>  {!description?<h1><FontAwesomeIcon  icon={faSpinner} pulse /></h1>:
              <div >
                {renderDes} <h3><button style={{ display:'inline', textDecoration: 'underline' ,border: 'none',outline:'none',background: 'transparent'}} onClick={() => ReadMoreToggle()}>Read More</button> </h3>
              </div>}
            </div>

          </div>
          
          {readMore && (
              
              <DesOverlay Des={description} onClose={() => setReadMore(false)}/>
          )}
          

        </div>

        {/* 2nd */}
         
        <div className={style.second}>
          <div className={style.second_1}>
            <div className={style.height}><strong>Height </strong><br /> {convertHeightToFeetInches(pokemonData.height)}</div>
            <div className={style.weight}><strong>Weight </strong><br /> {convertWeightToKilograms(pokemonData.weight)}</div>
            <div className={style.gender}><strong>Gender(s) </strong><br />{!gender?<FontAwesomeIcon  icon={faSpinner} pulse />:gender}</div>
            <div className={style.eggGroups}><strong>Egg Groups:</strong><br /> {!eggGroups.length?<FontAwesomeIcon  icon={faSpinner} pulse />:eggGroups.join(', ')}</div>
          
          </div> 
          
        </div> 
        


        {/* 3rd */}
        <div className={style.third}>
          <div className={style.third_1}>
            <div className={style.abilities}><strong>Abilities:</strong><br /> {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</div>
            
            <div className={style.types}>
              <strong>Types:</strong><br />
                
              {pokemonData.types.map(type => {
                
                const backgroundColor = Categories().find((cat )=> cat.category === type.type.name.toUpperCase())?.color || '#DDCBD0';
                
                const colorStyle ={
                  background: backgroundColor,
                };
                return (
                  <span key={type.type.name} className={style.type} style={colorStyle}>{type.type.name}</span>
                );
              })}
            </div>
          </div>
        </div>


       
        <div className={style.container}>
          <div className={style.stats}>
            <strong>Stats:</strong>
            <div className={style.statBar}>
              {!Array.isArray(data[pokeIndex].stats) ?<h1><FontAwesomeIcon  icon={faSpinner} pulse /></h1>:
              data[pokeIndex].stats.map((stat) => (
                <div key={stat.stat.name}>
                  <ProgressBar name={stat.stat.name} fig={stat.base_stat} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* evolution */}
        <div key={pokemonData.id} className={style.evolutionChain}>
          {!selectedEvolutions ?<h1><FontAwesomeIcon  icon={faSpinner} pulse /></h1>: selectedEvolutions.map((id, index) => {
            const EvolutionData = data[id-data[0].id]
            return <> 
                <div className={style.evolutionCard}>        
                  <GradientDiv  data={EvolutionData} />
                </div> 
                <div>
                  {
                  (index<selectedEvolutions.length-1)?<FontAwesomeIcon className={style.fontAwesome} icon={faArrowRight} beat />:null
                  }
                </div>
            </>
            
          })}

        </div>
        
      

        
      </div>
    </div>
  );
};

export default Overlay;
const Categories = () => {
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


//        <div key={pokemonData.id} className={style.evolutionChain}>
//           {!selectedEvolutions ?<h1><FontAwesomeIcon  icon={faSpinner} pulse /></h1>: selectedEvolutions.map((id, index) => {
//             const EvolutionData = data[id-data[0].id]
//             return <> 
//                 <div className={style.evolutionCard}>        
//                 <h1>{EvolutionData.id}</h1>     
//                   {/* <GradientDiv  data={EvolutionData} /> */}
//                 </div> 
//                 <div>
//                   {
//                   (index<selectedEvolutions.length-1)?<FontAwesomeIcon className={style.fontAwesome} icon={faArrowRight} beat />:null
//                   }
//                 </div>
//             </>
            
//           })}

//         </div>