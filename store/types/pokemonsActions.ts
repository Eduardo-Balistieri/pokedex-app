import { Pokemon } from '../../models/Pokemon'


export enum TypeKeys {
   GET_POKEMONS = 'GET_POKEMONS',
}

export interface GetPokemonsAction {
   type: TypeKeys.GET_POKEMONS
   pokemons: Array<Pokemon>
}

export type ActionTypes =
   | GetPokemonsAction

