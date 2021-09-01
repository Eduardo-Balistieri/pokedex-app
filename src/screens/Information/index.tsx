import React, { useLayoutEffect, useRef } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import * as favoritesActions from '../../../store/actions/favorites'

import { RootState } from '../../../store/types/rootState'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import Animated, { Easing, Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming, runOnJS, useDerivedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

import { Pokemon } from '../../../models/Pokemon'
import { getColor } from '../../assets/styles/Colors'
import getColorVariant from '../../utils/getColorVariant'
import TabBar from '../../components/TabBar'


const SCREEN = Dimensions.get('screen')
const HEADER_HEIGHT = 90

const POKEMON_NAME_SCALE_FACTOR = 0.7
const BOTTOM_TAB_BORDER_RADIUS = 35
const CONTENT_PADDING = 46


interface RouteParams {
   pokemonData: Pokemon
}

const Information = () => {
   const BOTTOM_TAB_HEIGHT = useBottomTabBarHeight()
   const navigator = useNavigation()
   const dispatch = useDispatch()

   const { pokemonData } = useRoute().params as RouteParams
   const favorites = useSelector((state: RootState) => state.favorites.pokemons)

   const tabBarScrollView = useRef<ScrollView>(null)
   const initialTabBarYPosition = useSharedValue(0)    // initial position of tabBar on screen

   const maxTranslateYValue = useDerivedValue(() => {
      const x = SCREEN.height - (SCREEN.height - initialTabBarYPosition.value)
      return -(x - HEADER_HEIGHT)
   })

   const rotate = useSharedValue(0)
   const tabBarY = useSharedValue(0)
   const pokemonNameWidth = useSharedValue(0)


   const scrollToTop = () => {
      tabBarScrollView.current?.scrollTo({ y: 0, animated: true })
   }


   useLayoutEffect(() => {
      rotate.value = withRepeat(
         withTiming(360, { easing: Easing.linear, duration: 500000 }),
         -1
      )
   }, [])




   const onTabBarDrag = useAnimatedGestureHandler({
      onStart: (event, context: any) => {
         context.startY = tabBarY.value
      },
      onActive: (event, context: any) => {
         const newY = context.startY + event.translationY

         if (newY > 0)
            tabBarY.value = 0
         else if (newY < maxTranslateYValue.value)
            tabBarY.value = maxTranslateYValue.value
         else
            tabBarY.value = newY
      },
      onEnd: (event, context: any) => {
         const animConfig = {
            easing: Easing.linear,
            duration: 300
         }
         const actualY = tabBarY.value

         if (actualY < maxTranslateYValue.value / 2)
            tabBarY.value = withTiming(maxTranslateYValue.value, animConfig)

         else {
            tabBarY.value = withTiming(0, animConfig)
            runOnJS(scrollToTop)()
         }
      }
   })



   const draggableTabBarStyles = useAnimatedStyle(() => {
      return {
         transform: [{ translateY: tabBarY.value }]
      }
   })


   const pokemonImage = useDerivedValue(() => {
      return {
         opacity: interpolate(
            tabBarY.value,
            [-5, -50],
            [1, 0],
            Extrapolate.CLAMP
         ),
         translateY: interpolate(
            tabBarY.value,
            [-5, -50],
            [0, -20],
            Extrapolate.CLAMP
         )
      }
   })
   const pokemonImageStyles = useAnimatedStyle(() => {
      return {
         opacity: pokemonImage.value.opacity,
         transform: [{ translateY: pokemonImage.value.translateY }]
      }
   })



   const headerPokeball = useDerivedValue(() => {
      return {
         opacity: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 2, maxTranslateYValue.value],
            [0, 0.2],
            Extrapolate.CLAMP
         ),
         rotate: Platform.OS === 'ios' ? rotate.value : '0deg'
      }
   })
   const headerPokeballStyles = useAnimatedStyle(() => {
      return {
         opacity: headerPokeball.value.opacity,
         transform: [{ rotate: headerPokeball.value.rotate }]
      }
   })



   const pokemonNameWrapper = useDerivedValue(() => {
      return {
         translateX: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
            [0, (SCREEN.width / 2) - ((pokemonNameWidth.value * POKEMON_NAME_SCALE_FACTOR) / 2) - CONTENT_PADDING],
            Extrapolate.CLAMP
         ),
         translateY: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
            [0, -65],
            Extrapolate.CLAMP
         )
      }
   })

   const pokemonNameWrapperStyles = useAnimatedStyle(() => {
      const { translateX, translateY } = pokemonNameWrapper.value
      return { transform: [{ translateX }, { translateY }] }
   })



   const pokemonNameScale = useDerivedValue(() => {
      return interpolate(
         tabBarY.value,
         [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
         [1, POKEMON_NAME_SCALE_FACTOR],
         Extrapolate.CLAMP
      )
   })

   const pokemonNameStyles = useAnimatedStyle(() => {
      //extremelly helpful --> https://www.dcode.fr/function-equation-finder

      const maxSize = 40
      const minSize = (-0.00169229 * Math.pow(SCREEN.width, 2)) + (1.30341 * SCREEN.width) - 223.802

      const interpolatedFontSize = interpolate(
         pokemonData.name.length,
         [9, 14],
         [maxSize, minSize]
      )

      return {
         transform: [{ scale: pokemonNameScale.value }],
         fontSize: Math.min(40, interpolatedFontSize)
      }
   })


   const pokemonId = useDerivedValue(() => {
      return interpolate(
         tabBarY.value,
         [maxTranslateYValue.value / 3, maxTranslateYValue.value / 1.1],
         [1, 0],
         Extrapolate.CLAMP
      )
   })
   const pokemonIdOpacity = useAnimatedStyle(() => {
      return {
         opacity: pokemonId.value
      }
   })



   const pokemonInfo = useDerivedValue(() => {
      return interpolate(
         tabBarY.value,
         [maxTranslateYValue.value / 3, maxTranslateYValue.value / 1.3],
         [1, 0],
         Extrapolate.CLAMP
      )
   })
   const pokemonInfoOpacity = useAnimatedStyle(() => {
      return {
         opacity: pokemonInfo.value
      }
   })


   return (
      <LinearGradient
         colors={[getColor(pokemonData.color), getColorVariant(getColor(pokemonData.color), 50)]}
         style={{ flex: 1 }}
      >
         <View style={styles.header}>
            <Animated.View style={[styles.headerPokeball, headerPokeballStyles]}>
               <Image
                  source={require('../../assets/images/pokeball.png')}
                  style={{ width: '100%', height: '100%' }}
               />
            </Animated.View>

            <TouchableOpacity onPress={navigator.goBack} style={styles.headerBtn}>
               <AntDesign name='arrowleft' size={24} color='white' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerBtn} onPress={() => {
               favorites.find(pokemon => pokemon.id === pokemonData.id)
                  ? dispatch(favoritesActions.removeFavorite(pokemonData.id))
                  : dispatch(favoritesActions.addFavorite(pokemonData))
            }}>
               <AntDesign
                  name={favorites.find(pokemon => pokemon.id === pokemonData.id) ? 'heart' : 'hearto'}
                  size={24}
                  color='white'
               />
            </TouchableOpacity>
         </View>

         <View style={styles.japaneseNameWrapper}>
            <Text style={styles.japaneseName}>{pokemonData.japaneseName}</Text>
         </View>

         <View style={{ paddingHorizontal: CONTENT_PADDING / 2 }}>
            <View style={styles.mainContent}>
               <Animated.View style={pokemonNameWrapperStyles} pointerEvents='none'>
                  <Animated.Text
                     style={[styles.pokemonName, pokemonNameStyles]}
                     onLayout={event => {
                        const { width } = event.nativeEvent.layout
                        pokemonNameWidth.value = width
                     }}
                     numberOfLines={1}
                  >
                     {pokemonData.name}
                  </Animated.Text>
               </Animated.View>

               <Animated.View style={[styles.pokemonIdWrapper, pokemonIdOpacity]}>
                  <Text style={styles.pokemonId}>
                     #{pokemonData.id < 100 ? ('00' + pokemonData.id).slice(-3) : pokemonData.id}
                  </Text>
               </Animated.View>
            </View>

            <Animated.View style={[styles.info, pokemonInfoOpacity]}>
               <View style={styles.types}>
                  {pokemonData.types.map(type => (
                     <View key={type} style={styles.typeWrapper}>
                        <Text style={styles.type}>{type}</Text>
                     </View>
                  ))}
               </View>

               <Text style={styles.genera} numberOfLines={1}>{pokemonData.genera}</Text>
            </Animated.View>
         </View>

         <View style={styles.pokemonImageWrapper} pointerEvents='none'>
            {pokemonData.sprite ? (
               <Animated.View style={[styles.pokemonImage, pokemonImageStyles]}>
                  <Image style={{ width: '100%', height: '100%' }} source={{ uri: pokemonData.sprite as string }} />
               </Animated.View>
            ) : (
               <Animated.View style={pokemonImageStyles}>
                  <AntDesign name='question' size={200} color='#FFF' />
               </Animated.View>
            )}
         </View>

         <Animated.View
            style={[styles.bottomContent, draggableTabBarStyles]}
            onLayout={event => {
               const layout = event.nativeEvent.layout
               initialTabBarYPosition.value = layout.y
            }}
         >
            <PanGestureHandler onGestureEvent={onTabBarDrag} shouldCancelWhenOutside={false}>
               <Animated.View
                  style={{
                     position: 'absolute',
                     right: 0,
                     left: 0,
                     top: -10,
                     height: 95,
                     zIndex: 10,
                     backgroundColor: 'transparent'
                  }}
               />
            </PanGestureHandler>

            <ScrollView
               directionalLockEnabled
               ref={tabBarScrollView}
               showsVerticalScrollIndicator={false}
               style={{
                  borderTopLeftRadius: BOTTOM_TAB_BORDER_RADIUS,
                  borderTopRightRadius: BOTTOM_TAB_BORDER_RADIUS,
                  backgroundColor: '#FFF',
                  height: SCREEN.height - HEADER_HEIGHT - BOTTOM_TAB_HEIGHT
               }}
               contentContainerStyle={{
                  paddingTop: 20,
                  paddingBottom: 20
               }}
            >
               <TabBar pokemonData={pokemonData} />
            </ScrollView>
         </Animated.View>
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   header: {
      width: '100%',
      height: HEADER_HEIGHT,
      paddingHorizontal: CONTENT_PADDING / 2,
      paddingBottom: 20,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexDirection: 'row'
   },
   headerPokeball: {
      position: 'absolute',
      width: 200,
      height: 200,
      right: -58.5,
      top: -49
   },
   headerBtn: {
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center'
   },

   japaneseNameWrapper: {
      position: 'absolute',
      top: 230,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      width: SCREEN.width,
      alignSelf: 'center',
      flexWrap: 'nowrap',
      height: 100
   },
   japaneseName: {
      color: 'rgba(255, 255, 255, 0.3)',
      fontSize: 90,
      letterSpacing: -10,
      fontWeight: '900',
      marginRight: '-100%',
      marginLeft: '-100%'
   },

   mainContent: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-between'
   },

   pokemonNameWrapper: {
      height: '100%',
      justifyContent: 'center',
      flexShrink: 1,
      flex: 1
   },
   pokemonName: {
      color: 'white',
      fontFamily: 'Roboto700',
      textTransform: 'capitalize',
      alignSelf: 'flex-start'
   },

   pokemonIdWrapper: {
      paddingLeft: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end'
   },
   pokemonId: {
      color: 'white',
      fontFamily: 'Roboto700',
      fontSize: 23
   },

   info: {
      marginTop: 5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
   },
   types: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   typeWrapper: {
      borderRadius: 50,
      paddingVertical: 5,
      paddingHorizontal: 18,
      marginRight: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
   },
   type: {
      fontFamily: 'Roboto700',
      color: '#FFF',
      fontSize: 17,
      textTransform: 'capitalize'
   },
   genera: {
      color: '#FFF',
      fontSize: 14,
      textTransform: 'capitalize',
      fontWeight: '600',
      marginVertical: 10,
      flex: 1,
      textAlign: 'right'
   },

   pokemonImageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      zIndex: 10
   },
   pokemonImage: {
      width: 230,
      height: 230
   },

   bottomContent: {
      width: '100%',
      marginTop: -35,
      zIndex: 5
   }
})

export default Information