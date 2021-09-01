import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getColor } from '../../../assets/styles/Colors'


interface AboutProps {
   textEntries: Array<string>
   weight: number
   height: number
   habitat: string
   eggGroups: Array<string>
   captureRate: number
   color: string
   growthRate: string
   isLegendary: boolean
   isMythical: boolean
   femaleRate: number
}

const About = ({ textEntries, weight, height, habitat, eggGroups, captureRate, color, growthRate, isLegendary, isMythical, femaleRate }: AboutProps) => (
   <View>
      <Text style={styles.about}>{textEntries[Math.floor(Math.random() * textEntries.length)]}</Text>
      
      <View style={styles.metrics}>
         <View>
            <Text style={styles.metric}>Height</Text>
            <View style={{ flexDirection: 'row' }}>
               <Text style={styles.metricValue}>{(height / 10).toFixed(1)} m</Text>
               <Text style={styles.metricValue}> ({((height / 10) * 3.281).toFixed(1)} ft)</Text>
            </View>
         </View>
         <View>
            <Text style={styles.metric}>Weight</Text>
            <View style={{ flexDirection: 'row' }}>
               <Text style={styles.metricValue}>{(weight / 10).toFixed(1)} kg</Text>
               <Text style={styles.metricValue}> ({((weight / 10) * 2.205).toFixed(1)} lbs)</Text>
            </View>
         </View>
      </View>


      <View>
         <Text style={styles.title}>Characteristics</Text>

         <View style={styles.rowInformation}>
            <Text style={styles.rowInformationName}>Gender</Text>
            {femaleRate === -1 ? (
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name='genderless' size={16} color='#111' />
                  <Text style={styles.rowInformationValue}> Genderless</Text>
               </View>
            ) : (
               <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                     <Ionicons name='ios-male' size={20} color='#59BCFF' />
                     <Text style={styles.rowInformationValue}> {(100 - femaleRate).toFixed(1)}%</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <Ionicons name='ios-female' size={20} color='#FF80F0' />
                     <Text style={styles.rowInformationValue}> {femaleRate.toFixed(1)}%</Text>
                  </View>
               </>
            )}
         </View>

         <View style={styles.rowInformation}>
            <Text style={styles.rowInformationName}>Egg Group(s)</Text>
            {eggGroups.map((eggGroup, index) => {
               if (index === eggGroups.length - 1)
                  return (
                     <Text key={index} style={styles.rowInformationValue}>{eggGroup}</Text>
                  )
               else
                  return (
                     <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.rowInformationValue}>{eggGroup}</Text>
                        <View style={styles.divisor} />
                     </View>
                  )
            })}
         </View>

         <View style={styles.rowInformation}>
            <Text style={styles.rowInformationName}>Habitat</Text>
            <Text style={styles.rowInformationValue}>{habitat}</Text>
         </View>

         <View style={styles.rowInformation}>
            <Text style={styles.rowInformationName}>Capture rate</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
               <Text style={{ color: '#111', fontSize: 11, fontWeight: '500', paddingRight: 10 }}>0</Text>
               <View style={styles.captureRateBar}>
                  <View style={{
                     backgroundColor: getColor(color),
                     width: captureRate > 100 ? '100%' : captureRate.toString().concat('%'),
                     height: '100%'
                  }}
                  />
               </View>
               <Text style={{ color: '#111', fontSize: 11, fontWeight: '500', paddingLeft: 10 }}>255</Text>
            </View>
         </View>

         <View style={styles.rowInformation}>
            <Text style={styles.rowInformationName}>Growth rate</Text>
            <Text style={styles.rowInformationValue}>{growthRate}</Text>
         </View>
      </View>


      <View style={styles.boxesWrapper}>
         <View
            style={{
               ...styles.boxWrapper,
               shadowColor: isLegendary ? '#FFB857' : 'transparent'
            }}
         >
            <View style={{ borderRadius: 50, overflow: 'hidden', flex: 1 }}>
               <LinearGradient
                  colors={isLegendary ? ['#FFC473', '#FFD396'] : ['#F6F6F6', '#F6F6F6']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={styles.box}
               >
                  <Text
                     style={{ ...styles.boxText, color: isLegendary ? 'white' : '#D5D5D5' }}
                  >Legendary</Text>
               </LinearGradient>
            </View>
         </View>

         <View
            style={{
               ...styles.boxWrapper,
               shadowColor: isMythical ? '#B74AFF' : 'transparent'
            }}
         >
            <View style={{ borderRadius: 50, overflow: 'hidden', flex: 1 }}>
               <LinearGradient
                  colors={isMythical ? ['#C071F5', '#C88BF0'] : ['#F6F6F6', '#F6F6F6']}
                  start={[0, 0.5]}
                  end={[1, 0.5]}
                  style={styles.box}
               >
                  <Text
                     style={{ ...styles.boxText, color: isMythical ? 'white' : '#D5D5D5' }}
                  >Mythical</Text>
               </LinearGradient>
            </View>
         </View>
      </View>
   </View>
)

const styles = StyleSheet.create({
   about: {
      color: '#111',
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center'
   },

   metrics: {
      backgroundColor: 'white',
      borderRadius: 10,

      marginTop: 20,
      marginBottom: 30,

      paddingVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-around',

      shadowColor: '#111',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.5,

      elevation: 3
   },
   metric: {
      fontSize: 17,
      color: '#CCC',
      fontWeight: '500',
      marginBottom: 5
   },
   metricValue: {
      color: '#111',
      fontSize: 13.5,
      fontWeight: '500'
   },


   title: {
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 17,
      fontFamily: 'Roboto700',
      color: '#555'
   },

   rowInformation: {
      flexDirection: 'row',
      marginBottom: 13,
      alignItems: 'center'
   },
   rowInformationName: {
      fontWeight: '600',
      color: '#CCC',
      fontSize: 14,
      width: 130,
      letterSpacing: -0.5
   },
   rowInformationValue: {
      textTransform: 'capitalize',
      fontWeight: '600',
      color: '#111'
   },
   divisor: {
      height: 14,
      width: 1.5,
      backgroundColor: '#111',
      marginHorizontal: 10,
      borderRadius: 5
   },

   captureRateBar: {
      height: 3,
      flex: 1,
      borderRadius: 10,
      backgroundColor: '#EEE',
      overflow: 'hidden'
   },


   boxesWrapper: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
   },
   boxWrapper: {
      shadowOffset: {
         width: 2,
         height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
      borderRadius: 50,
      flex: 1,
      height: 35,
      marginHorizontal: 15
   },
   box: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   boxText: {
      fontWeight: '500',
      fontSize: 13
   }
})

export default About