import React, { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import * as favoritesActions from '../../../store/actions/favorites'

import { RootState } from '../../../store/types/rootState'
import { useNavigation, useRoute } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

import { Pokemon } from '../../../models/Pokemon'
import { getColor } from '../../assets/styles/Colors'
import { convertColor } from '../../utils/convertColor'
import TabBar from '../../components/TabBar'

import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

import Animated, { Easing, Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming, runOnJS, useDerivedValue } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'



const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height
const HEADER_HEIGHT = 90

interface RouteParams {
   pokemonData: Pokemon
}

const Information = () => {
   const navigator = useNavigation()
   const dispatch = useDispatch()

   const { pokemonData } = useRoute().params as RouteParams
   const favorites = useSelector((state: RootState) => state.favorites.pokemons)

   
   const tabBarScrollView = useRef<ScrollView>(null)
   

   const [pokemonIdWrapperWidth, setPokemonIdWrapperWidth] = useState(0)
   const [initialTabBarYPosition, setInitialTabBarYPosition] = useState(0)    // position of tabBar on screen
   
   const maxTranslateYValue = useSharedValue(0)
   const rotate = useSharedValue(0)
   const tabBarY = useSharedValue(0)


   const scrollToTop = () => {
      tabBarScrollView.current?.scrollTo({ y: 0, animated: true })
   }


   useEffect(() => {
      rotate.value = withRepeat(
         withTiming(360, { easing: Easing.linear, duration: 500000 }),
         -1
      )
   }, [])

   useEffect(() => {
      if (initialTabBarYPosition > 0) {
         const x = SCREEN_HEIGHT - (SCREEN_HEIGHT - initialTabBarYPosition)
         maxTranslateYValue.value = -(x - HEADER_HEIGHT)
      }
   }, [initialTabBarYPosition])





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
         opacity: interpolate(tabBarY.value, [-5, -50], [1, 0]),
         translateY: interpolate(tabBarY.value, [-5, -50], [0, -20], Extrapolate.CLAMP)
      }
   })
   const pokemonImageStyles = useAnimatedStyle(() => {
      const { opacity, translateY } = pokemonImage.value
      return {
         opacity,
         transform: [{ translateY }]
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
      const { opacity, rotate } = headerPokeball.value
      return {
         opacity,
         transform: [{ rotate }]
      }
   })



   const pokemonNameWrapper = useDerivedValue(() => {
      return {
         translateY: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
            [0, -63],
            Extrapolate.CLAMP
         ),
         translateX: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
            [0, (SCREEN_WIDTH / 2) - pokemonIdWrapperWidth],
            Extrapolate.CLAMP
         )
      }
   })
   const pokemonNamePosition = useAnimatedStyle(() => {
      const { translateX, translateY } = pokemonNameWrapper.value
      return {
         transform: [{ translateX }, { translateY }]
      }
   })


   const pokemonName = useDerivedValue(() => {
      const nameWrapperWidth = (SCREEN_WIDTH - 46) - pokemonIdWrapperWidth
      const fontSize = nameWrapperWidth / pokemonData.name.length * 1.75
      return {
         fontSize: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 1.5, maxTranslateYValue.value],
            [Math.min(fontSize, 38), 22],
            Extrapolate.CLAMP
         )
      }
   })
   const pokemonNameFontSize = useAnimatedStyle(() => {
      const { fontSize } = pokemonName.value
      return {
         fontSize
      }
   })


   const pokemonId = useDerivedValue(() => {
      return {
         opacity: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 3, maxTranslateYValue.value / 1.1],
            [1, 0],
            Extrapolate.CLAMP
         )
      }
   })
   const pokemonIdOpacity = useAnimatedStyle(() => {
      const { opacity } = pokemonId.value
      return {
         opacity
      }
   })


   const pokemonInfo = useDerivedValue(() => {
      return {
         opacity: interpolate(
            tabBarY.value,
            [maxTranslateYValue.value / 3, maxTranslateYValue.value / 1.3],
            [1, 0],
            Extrapolate.CLAMP
         )
      }
   })
   const pokemonInfoOpacity = useAnimatedStyle(() => {
      const { opacity } = pokemonInfo.value
      return {
         opacity
      }
   })



   return (
      <>
         <FocusAwareStatusBar hidden />

         <LinearGradient
            colors={[getColor(pokemonData.color), convertColor(getColor(pokemonData.color))]}
            style={{ height: SCREEN_HEIGHT }}
         >
            <View style={styles.header}>
               <Animated.View style={[styles.headerPokeball, headerPokeballStyles]}>
                  <Image source={require('../../assets/images/pokeball.png')} style={{ width: '100%', height: '100%' }} />
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

            <View style={{ paddingHorizontal: 23 }}>
               <View style={styles.mainContent}>
                  <Animated.View
                     pointerEvents='none'
                     style={[
                        styles.pokemonNameWrapper,
                        pokemonNamePosition,
                        { width: SCREEN_WIDTH - 46 - pokemonIdWrapperWidth }
                     ]}
                  >
                     <Text numberOfLines={1}>
                        <Animated.Text
                           style={[styles.pokemonName, pokemonNameFontSize]}
                           numberOfLines={1}
                        >
                           {pokemonData.name}
                        </Animated.Text>
                     </Text>
                  </Animated.View>

                  <Animated.View style={[styles.pokemonIdWrapper, pokemonIdOpacity]}
                     onLayout={event => {
                        const layout = event.nativeEvent.layout
                        setPokemonIdWrapperWidth(layout.width)
                     }}
                  >
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
                  setInitialTabBarYPosition(layout.y)
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
                        zIndex: 10
                     }}
                  />
               </PanGestureHandler>
               <ScrollView directionalLockEnabled ref={tabBarScrollView} showsVerticalScrollIndicator={false}>
                  <TabBar pokemonData={pokemonData} />
               </ScrollView>
            </Animated.View>

         </LinearGradient>
      </>
   )
}

const styles = StyleSheet.create({
   header: {
      width: '100%',
      height: 90,
      paddingHorizontal: 23,
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
      width: SCREEN_WIDTH,
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
      flexShrink: 1
   },
   pokemonName: {
      color: 'white',
      fontFamily: 'Roboto700',
      textTransform: 'capitalize'
   },

   pokemonIdWrapper: {
      paddingLeft: 10,
      height: '100%',
      justifyContent: 'center'
   },
   pokemonId: {
      color: 'white',
      fontFamily: 'Roboto700',
      fontSize: 23,
   },

   info: {
      marginTop: 8,
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
      paddingVertical: 4,
      paddingHorizontal: 20,
      marginRight: 10
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
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      width: '100%',
      paddingTop: 30,
      marginTop: -35,
      zIndex: 5,
      backgroundColor: '#FFF'
   }
})

export default Information