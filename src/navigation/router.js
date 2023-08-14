import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from './RootNavigation'
import User from '../screens/user/user'
import Post from '../screens/post/post'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen
          name="User"
          component={User}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
