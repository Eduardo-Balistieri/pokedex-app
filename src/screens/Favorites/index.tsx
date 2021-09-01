import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

import { RootState } from '../../../store/types/rootState'
import { useSelector } from 'react-redux'

import ListHeader from '../../components/ListHeader'
import FavoriteBlock from '../../components/FavoriteBlock'
import { AntDesign } from '@expo/vector-icons'


const Favorites = () => {
   const favorites = useSelector((state: RootState) => state.favorites.pokemons)

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            keyExtractor={item => item.id.toString()}
            data={favorites}
            renderItem={({ item }) => <FavoriteBlock pokemonData={item} />}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListHeaderComponent={(
               <ListHeader>
                  <>
                     <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Favorites</Text>
                     </View>
                     <View style={styles.swipeHint}>
                        <AntDesign name='exclamation' size={16} color='#FFF' style={{ marginRight: 5 }} />
                        <Text style={{ color: '#FFF', fontSize: 14 }}>Swipe to remove...</Text>
                     </View>
                  </>
               </ListHeader>
            )}
         />

         {favorites.length === 0 && (
            <View style={styles.noFavorites}>
               <Text style={styles.noFavoritesTitle}>You have no favorites</Text>
               <Text style={styles.noFavoritesText}>Start adding !</Text>
            </View>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   titleWrapper: {
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 5
   },
   title: {
      fontSize: 45,
      color: '#FFF',
      fontFamily: 'Roboto700'
   },

   swipeHint: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 2
   },

   noFavorites: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '60%',
      alignSelf: 'center'
   },
   noFavoritesTitle: {
      color: '#555',
      fontFamily: 'Roboto700',
      textAlign: 'center',
      fontSize: 26
   },
   noFavoritesText: {
      color: '#555',
      fontFamily: 'Roboto300',
      textAlign: 'center',
      fontSize: 16,
      marginTop: 5
   }
})

export default Favorites