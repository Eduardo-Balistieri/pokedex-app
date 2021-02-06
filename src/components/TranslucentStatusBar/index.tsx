import React from 'react'
import { StyleSheet, Platform, StatusBar } from 'react-native'
import { BlurView } from 'expo-blur'


interface TranslucentStatusBarProps {
   showBackground?: boolean
}

const TranslucentStatusBar = ({ showBackground = true }: TranslucentStatusBarProps) => (
   <BlurView
      style={[styles.statusBar, { opacity: showBackground ? 1 : 0 }]}
      intensity={100}
      tint='default'
   >
      <StatusBar barStyle='light-content' translucent />
   </BlurView>
)

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

export default TranslucentStatusBar