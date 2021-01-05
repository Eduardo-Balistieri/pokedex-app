import React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'

import { useIsFocused } from '@react-navigation/native'


const FocusAwareStatusBar = (props: StatusBarProps) => {
   const isFocused = useIsFocused()

   return isFocused ? <StatusBar {...props} animated /> : null
}

export default FocusAwareStatusBar