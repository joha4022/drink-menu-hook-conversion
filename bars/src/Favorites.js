import React from 'react';
import './Favorites.css'
import { AppContext } from './App';

export default function Favorites() {
    const { favorites, fetchNewDetail, removeFromFavorite } = React.useContext(AppContext);
    if(favorites) {
        return <>
            {favorites.map((fav, index) => {
                return (
                    <a key={index} className='favorites'>
                        <img className='favorite-img' id={fav.idDrink} onClick={(event) => fetchNewDetail(event.target.id)} src={fav.strDrinkThumb}></img>
                        <button className='remove-favorite' id={fav.idDrink} onClick={(event) => removeFromFavorite(event.target.id)}>remove</button>
                    </a>
                )
            })
            }
        </>
    } else {
        return <></>
    }
    
}