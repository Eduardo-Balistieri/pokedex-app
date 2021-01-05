import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { getColor } from '../../../assets/styles/Colors'


interface BaseStatsProps {
   stats: Array<{
      base: number
      name: string
   }>
   abilities: Array<{
      name: string
      isHidden: boolean
   }>
   baseHappiness: number
   color: string
   baseExperience: number
}

const BaseStats = ({ stats, abilities, baseHappiness, color, baseExperience }: BaseStatsProps) => {

   const formatStatName = (statName: string) => {
      if (statName.includes('special-')) {
         let newStatName = statName.replace('special-', 'sp. ')

         if (statName.includes('attack'))
            newStatName = newStatName.replace('attack', 'atk')

         if (statName.includes('defense'))
            newStatName = newStatName.replace('defense', 'def')

         return newStatName
      }
      return statName
   }

   return (
      <View style={{ flexDirection: 'column' }}>
         {stats.map(stat => (
            <View style={styles.stat} key={stat.name}>
               <Text style={styles.statName}>{formatStatName(stat.name)}</Text>
               <Text style={styles.statBase}>{stat.base}</Text>

               <View style={styles.statBar}>
                  <View style={{
                     backgroundColor: stat.base < 55 ? 'rgba(255, 0, 0, 0.35)' : 'rgba(0, 235, 0, 0.35)',
                     width: stat.base > 100 ? '100%' : stat.base.toString().concat('%'),
                     height: '100%'
                  }} />
               </View>
            </View>
         ))}

         <View>
            <Text style={styles.abilities}>Abilities</Text>
            {abilities.map(ability => (
               <View style={styles.ability} key={ability.name}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Entypo name='dot-single' size={20} color='#111' />
                     <Text style={styles.abilityName}>{ability.name}</Text>
                  </View>

                  {ability.isHidden && (
                     <>
                        <View style={styles.separator} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                           <Feather name='eye-off' size={15} color='#555' />
                           <Text style={{ color: '#555', fontSize: 12 }}> hidden</Text>
                        </View>
                     </>
                  )}
               </View>
            ))}
         </View>


         <Text style={styles.baseHappiness}>Base happiness</Text>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#111', fontSize: 11, fontWeight: '500', paddingRight: 10 }}>0</Text>
            <View style={styles.happinessBar}>
               <View style={{
                  backgroundColor: getColor(color),
                  width: baseHappiness > 100 ? '100%' : baseHappiness.toString().concat('%'),
                  height: '100%'
               }}
               />
            </View>
            <Text style={{ color: '#111', fontSize: 11, fontWeight: '500', paddingLeft: 10 }}>255</Text>
         </View>

         <View style={styles.experienceGainedWrapper}>
            <Ionicons name='ios-information-circle-outline' color='#555' size={16} />
            <Text style={styles.experienceGained}>{baseExperience} exp. gained for defeating this pokémon</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   stat: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 12,
   },
   statName: {
      color: '#BBB',
      fontSize: 16,
      textTransform: 'capitalize',
      fontWeight: '600',
      width: 90
   },
   statBase: {
      fontSize: 15,
      fontWeight: '700',
      color: '#111',
      width: 35,
      textAlign: 'center'
   },
   statBar: {
      flex: 1,
      backgroundColor: '#EEE',
      marginLeft: 10,
      height: 3,
      borderRadius: 10,
      overflow: 'hidden'
   },

   abilities: {
      marginTop: 15,
      marginBottom: 12,
      fontWeight: '600',
      fontSize: 18,
      fontFamily: 'Roboto700',
      color: '#555'
   },
   ability: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 5
   },
   abilityName: {
      textTransform: 'capitalize',
      color: '#222',
      marginLeft: 5,
      fontWeight: '500',
      fontSize: 13.5
   },

   separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#DDD',
      flex: 1,
      marginHorizontal: 20,
      borderRadius: 5
   },

   baseHappiness: {
      marginTop: 25,
      marginBottom: 5,
      fontSize: 15,
      fontWeight: '500',
      color: '#555'
   },
   happinessBar: {
      height: 3,
      flex: 1,
      borderRadius: 10,
      backgroundColor: '#EEE',
      overflow: 'hidden'
   },

   experienceGainedWrapper: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
   },
   experienceGained: {
      color: '#555',
      fontWeight: '500',
      marginLeft: 5
   }
})

export default BaseStats