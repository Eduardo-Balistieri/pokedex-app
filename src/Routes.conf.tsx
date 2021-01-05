import React from 'react'

import { BottomTabScreenProps, BottomTabNavigationOptions, BottomTabBarOptions } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'


const tabBarSettings = {
   tabBarOptions: {
      style: {
         height: 55
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
         let iconName: any

         switch (route.name) {
            case 'pokemons':
               iconName = 'home'
               break
            case 'favorites':
               iconName = 'hearto'
               break
            default:
               iconName = 'question'
               break
         }
         return <AntDesign name={iconName} size={20} color={color} />
      }
   })
}


export { tabBarSettings } 