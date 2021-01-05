import { Pokemon } from '../../models/Pokemon'

export interface RootState {
   pokemons: {
      pokemons: Array<Pokemon>
      actualOffset: number
   }
   favorites: {
      pokemons: Array<Pokemon>
   }
}