import { Pokemon } from '../../models/Pokemon'
import { ActionTypes, TypeKeys } from '../types/pokemonsActions'


const initialState = {
   pokemons: [],
   actualOffset: 0
}

interface PokemonsState {
   pokemons: Array<Pokemon>
   actualOffset: number
}

const pokemonsReducer = (state: PokemonsState = initialState, action: ActionTypes): PokemonsState => {
   switch (action.type) {
      case TypeKeys.GET_POKEMONS:
         const allPokemons = state.pokemons.concat(action.pokemons)
         const updatedOffset = allPokemons.length

         return {
            ...state,
            pokemons: allPokemons,
            actualOffset: updatedOffset
         }

      default:
         return state
   }
}

export default pokemonsReducer