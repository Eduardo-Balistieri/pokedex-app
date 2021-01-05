import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

interface EvolutionProps {
   evolutionChain: Array<
      Array<{
         name: string
         pokemonSprite: string | null
         minLevel: number | null
         trigger: string
         pokemonId: number
      }>
   >
}

const Evolution = ({ evolutionChain }: EvolutionProps) => (
   <View>
      {evolutionChain.map((evolutionElement, index) => (
         <ScrollView horizontal pagingEnabled bounces={false} showsHorizontalScrollIndicator={false} key={index}>
            {evolutionElement.map((pokemon, index) => (
               <View key={pokemon.name}>
                  <View style={styles.pokemonWrapper} >
                     <View style={styles.levelWrapper}>
                        <Text style={styles.levelContent}>{pokemon.minLevel !== null ? `Lvl ${pokemon.minLevel}` : ''}</Text>
                     </View>

                     <View style={styles.pokemonImage}>
                        {pokemon.pokemonSprite
                           ? <Image style={{ width: '100%', height: '100%' }} source={{ uri: pokemon.pokemonSprite }} />
                           : <AntDesign name='question' size={130} color='#555' />
                        }
                     </View>

                     <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.pokemonName}>{pokemon.name}</Text>
                        <Text style={styles.pokemonId}>#{pokemon.pokemonId < 100 ? ('00' + pokemon.pokemonId).slice(-3) : pokemon.pokemonId}</Text>
                        {pokemon.trigger && (
                           <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.trigger}>Trigger - </Text>
                              <Text style={styles.triggerValue}>{pokemon.trigger.replace('-', ' ')}</Text>
                           </View>
                        )}
                     </View>
                  </View>

                  {evolutionElement.length > 1 && (
                     <View>
                        <View style={{
                           borderBottomColor: '#ddd',
                           borderBottomWidth: StyleSheet.hairlineWidth
                        }} />
                        {index === 0 && (
                           <View style={{ ...styles.scrollHint, alignSelf: 'flex-start' }}>
                              <Text style={styles.scrollHintText}>Scroll to see more evolutions</Text>
                           </View>
                        )}
                        {index === evolutionElement.length - 1 && (
                           <View style={{ ...styles.scrollHint, alignSelf: 'flex-end' }}>
                              <Entypo name='chevron-thin-left' size={13} color='#999' />
                           </View>
                        )}
                     </View>
                  )}
               </View>
            ))}
         </ScrollView>
      ))}
   </View >
)


const styles = StyleSheet.create({
   pokemonWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 5,
      width: Dimensions.get('screen').width - 40,
   },

   levelWrapper: {
      width: 60,
      alignItems: 'center'
   },
   levelContent: {
      fontWeight: '600',
      fontSize: 12,
      color: '#111'
   },

   pokemonImage: {
      width: 130,
      height: 130
   },

   pokemonName: {
      textTransform: 'capitalize',
      fontWeight: '500',
      fontSize: 15.5,
      color: '#111'
   },
   pokemonId: {
      paddingLeft: 10,
      color: '#444',
      fontSize: 14,
      fontWeight: '600',
      marginVertical: 3
   },
   trigger: {
      color: '#444',
      fontSize: 13,
      paddingLeft: 10
   },
   triggerValue: {
      textTransform: 'capitalize',
      fontSize: 13,
      color: '#444',
   },

   scrollHint: {
      flexDirection: 'row',
      marginTop: 5,
      alignItems: 'center'
   },
   scrollHintText: {
      fontSize: 13,
      color: '#999',
      marginRight: 5
   }
})

export default Evolution