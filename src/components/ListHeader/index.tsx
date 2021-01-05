import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, Image, Platform } from 'react-native'

import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'


interface ListHeaderProps {
   children: React.ReactNode
}

const ListHeader = ({ children }: ListHeaderProps) => {

   const rotate = useSharedValue(0)

   useLayoutEffect(() => {
      rotate.value = withRepeat(
         withSequence(
            withTiming(360, { easing: Easing.linear, duration: 2000000 })
         ),
         -1
      )
   }, [])

   const rotatingStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: Platform.OS === 'ios' ? rotate.value : '0deg' }]
   }))

   return (
      <View style={styles.listHeader}>
         {children}

         <Animated.View style={[styles.floatingPokeball, rotatingStyle]}>
            <Image
               source={require('../../assets/images/pokeball.png')}
               style={{ width: '100%', height: '100%' }}
            />
         </Animated.View>
      </View>
   )
}

const styles = StyleSheet.create({
   listHeader: {
      marginBottom: 10,
      paddingHorizontal: 15,
      paddingTop: 60,
      paddingBottom: 25,
      backgroundColor: '#E65069'
   },

   floatingPokeball: {
      position: 'absolute',
      right: -25,
      top: -90,
      opacity: 0.2,
      width: 190,
      height: 190,
      zIndex: 1
   }
})

export default ListHeader