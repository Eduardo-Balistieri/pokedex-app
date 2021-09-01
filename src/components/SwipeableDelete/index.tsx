import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedGestureHandler, withTiming, useAnimatedStyle, interpolate, useDerivedValue, Easing, runOnJS } from 'react-native-reanimated'

import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'



const WINDOW_WIDTH = Dimensions.get('window').width

interface SwipeableDeleteProps {
   children: React.ReactNode
   boxHeight: number
   removePokemon: () => void
}

const SwipeableDelete = ({ children, boxHeight, removePokemon }: SwipeableDeleteProps) => {
   const translateX = useSharedValue(0)
   const favoriteBlockHeight = useSharedValue(boxHeight)

   const size = useDerivedValue(() => (
      Math.abs(translateX.value) < boxHeight
         ? Math.abs(translateX.value)
         : Math.abs(translateX.value) + (Math.abs(translateX.value) - boxHeight)
   ))

   const finalPosition = useDerivedValue(() => (
      Math.abs(translateX.value) < boxHeight
         ? 0
         : (Math.abs(translateX.value) - boxHeight) / -2
   ))


   const wrapper = () => {
      setTimeout(() => removePokemon(), 400)
   }

   const gestureHandler = useAnimatedGestureHandler({
      onStart: (event, context: any) => {
         context.startX = translateX.value
      },
      onActive: (event, context) => {
         const newPos = context.startX + event.translationX
         translateX.value = newPos > 0 ? 0 : newPos
      },
      onEnd: (event, context) => {
         translateX.value = translateX.value <= -boxHeight ? withTiming(-boxHeight) : withTiming(0)

         if (translateX.value <= -boxHeight * 1.5) {
            translateX.value = withTiming(-WINDOW_WIDTH, { easing: Easing.linear, duration: 300 })
            favoriteBlockHeight.value = withTiming(0, { easing: Easing.linear, duration: 300 })

            runOnJS(Haptics.impactAsync)()
            runOnJS(wrapper)()
         }
      }
   })

   const blockAnimatedStyles = useAnimatedStyle(() => {
      return {
         transform: [{ translateX: translateX.value }]
      }
   })

   const wrapperStyles = useAnimatedStyle(() => {
      return {
         borderRadius: size.value / 2,
         width: size.value,
         height: size.value,
         transform: [{ translateX: finalPosition.value }]
      }
   })

   const iconOpacity = useAnimatedStyle(() => {
      return {
         opacity: interpolate(size.value, [boxHeight - 50, boxHeight], [0, 1])
      }
   })

   const animatedBlockHeight = useAnimatedStyle(() => {
      return {
         height: favoriteBlockHeight.value,
         marginBottom: favoriteBlockHeight.value === 0 ? 0 : 5
      }
   })

   return (
      <Animated.View style={[{ flex: 1, overflow: 'hidden' }, animatedBlockHeight]}>
         <PanGestureHandler onGestureEvent={gestureHandler} minDeltaX={10}>
            <Animated.View style={[styles.blockWrapper, blockAnimatedStyles]}>
               <View style={{ zIndex: 5 }}>
                  {children}
               </View>

               <Animated.View style={[styles.deleteWrapper, wrapperStyles]}>
                  <Animated.View style={iconOpacity}>
                     <Ionicons name='trash' size={25} color='#FFF' />
                  </Animated.View>
               </Animated.View>

            </Animated.View>
         </PanGestureHandler>
      </Animated.View>
   )
}

const styles = StyleSheet.create({
   blockWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
   },

   deleteWrapper: {
      backgroundColor: '#FF9580',
      justifyContent: 'center',
      alignItems: 'center'
   }
})

export default SwipeableDelete