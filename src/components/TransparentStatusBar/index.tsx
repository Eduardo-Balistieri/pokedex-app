import React from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'

import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { getColor } from '../../assets/styles/Colors'


interface TransparentStatusBarProps {
   screenY: Animated.SharedValue<number>
   opacityInput: [number, number]
   backgroundColor?: string
}

const TransparentStatusBar = ({ screenY, opacityInput, backgroundColor }: TransparentStatusBarProps) => {
   const translationY = useDerivedValue(() => screenY.value)

   const statusBarBackground = useAnimatedStyle(() => {
      return {
         opacity: interpolate(translationY.value, opacityInput, [0.5, 1], Extrapolate.CLAMP),
      }
   })

   return (
      <Animated.View
         style={[
            statusBarBackground,
            styles.statusBar,
            { backgroundColor: backgroundColor ? getColor(backgroundColor) : '#E65069' }
         ]}
      />
   )
}

const styles = StyleSheet.create({
   statusBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
      zIndex: 20
   }
})

// #E65069
export default TransparentStatusBar