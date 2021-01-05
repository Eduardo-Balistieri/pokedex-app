import { ActionTypes, TypeKeys } from '../types/favoritesActions'
import { Pokemon } from '../../models/Pokemon'

const initialState = {
   pokemons: []
}

interface FavoritesState {
   pokemons: Array<Pokemon>
}

const favoritesReducer = (state: FavoritesState = initialState, action: ActionTypes): FavoritesState => {
   switch (action.type) {
      case TypeKeys.GET_FAVORITES:
         return {
            ...state,
            pokemons: action.favorites
         }

      case TypeKeys.ADD_FAVORITE:
         return {
            ...state,
            pokemons: state.pokemons.concat(action.pokemonData)
         }

      case TypeKeys.REMOVE_FAVORITE:
         const updatedPokemons = state.pokemons.filter(pokemon => pokemon.id !== action.pokemonId)
         return {
            ...state,
            pokemons: updatedPokemons
         }

      default:
         return state
   }
}


export default favoritesReducer