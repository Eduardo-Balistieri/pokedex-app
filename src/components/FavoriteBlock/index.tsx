import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { getColor } from '../../assets/styles/Colors'
import { Pokemon } from '../../../models/Pokemon'
import { AntDesign } from '@expo/vector-icons'

import SwipeableDelete from '../SwipeableDelete'
import { useDispatch } from 'react-redux'
import * as favoritesActions from '../../../store/actions/favorites'


const FAVORITE_BLOCK_HEIGHT = 95
const SCREEN_WIDTH = Dimensions.get('screen').width

interface FavoriteBlockProps {
   pokemonData: Pokemon
}

const FavoriteBlock = ({ pokemonData }: FavoriteBlockProps) => {

   const navigator = useNavigation()
   const dispatch = useDispatch()

   const pokemonInformationHandler = () => {
      navigator.navigate('information', { pokemonData })
   }

   const removeFavoriteHandler = () => {
      dispatch(favoritesActions.removeFavorite(pokemonData.id))
   }

   return (
      <View style={{ marginHorizontal: 5 }}>
         <SwipeableDelete boxHeight={FAVORITE_BLOCK_HEIGHT} removePokemon={removeFavoriteHandler}>
            <TouchableOpacity activeOpacity={0.6} onPress={pokemonInformationHandler}>
               <View style={styles.favoriteBlock}>
                  <View
                     style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: getColor(pokemonData.color),
                        borderRadius: 15
                     }}
                  />

                  <View style={styles.pokemonImage}>
                     {pokemonData.sprite
                        ? <Image source={{ uri: pokemonData.sprite }} style={{ width: '100%', height: '100%' }} />
                        : <AntDesign name='question' size={90} color='#FFF' />
                     }
                  </View>

                  <View style={styles.textContent}>
                     <Text style={styles.pokemonName} numberOfLines={1}>{pokemonData.name}</Text>
                     <Text style={styles.pokemonId}>
                        #{pokemonData.id < 100 ? ('00' + pokemonData.id).slice(-3) : pokemonData.id}
                     </Text>
                  </View>

                  <View style={{ marginLeft: 5 }}>
                     {pokemonData.types.map((type, index) => (
                        <View key={type}
                           style={{ ...styles.typeWrapper, marginBottom: index < pokemonData.types.length - 1 ? 4 : 0 }}
                        >
                           <Text style={styles.type}>{type}</Text>
                        </View>
                     ))}
                  </View>

                  <View style={{
                     width: 180,
                     height: 180,
                     position: 'absolute',
                     opacity: 0.1,
                     top: -35,
                     left: -5,
                     zIndex: 5
                  }}>
                     <Image
                        source={require('../../assets/images/pokeball.png')}
                        style={{ width: '100%', height: '100%' }}
                     />
                  </View>
               </View>
            </TouchableOpacity>
         </SwipeableDelete>
      </View>
   )
}

const styles = StyleSheet.create({
   favoriteBlock: {
      paddingRight: SCREEN_WIDTH >= 375 ? 25 : 10,
      paddingLeft: SCREEN_WIDTH >= 375 ? 20 : 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: SCREEN_WIDTH - 10,
      height: FAVORITE_BLOCK_HEIGHT
   },

   pokemonImage: {
      width: 95,
      height: 95,
      zIndex: 10
   },

   textContent: {
      flex: 1,
      marginLeft: 10,
      zIndex: 10
   },
   pokemonName: {
      fontFamily: 'Roboto700',
      textTransform: 'capitalize',
      color: '#FFF',
      fontSize: 20
   },
   pokemonId: {
      color: 'rgba(0, 0, 0, 0.3)',
      fontWeight: '700',
      fontSize: 14
   },

   typeWrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 10,
      paddingVertical: 3,
      alignItems: 'center',
      justifyContent: 'center',
      width: 90
   },
   type: {
      textTransform: 'capitalize',
      fontWeight: '600',
      color: '#EEE',
      fontSize: 13
   }
})

export default FavoriteBlock