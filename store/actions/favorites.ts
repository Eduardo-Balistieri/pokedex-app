import { FavoritesService } from '../../src/services/database'
import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { TypeKeys, AddFavoriteAction, RemoveFavoriteAction, GetFavoritesAction } from '../types/favoritesActions'

import { Pokemon } from '../../models/Pokemon'


const FavoritesDB = new FavoritesService()

export const getStoredFavorites = (): ThunkAction<void, {}, {}, GetFavoritesAction> => {
   return async (dispatch: ThunkDispatch<{}, {}, GetFavoritesAction>) => {
      let storedFavorites: Array<Pokemon> = []

      const response = (await FavoritesDB.getStoredFavorites()).rows

      for (let index = 0; index < response.length; index++) {
         const storedPokemon: { id: number, pokemon: string } = response.item(index)
         const parsedPokemon = JSON.parse(storedPokemon['pokemon']) as Pokemon

         storedFavorites.push(parsedPokemon)
      }

      return dispatch({
         type: TypeKeys.GET_FAVORITES,
         favorites: storedFavorites
      })
   }
}

export const addFavorite = (pokemonData: Pokemon): AddFavoriteAction => {
   FavoritesDB.addFavorite(pokemonData)
   return {
      type: TypeKeys.ADD_FAVORITE,
      pokemonData: pokemonData
   }
}

export const removeFavorite = (pokemonId: number): RemoveFavoriteAction => {
   FavoritesDB.removeFavorite(pokemonId)
   return {
      type: TypeKeys.REMOVE_FAVORITE,
      pokemonId: pokemonId
   }
}
