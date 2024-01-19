import React, {useState, useEffect} from 'react';
import axios from 'axios';
import style from './styles.module.css';
import GradientDiv from './Gradient';
import Overlay from './Overlay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft,faSpinner } from '@fortawesome/free-solid-svg-icons';

function OwnFetch() {

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [data, setData] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState({});

  const fetchEvolution = async() =>{
    await fetchEvolutionChain();
  }
  useEffect(()=>{
    fetchEvolution();
  })
  useEffect(() => {
    fetchData();
  }, [url]);



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
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
  
        const pokemonData = response.data.results;
  
        const updatedPokemonData = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const result = await axios.get(pokemon.url);
            return result.data;
          })
        );
  
        setData(updatedPokemonData);
        // console.log(updatedPokemonData.id);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data from API: ", error.message);
      }
    };

    
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
      {  
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

          <div className={style.NavBtns}>
            <div className={style.NavBtn}>
              {prevUrl && (
                <button
                  
                  onClick={() => {
                    setData([])
                    setLoading(true);
                    setUrl(prevUrl);
                  }}
                >
                <h1><FontAwesomeIcon  icon={faArrowLeft} beat />  Previous</h1>
                </button>
              )}
            </div>
            <div className={style.NavBtn}>
              {nextUrl && (
                <button
                  
                  onClick={() => {
                    setData([])
                    setLoading(true);
                    setUrl(nextUrl);
                  }}
                >
                  <h1>Next <FontAwesomeIcon className={style.FontAwesome} icon={faArrowRight} beat /></h1>
                </button>
              )}
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default OwnFetch

