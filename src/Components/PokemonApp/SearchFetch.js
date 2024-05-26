import React, {useState, useEffect} from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faSpinner } from '@fortawesome/free-solid-svg-icons';

function SearchFetch({sliders, types, genders}) {

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025");
  const [data, setData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState({});
  const [searchData,setSearchData] = useState([]);

  const fetchEvolution = async() =>{
    await fetchEvolutionChain();
  }
  useEffect(()=>{
    fetchEvolution();
  },[])
  useEffect(() => {
    fetchData();      
  },[]);

  useEffect(() => {
    if( genders.length > 0){
      setLoading(false);

      fetchGender();
    }
  }, [loading,genders]);
  
  useEffect(() => {
    if (data.length > 0 && genderData.length > 0) {
      console.log(" use effect called ")
      sortSearch();
    }
  }, [sliders, types, genders, data, genderData]);

  

    // it is for which cards is selected ~
    const [selectedCardData, setSelectedCardData] = useState([]);
    

    // this for toggling overlay intialy kept false ( hidden )
    // it toggles the visibility as we click on the any card 
    const [isOverlayVisible,setIsOverlayVisible] = useState(false);

    

    

    // this fetchData function will call 2 more functions and wait when each of them is called and data is fetched
    const fetchData = async () =>{
      // this is to fetch data and will be stored in data variable
      
      await fetchPokemonData();

    }
    

    // 1st function : fetching data from pokemon 
    const fetchPokemonData = async () =>{
      try {
        const response = await axios.get(url);
        
  
        const pokemonData = response.data.results;
  
        const updatedPokemonData = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const result = await axios.get(pokemon.url);
            return result.data;
          })
        );
  
        setData(updatedPokemonData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data from API: ", error.message);
      }
    };

    //----------------------

    
    const fetchGender = async () => {
      try {
        setGenderData([]);
        const genderArray = await Promise.all(
          genders.map(async (gender) => await fetchGenderData(gender.toLowerCase()))
        );
        const newArray = Array.from(new Set(genderData.concat(genderArray)));
        setGenderData(newArray);
      } catch (error) {
        console.error('Error fetching gender data:', error);
      }
    };
    
    const fetchGenderData = async (gender) => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/gender/${gender}`);
    
        const pokemonNames = response.data.pokemon_species_details.map(
          (detail) => detail.pokemon_species.name
        );

        // console.log('Pokemon Species Names:', pokemonNames);

        return pokemonNames;
      } catch (error) {
        console.error(`Error fetching gender data for ${gender}:`, error);
        throw error; 
      }
    };
    //-------------
    // sorting 
    const sortSearch = async () =>{
      const SelectedPokemon = [];
      for(let i=0 ; i < 5;i++)
      {
        SelectedPokemon.push( SearchPokemon(data[i]));
      }

    }

    const SearchPokemon = (pokemon) =>{
      const pokemonType = pokemon.types.map((type) => type.name);
      console.log("pokemon name : "+pokemon.name+" : "+pokemonType);
    
    }

    //-------------------
    
    const fetchEvolutionChain = async () => {
      try {
        const allNames = [];
      const allIds = [];
        const  idsToAvoid = [210, 222, 225, 226, 227, 231, 238, 251];
        for (let id = 1; id <= 549; id++) {
          if (idsToAvoid.includes(id)) {
            continue;
          }
          const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
          const chain = response.data.chain;
  
          const pokemonInfo = extractAllSpecies(chain);
          
          allNames.push(pokemonInfo.map((pokemon) => pokemon.name));
          allIds.push(pokemonInfo.map((pokemon) => pokemon.id));
        
        }
        setGroups(groupPokemon(allNames, allIds));
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };
  
    
      const groupPokemon = (allNames, allIds) => {
        
        const allGroups = {};
    
        for (let i = 0; i < allNames.length; i++) {
          const name = allNames[i];
          const id = allIds[i];
    
          if (!allGroups[name]) {
            for (let j = 0; j < name.length; j++) {
              allGroups[name[j]] = id;

            }
          }
        }
    
        return allGroups;
      };
      
      const extractAllSpecies = (chain) => {
        const allSpecies = [];
    
        const extractSpecies = (evolution) => {
          const speciesData = evolution.species;
          allSpecies.push({
            id: extractIdFromUrl(speciesData.url),
          });
    
          if (evolution.evolves_to && evolution.evolves_to.length > 0) {
            evolution.evolves_to.forEach((nextEvolution) => {
              extractSpecies(nextEvolution);
            });
          }
        };
    
        const extractIdFromUrl = (url) => {
          const idMatch = url.match(/\/(\d+)\/$/);
          return idMatch ? parseInt(idMatch[1], 10) : null;
        };
    
        extractSpecies(chain);
        return allSpecies;
      };
    

    // -----

    const handleCardClick = (id) =>{
         
        setSelectedCardData(id);
        
        setIsOverlayVisible(true);
    }

    
    
  return (
    <div className={style.container}>
      {/* {  
      loading?<h1><FontAwesomeIcon  icon={faSpinner} pulse /></h1>:
        <>

          {data.map((pokemon) => (
          <div key={pokemon.id} className={style.card} onClick={() => handleCardClick(pokemon.id)}>
              <GradientDiv data={pokemon} />
          </div>
          ))}

          
          {isOverlayVisible && (
              <Overlay data={data} evolutionGroups={groups} id={selectedCardData} onClose={() => setIsOverlayVisible(false)}/>
          )}

          <div className={style.rowBreak}/>

          
        </>
      } */}

      {
        (types.length > 0) ? types.map((type) => <h1 key={type}>{type}</h1>) : '?'
      }

    </div>
  )
}

export default SearchFetch

