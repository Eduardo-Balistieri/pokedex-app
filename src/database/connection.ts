import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('favorites.db')


const initDb = () => {
   db.exec([], false, () => { })

   const sqlQuery = `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY,
      pokemon TEXT
   )`

   db.transaction(
      (tx) => tx.executeSql(sqlQuery),
      (error) => console.log(error)
   )
}

export { db, initDb }