import { Pokemon } from '../../models/Pokemon'


export enum TypeKeys {
   ADD_FAVORITE = 'ADD_FAVORITE',
   REMOVE_FAVORITE = 'REMOVE_FAVORITE',
   GET_FAVORITES = 'GET_FAVORITES'
}

export interface AddFavoriteAction {
   type: TypeKeys.ADD_FAVORITE
   pokemonData: Pokemon
}
export interface RemoveFavoriteAction {
   type: TypeKeys.REMOVE_FAVORITE
   pokemonId: number
}
export interface GetFavoritesAction {
   type: TypeKeys.GET_FAVORITES
   favorites: Array<Pokemon>
}

export type ActionTypes =
   | AddFavoriteAction
   | RemoveFavoriteAction
   | GetFavoritesAction

