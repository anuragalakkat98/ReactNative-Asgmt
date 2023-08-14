import React from 'react'
import { NativeBaseProvider } from 'native-base'
import Router from './src/navigation/router'

const App = () => {
  return (
    <NativeBaseProvider>
      <Router />
    </NativeBaseProvider>
  )
}

export default App
