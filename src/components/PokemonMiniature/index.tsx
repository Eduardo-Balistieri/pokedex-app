import React, { memo } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Pokemon } from '../../../models/Pokemon'
import { getColor } from '../../assets/styles/Colors'
import { AntDesign } from '@expo/vector-icons'


interface PokemonMiniatureProps {
   pokemon: Pokemon
}

const PokemonMiniature = ({ pokemon: pokemonData }: PokemonMiniatureProps) => {
   const navigator = useNavigation()

   const pokemonInformationHandler = () => {
      navigator.navigate('information', { pokemonData })
   }

   return (
      <TouchableOpacity activeOpacity={0.6} onPress={pokemonInformationHandler}>
         <View style={{ ...styles.wrapper, backgroundColor: getColor(pokemonData.color) }}>
            <Text style={styles.name}>{pokemonData.name}</Text>

            <View style={styles.types}>
               {pokemonData.types.map(type => (
                  <View style={styles.typeWrapper} key={type}>
                     <Text style={styles.type}>{type}</Text>
                  </View>
               ))}
            </View>

            <Text style={styles.pokemonId}>
               #{pokemonData.id < 100 ? ('00' + pokemonData.id).slice(-3) : pokemonData.id}
            </Text>

            <View style={styles.floatingPokeball}>
               <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/images/pokeball.png')}
               />
            </View>

            <View style={styles.pokemonImage}>
               {pokemonData.sprite ? (
                  <Image
                     style={{ width: '100%', height: '100%' }}
                     source={{ uri: pokemonData.sprite as string }}
                  />
               ) : <AntDesign name='question' size={190} color='#FFF' />}
            </View>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      borderRadius: 25,
      flex: 1,
      height: 195,

      paddingVertical: 25,
      paddingHorizontal: 20,

      marginHorizontal: 15,
      marginVertical: 5,

      position: 'relative',
      overflow: 'hidden'
   },

   name: {
      fontFamily: 'Roboto700',
      color: '#FFF',
      fontSize: 26,
      textTransform: 'capitalize'
   },


   types: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginTop: 10
   },
   typeWrapper: {
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      paddingVertical: 4,
      paddingHorizontal: 20,
      marginBottom: 7
   },
   type: {
      fontFamily: 'Roboto700',
      color: '#FFF',
      fontSize: 16.5,
      textTransform: 'capitalize'
   },


   pokemonId: {
      fontFamily: 'Roboto700',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 26,
      position: 'absolute',
      top: 7,
      right: 15
   },


   floatingPokeball: {
      position: 'absolute',
      top: 30,
      left: -10,
      opacity: 0.1,
      width: 230,
      height: 230
   },

   pokemonImage: {
      position: 'absolute',
      width: 180,
      height: 180,
      bottom: -5,
      right: 5
   },
})

export default memo(PokemonMiniature)