import './Search.css'
import React from 'react';
import { AppContext } from './App';

export default function Search() {
    const { fetchSearchDrink, resetSeachData } = React.useContext(AppContext);
    return (
    <>
        <input placeholder='Search by liquor. . .' onKeyDown={(event)=> {
            if(event.key === 'Enter') {
                console.log('searching for', document.querySelector('input').value)
                fetchSearchDrink(event.target.value);
            } else if(event.key === 'Backspace' && document.querySelector('input').value.length < 2) {
                resetSeachData();
            }
        }}></input>  
    </>
    );
  }