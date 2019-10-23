import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {ThemeProvider} from 'react-native-elements'
import Screen from './src/Screen'

const App = () => (
  <ThemeProvider>
    <Screen />
  </ThemeProvider>
)

export default App
