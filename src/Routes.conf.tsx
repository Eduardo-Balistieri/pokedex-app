import React from 'react'

import { BottomTabScreenProps, BottomTabNavigationOptions, BottomTabBarOptions } from '@react-navigation/bottom-tabs'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'


const tabBarSettings = {
   tabBarOptions: {
      style: {
         height: 50
      },
      tabStyle: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center'
      },
      iconStyle: {
         width: 20,
         height: 20,
         flex: 0
      },
      labelStyle: {
         fontSize: 13,
         marginLeft: 10,
         fontWeight: '500'
      },
      activeBackgroundColor: '#FAFAFA',
      activeTintColor: '#E65069',
      inactiveTintColor: '#E3E3E3',
      keyboardHidesTabBar: true

   } as BottomTabBarOptions,

   screenOptions: ({ route }: BottomTabScreenProps<{}>): BottomTabNavigationOptions => ({
      tabBarIcon: ({ color }) => {
         if(route.name === 'pokemons')
            return <MaterialCommunityIcons name='pokeball' size={20} color={color} />
         else
            return <AntDesign name='hearto' size={18} color={color} />
      }
   })
}


export { tabBarSettings } 