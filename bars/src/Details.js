import './Details.css';
import { AppContext } from './App';
import React from 'react';

export default function Details() {
    const { currentDrink, currentIngredients, currentDrinkDetailURL, currentInstructions, currentDrinkId, addFavorites } = React.useContext(AppContext);
    return (
        <>
            <img id={currentDrinkId} className="details-image" src={currentDrinkDetailURL}></img>
            <h2 className="details-drink-name">{currentDrink}</h2>
            <h3>Recipe</h3>
            <div className="details-ingredients">
                {currentIngredients.map((ingredient, index) => {
                    return (
                        <p key={index}>{ingredient}</p>
                    )
                })}
            </div>
            <h3>Instructions</h3>
            <p className="details-instructions">{currentInstructions}</p>
            <button id={currentDrinkId} className='favorite-button' onClick={(event) => { addFavorites(event.target.id) }}>Add to favorite</button>
        </>
    )
}



