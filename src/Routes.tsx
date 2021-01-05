import React, { useCallback, useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { initDb } from './database/connection'

import * as SplashScreen from 'expo-splash-screen'
import * as ScreenOrientation from 'expo-screen-orientation'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Information from './screens/Information'
import Home from './screens/Home'
import Favorites from './screens/Favorites'

import { tabBarSettings } from './Routes.conf'

import { useDispatch } from 'react-redux'
import * as pokemonsActions from '../store/actions/pokemons'
import * as favoritesActions from '../store/actions/favorites'



const Stack = createStackNavigator()
Stack.Navigator.defaultProps = { screenOptions: { headerShown: false }, mode: 'card' }
const Tab = createBottomTabNavigator()



const PokemonRoutes = () => (
   <Stack.Navigator>
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='information' component={Information} />
   </Stack.Navigator>
)

const FavoritesRoutes = () => (
   <Stack.Navigator>
      <Stack.Screen name='favorites' component={Favorites} />
      <Stack.Screen name='information' component={Information} />
   </Stack.Navigator>
)


const AppMainRoutes = () => {

   const [isLoading, setIsLoading] = useState(true)
   const dispatch = useDispatch()


   const loadAsyncContent = useCallback(async () => {
      await SplashScreen.preventAutoHideAsync()
      await Font.loadAsync({
         Roboto300: require('./assets/fonts/Roboto-Light.ttf'),
         Roboto700: require('./assets/fonts/Roboto-Bold.ttf')
      })

      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

      
      initDb()
      dispatch(pokemonsActions.getInitialPokemons())
      dispatch(favoritesActions.getStoredFavorites())

      setIsLoading(false)
      await SplashScreen.hideAsync()
   }, [])

   useEffect(() => {
      loadAsyncContent()
   }, [])


   if (isLoading)
      return <AppLoading />

   return (
      <Tab.Navigator {...tabBarSettings}>
         <Tab.Screen name='pokemons' component={PokemonRoutes} options={{ title: 'Pokédex' }} />
         <Tab.Screen name='favorites' component={FavoritesRoutes} options={{ title: 'Favorites' }} />
      </Tab.Navigator>
   )
}

export default AppMainRoutes

