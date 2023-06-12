import React, { useState, useEffect, useCallback } from 'react';
import Search from './Search';
import Favorites from './Favorites';
import Details from './Details';
import Drinks from './Drinks'
import './App.css';

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       favorites: [],
//       drinkDetail: [],
//       currentDrink: '',
//       currentDrinkId: 0,
//       currentDrinkDetailURL: '',
//       currentIngredients: [],
//       currentInstructions: '',
//       searchData: [],
//     }
//   }

//   componentDidMount() {
//     fetch('http://localhost:3001/')
//       .then(response => response.json())
//       .then(drinkData => {
//         this.setState({
//           data: drinkData.drinks
//         })
//       })
//     fetch(`http://localhost:3001/lookup/15300`)
//       .then(response => response.json())
//       .then(singleData => {
//         let allIngredients = [];
//         this.setState({
//           currentDrink: singleData.drinks[0].strDrink,
//           currentDrinkId: singleData.drinks[0].idDrink,
//           currentDrinkDetailURL: singleData.drinks[0].strDrinkThumb,
//           currentInstructions: singleData.drinks[0].strInstructions
//         })
//         for (let i = 1; i < 16; i++) {
//           if (singleData.drinks[0][`strIngredient${i}`]) {
//             allIngredients.push(singleData.drinks[0][`strMeasure${i}`] + ' ' + singleData.drinks[0][`strIngredient${i}`])
//           }
//         }
//         this.setState({
//           currentIngredients: allIngredients
//         })
//       })
//   }

//   fetchNewDetail(id) {
//     fetch(`http://localhost:3001/lookup/${id}`)
//       .then(response => response.json())
//       .then(singleData => {
//         let allIngredients = [];
//         this.setState({
//           currentDrink: singleData.drinks[0].strDrink,
//           currentDrinkId: singleData.drinks[0].idDrink,
//           currentDrinkDetailURL: singleData.drinks[0].strDrinkThumb,
//           currentInstructions: singleData.drinks[0].strInstructions
//         })
//         for (let i = 1; i < 16; i++) {
//           if (singleData.drinks[0][`strMeasure${i}`] !== null) {
//             allIngredients.push(singleData.drinks[0][`strMeasure${i}`] + ' ' + singleData.drinks[0][`strIngredient${i}`]);
//           } else {
//             allIngredients.push(singleData.drinks[0][`strIngredient${i}`]);
//           }
//         }
//         this.setState({
//           currentIngredients: allIngredients
//         })
//       })
//   }

//   fetchSearchDrink(word) {
//     if (word) {
//       fetch(`http://localhost:3001/search/${word}`)
//         .then(response => response.json())
//         .then(searchData => {
//           this.setState({ searchData: searchData.drinks })
//         })
//         .catch(() => {alert('No results found.')})
//     } else {
//       this.setState({searchData: this.state.data})
//     }
//   }

//   resetSeachData() {
//     this.setState({searchData: []});
//     console.log('search data has been cleared');
//   }

//   addFavorites(id) {
//     let fav;
//     let favAdd = [];
//     let currentFavs = [];
//     for (let drink of this.state.data) {
//       if (drink.idDrink === id) {
//         fav = drink;
//       }
//     }
//     for (let drink of this.state.searchData) {
//       if (drink.idDrink === id) {
//         fav = drink;
//       }
//     }
//     if (this.state.favorites.length === 0) {
//       favAdd.push(fav);
//       this.setState({
//         favorites: this.state.favorites.concat(favAdd)
//       });
//     } else {
//       for (let favDrinks of this.state.favorites) {
//         currentFavs.push(favDrinks.idDrink);
//       }
//       if (currentFavs.includes(id)) {
//         alert('This drink is already your favorite!');
//       } else {
//         favAdd.push(fav);
//         this.setState({
//           favorites: this.state.favorites.concat(favAdd)
//         });
//       }
//     }
//   }

//   render() {
//     if (this.state.currentIngredients.length !== 0) {
//       return (
//         <>
//           <div className='left-section'>
//             <Search fetchSearchDrink={this.fetchSearchDrink.bind(this)} resetSeachData={this.resetSeachData.bind(this)} />
//             <h2> Favorites </h2>
//             <div className='favorites-section'>
//               <Favorites favorites={this.state.favorites} fetchNewDetail={this.fetchNewDetail.bind(this)} />
//             </div>
//           </div>
//           <div className='details-section'>
//             <Details currentDrink={this.state.currentDrink} currentIngredients={this.state.currentIngredients} currentDrinkDetailURL={this.state.currentDrinkDetailURL} currentInstructions={this.state.currentInstructions} currentDrinkId={this.state.currentDrinkId} />
//             <button id={this.state.currentDrinkId} className='favorite-button' onClick={(event) => { this.addFavorites(event.target.id) }}>Add to favorite</button>
//           </div>
//           <div className='display-drinks'>
//             <Drinks data={this.state.data} fetchNewDetail={this.fetchNewDetail.bind(this)} searchData={this.state.searchData} />
//           </div>
//         </>
//       )
//     }
//   }
// }

