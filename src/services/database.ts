import { Pokemon } from '../../models/Pokemon';
import { db } from '../database/connection'
import { SQLResultSet, SQLError } from 'expo-sqlite'


const table = 'favorites'

const insertQuery = `INSERT INTO ${table} (id, pokemon) VALUES(?, ?)`
const deleteQuery = `DELETE FROM ${table} WHERE id = ?`
const selectQuery = `SELECT * FROM ${table}`


class FavoritesService {
   addFavorite(newFavorite: Pokemon) {
      return new Promise(
         (resolve) => db.transaction(tx => {
            tx.executeSql(
               insertQuery, [newFavorite.id, JSON.stringify(newFavorite)],
               (_, resultSet: SQLResultSet) => resolve(resultSet.insertId)
            ),
               (sqlError: SQLError) => console.log(sqlError)
         },
            (transactionError) => console.log(transactionError))
      )
   }

   removeFavorite(pokemonId: number) {
      db.transaction(
         tx => {
            tx.executeSql(
               deleteQuery, [pokemonId],
               () => { }
            ),
               (sqlError: SQLError) => console.log(sqlError)
         },
         (transactionError) => console.log(transactionError))
   }

   getStoredFavorites(): Promise<SQLResultSet> {
      return new Promise(
         (resolve) => db.transaction(tx => {
            tx.executeSql(
               selectQuery, [],
               (_, resultSet) => resolve(resultSet)
            ),
               (sqlError: SQLError) => console.log(sqlError)
         },
            (transactionError) => console.log(transactionError))
      )
   }

   deleteAll() {
      db.transaction(
         tx => {
            tx.executeSql(
               `DELETE FROM ${table} WHERE EXISTS`, [],
               () => { }
            ),
               (sqlError: SQLError) => console.log(sqlError)
         },
         (transactionError) => console.log(transactionError))
   }
}

export { FavoritesService }
