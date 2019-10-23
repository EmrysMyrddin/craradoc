import React, { FC } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import {Input} from 'react-native-elements'

interface ScreenPropTypes {}

const Screen: FC<ScreenPropTypes> = () => (
  <View style={styles.container}>
    <Input label="Nom"/>
    <Input label="Prénom" containerStyle={styles.input}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 20
  }
});

export default Screen