export const AppContext = React.createContext();

const App = () => {
  let [data, setData] = useState([]);
  let [favorites, setFavorites] = useState([]);
  let [currentDrink, setCurrentDrink] = useState('');
  let [currentDrinkId, setCurrentDrinkId] = useState(0);
  let [currentDrinkDetailURL, setCurrentDrinkDetailURL] = useState('');
  let [currentIngredients, setCurrentIngredients] = useState([]);
  let [currentInstructions, setCurrentInstructions] = useState('');
  let [searchData, setSearchData] = useState([]);

  // this is the initial fetch
  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(drinkData => {
        setData(drinkData.drinks);
      })
    fetch('http://localhost:3001/lookup/15300')
      .then(res => res.json())
      .then(singleData => {
        let allIngredients = [];
        setCurrentDrink(singleData.drinks[0].strDrink);
        setCurrentDrinkId(singleData.drinks[0].idDrink);
        setCurrentDrinkDetailURL(singleData.drinks[0].strDrinkThumb);
        setCurrentInstructions(singleData.drinks[0].strInstructions);
        for (let i = 0; i < 16; i++) {
          if (singleData.drinks[0][`strMeasure${i}`] !== null) {
            allIngredients.push(singleData.drinks[0][`strMeasure${i}`] + ' ' + singleData.drinks[0][`strIngredient${i}`]);
          } else {
            allIngredients.push(singleData.drinks[0][`strIngredient${i}`]);
          }
        }
        setCurrentIngredients(allIngredients);
      });
  }, []);

  let fetchNewDetail = (id) => {
    fetch(`http://localhost:3001/lookup/${id}`)
      .then(res => res.json())
      .then(singleData => {
        let allIngredients = [];
        setCurrentDrink(singleData.drinks[0].strDrink);
        setCurrentDrinkId(singleData.drinks[0].idDrink);
        setCurrentDrinkDetailURL(singleData.drinks[0].strDrinkThumb);
        setCurrentInstructions(singleData.drinks[0].strInstructions);
        for (let i = 0; i < 16; i++) {
          if (singleData.drinks[0][`strMeasure${i}`] !== null) {
            allIngredients.push(singleData.drinks[0][`strMeasure${i}`] + ' ' + singleData.drinks[0][`strIngredient${i}`]);
          } else {
            allIngredients.push(singleData.drinks[0][`strIngredient${i}`]);
          }
        }
        setCurrentIngredients(allIngredients);
      })
  }

  let fetchSearchDrink = (word) => {
    if (word) {
      fetch(`http://localhost:3001/search/${word}`)
        .then(res => res.json())
        .then(searchData => {
          setSearchData(searchData.drinks);
        })
        .catch(() => { alert('No results found.') })
    } else {
      setSearchData(data);
    }
  }

  let resetSeachData = useCallback(() => {
    setSearchData([]);
    console.log('search data has been cleared');
  })

  let removeFromFavorite = (id) => {
    let removeIndex;
    for (let drink of favorites) {
      if (drink.idDrink === id) {
        removeIndex = favorites.indexOf(drink);
      }
    }
    setFavorites(favorites.toSpliced(removeIndex, 1));
  }

  let addFavorites = (id) => {
    let fav;
    let favAdd = [];
    let currentFavs = [];
    for (let drink of data) {
      if (drink.idDrink === id) {
        fav = drink;
      }
    }
    for (let drink of searchData) {
      if (drink.idDrink === id) {
        fav = drink;
      }
    }
    if (favorites.length === 0) {
      favAdd.push(fav);
      setFavorites(favorites.concat(favAdd));
    } else {
      for (let favDrinks of favorites) {
        currentFavs.push(favDrinks.idDrink);
      }
      if (currentFavs.includes(id)) {
        alert('This drink is already your favorite!');
      } else {
        favAdd.push(fav);
        setFavorites(favorites.concat(favAdd));
      }
    }
  }

  return (
    <>
      <AppContext.Provider value={{ 
        data, 
        currentDrink, 
        currentIngredients, 
        currentDrinkDetailURL, 
        currentInstructions, 
        currentIngredients, 
        currentDrinkId, 
        favorites, searchData, 
        fetchSearchDrink, 
        resetSeachData, 
        removeFromFavorite, 
        fetchNewDetail, 
        addFavorites 
        }}>
        <div className='left-section'>
          <Search />
          <h2> Favorites </h2>
          <div className='favorites-section'>
            <Favorites />
          </div>
        </div>
        <div className='details-section'>
          <Details />
        </div >
        <div className='display-drinks'>
          <Drinks />
        </div>
      </AppContext.Provider>
    </>
  )
}
export default App;