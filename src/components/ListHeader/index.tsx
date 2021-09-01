import React from 'react'
import { StyleSheet, View, Image, Platform } from 'react-native'


interface ListHeaderProps {
   children: React.ReactNode
}

const ListHeader = ({ children }: ListHeaderProps) => (
   <View style={styles.listHeader}>
      {children}
      <View style={styles.floatingPokeball}>
         <Image
            source={require('../../assets/images/pokeball.png')}
            style={{ width: '100%', height: '100%' }}
         />
      </View>
   </View>
)

const styles = StyleSheet.create({
   listHeader: {
      marginBottom: 5,
      paddingHorizontal: 15,
      paddingTop: 60,
      paddingBottom: 25,
      backgroundColor: '#F75B75'
   },

   floatingPokeball: {
      position: 'absolute',
      right: -75,
      top: -75,
      opacity: 0.05,
      width: 180,
      height: 180,
      transform: [{ rotate: '45deg' }]
   }
})

export default ListHeader