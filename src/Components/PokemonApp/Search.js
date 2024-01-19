import React,{useState} from 'react'
import style from './Search.module.css'
import Search_select1 from './Search_select1'
import Search_select2 from './Search_select2'
import Search_select3 from './Search_select3'
import OwnFetch from './OwnFetch'

function Search() {

    const [search1Visible, setSearch1Visible] = useState(false);
    const [search2Visible, setSearch2Visible] = useState(false);
    const [search3Visible, setSearch3Visible] = useState(false);


    

  return (
    <div>

        <div id="NewRootRoot" className={style.search_container}>
            <div className={style.search1}>
                <div id="Placeholder1" className={style.Placeholder1}>
                Search by
                </div>
                <div className={style.category}>
                    <div id="Placeholder2" className={`${style.Placeholder} ${style.Placeholder2}`}>
                        Type
                    </div>
                    
                    <div id="Placeholder3" className={`${style.Placeholder} ${style.Placeholder3}`}>
                        Gender
                    </div>

                    <div id="Placeholder4" className={`${style.Placeholder} ${style.Placeholder4}`}>
                        Stats
                    </div>
                </div>
            </div>


            {/* ---------------------------------------------------------------------------- */}
            <div className={style.search2}>
                <div className={style.SearchColumn}>
                    <div id="Searchbar" className={style.Searchbar}>
                        <input id="Placeholder" className={style.search_input} placeholder='Name or Number'/>
                            
                    
                        <img src="https://file.rendit.io/n/7qhCboeHR7EPzKTjbI6q.svg" alt="Icon" id="Icon" className="" />
                        
                    </div>
                </div>
                <div className={style.category}>
                    
                    <Search_select1 ></Search_select1>

                    
                    <Search_select2></Search_select2>


                    <Search_select3></Search_select3>


                    
                </div>
            </div>
        </div>

        <OwnFetch/>

        
    </div>
  )
}

export default Search