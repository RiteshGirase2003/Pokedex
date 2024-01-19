import React from 'react'
import './Header.css'
function Header() {
  return (
    <div>
        <div id="RootRoot" className="header">
            <div id="Pagetitle" className="title">
                Pokédex
            </div>
            <div className='seperate'></div>

            <div id="Pagesubtitle" className="title-text">
                Search for any Pokémon that exists on the planet
            </div>
        </div>
        
    </div>
  );
}

export default Header