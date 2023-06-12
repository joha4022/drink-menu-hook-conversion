import './Drinks.css';
import React from 'react';
import { AppContext } from './App';

export default function Drinks() {
    const { data, fetchNewDetail, searchData } = React.useContext(AppContext);
    if (searchData.length > 0) {
        return (
            <>
                {searchData.map((drink) => {
                    return (
                        <div key={drink.idDrink} className='drink-thumbnail'>
                            <a className='drink-id' onClick={(event) => { fetchNewDetail(event.target.id) }}>
                                <img id={drink.idDrink} className='thumbnail-image' src={drink.strDrinkThumb}></img>
                            </a>
                            <h3 className='drink-name'>{drink.strDrink}</h3>
                        </div>
                    )
                })}
            </>
        )
    } else {
        return (
            <>
                {data.map((drink) => {
                    return (
                        <div key={drink.idDrink} className='drink-thumbnail'>
                            <a className='drink-id' onClick={(event) => { fetchNewDetail(event.target.id) }}>
                                <img id={drink.idDrink} className='thumbnail-image' src={drink.strDrinkThumb}></img>
                            </a>
                            <h3 className='drink-name'>{drink.strDrink}</h3>
                        </div>
                    )
                })}
            </>
        )
    }
}