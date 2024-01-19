
import './App.css';
import OwnFetch from './Components/PokemonApp/OwnFetch';
import Header from './Components/PokemonApp/Header';
import Search from './Components/PokemonApp/Search';

function App() {
  return (
    <div className='container'>     
      <Header></Header>
      <Search></Search>
      {/* <OwnFetch/> */}
      
    </div>

  );
}

export default App;
