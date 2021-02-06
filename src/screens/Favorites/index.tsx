import React from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

import { RootState } from '../../../store/types/rootState'
import { useSelector } from 'react-redux'

import ListHeader from '../../components/ListHeader'
import FavoriteBlock from '../../components/FavoriteBlock'
import { AntDesign } from '@expo/vector-icons'

import TranslucentStatusBar from '../../components/TranslucentStatusBar'


const Favorites = () => {
   const favorites = useSelector((state: RootState) => state.favorites.pokemons)

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            keyExtractor={item => item.id.toString()}
            data={favorites}

            ListHeaderComponent={(
               <ListHeader>
                  <>
                     <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Favorites</Text>
                     </View>
                     <View style={styles.swipeHint}>
                        <AntDesign name='questioncircleo' size={16} color='#FFF' style={{ marginRight: 5 }} />
                        <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '500' }}>Swipe to remove...</Text>
                     </View>
                  </>
               </ListHeader>
            )}

            renderItem={({ item }) => <FavoriteBlock pokemonData={item} />}
            showsVerticalScrollIndicator={false}
            bounces={false}

            ListFooterComponent={<View style={{ marginTop: 5 }} />}
         />

         {favorites.length === 0 && (
            <View style={styles.noFavorites}>
               <Text style={styles.noFavoritesTitle}>You have no favorites</Text>
               <Text style={styles.noFavoritesText}>Start adding !</Text>
            </View>
         )}
         <TranslucentStatusBar />
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
      top: '50%',
      alignSelf: 'center'
   },
   noFavoritesTitle: {
      color: '#555',
      fontFamily: 'Roboto700',
      textAlign: 'center',
      fontSize: 30
   },
   noFavoritesText: {
      color: '#555',
      fontFamily: 'Roboto300',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 5
   }
})

export default Favorites