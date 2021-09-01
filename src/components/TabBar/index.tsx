import React, { memo } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native'
import { Pokemon } from '../../../models/Pokemon'

import About from './About'
import BaseStats from './BaseStats'
import Evolution from './Evolution'


interface TabBarProps {
   pokemonData: Pokemon
}

const TabBar = ({ pokemonData }: TabBarProps) => (
   <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} bounces={false}>
      <View style={styles.menuContent}>
         <View style={styles.menuOption}>
            <Text style={styles.menuOptionContent}>About</Text>
         </View>
         <About
            textEntries={pokemonData.textEntries}
            weight={pokemonData.weight}
            height={pokemonData.height}
            habitat={pokemonData.habitat}
            eggGroups={pokemonData.eggGroups}
            captureRate={pokemonData.captureRate}
            color={pokemonData.color}
            growthRate={pokemonData.growthRate}
            isLegendary={pokemonData.isLegendary}
            isMythical={pokemonData.isMythical}
            femaleRate={pokemonData.femaleRate}
         />
      </View>

      <View style={styles.menuContent}>
         <View style={styles.menuOption}>
            <Text style={styles.menuOptionContent}>Base stats</Text>
         </View>
         <BaseStats
            stats={pokemonData.stats}
            abilities={pokemonData.abilities}
            baseHappiness={pokemonData.baseHappiness}
            color={pokemonData.color}
            baseExperience={pokemonData.baseExperience}
         />
      </View>

      {pokemonData.evolutionChain.length > 1 && (
         <View style={styles.menuContent}>
            <View style={styles.menuOption}>
               <Text style={styles.menuOptionContent}>Evolution</Text>
            </View>
            <Evolution
               evolutionChain={pokemonData.evolutionChain}
            />
         </View>
      )}
   </ScrollView>
)

const styles = StyleSheet.create({
   menuContent: {
      width: Dimensions.get('screen').width,
      paddingHorizontal: 20,
      paddingTop: 20,
      // paddingBottom: 0
   },
   menuOption: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginBottom: 20,
      width: '100%',
      borderBottomColor: '#DDD'
   },
   menuOptionContent: {
      fontWeight: '700',
      fontSize: 20,
      marginBottom: 7,
      fontFamily: 'Roboto700',
      color: '#555'
   }
})

export default memo(TabBar)