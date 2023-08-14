import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native'
import { Box, Stack, Divider, View, Text, FlatList } from 'native-base'
import Header from '../header/header'
import * as RootNavigation from '../../navigation/RootNavigation'
import config from '../../helpers/config'

const Empty = () => (
  <View style={{ alignItems: 'center' }}>
    <Text>Empty</Text>
  </View>
)

const RenderItem = ({ item, navigation }) => (
  <Box
    key={item.id}
    rounded="lg"
    borderRadius="8"
    shadow="1"
    borderColor="coolGray.200"
    borderWidth="1"
    _web={{
      shadow: 1,
      borderWidth: 1
    }}
    _light={{
      backgroundColor: 'gray.50'
    }}
    style={styles.cardStyle}
    marginBottom={2}
  >
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('Post', { userId: item.id })
      }}
      activeOpacity={1}
    >
      <Box>
        <Stack p="1" ml="1.5">
          <View style={styles.cardViewTopStyle} mr="4" ml="2" mt="3">
            <Text
              style={{ fontWeight: 'bold' }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Name : {item.name}
            </Text>
          </View>
        </Stack>
        <Stack mb="1">
          <Divider my="2" bg="#D3D3D3" mb="1" />
          <View style={styles.cardViewBottomStyle}>
            <Box>
              <Text style={{ fontSize: 13 }}>Username : {item.username}</Text>
            </Box>
          </View>
          <View style={styles.cardViewBottomStyle}>
            <Box>
              <Text style={{ fontSize: 13 }}>Email : {item.email}</Text>
            </Box>
          </View>
        </Stack>
      </Box>
    </TouchableOpacity>
  </Box>
)

const User = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredUserData, setFilteredUserData] = useState([])

  const filterUserData = () => {
    const searchInput = searchQuery.toLowerCase()
    const filteredData = userData.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchInput) ||
        user.username.toLowerCase().includes(searchInput) ||
        user.email.toLowerCase().includes(searchInput)
      )
    })
    setFilteredUserData(filteredData)
  }

  useEffect(() => {
    fetch(`${config.api.baseUrl}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    filterUserData()
  }, [userData, searchQuery])

  return (
    <>
      <Header title="Users" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#363636" />
          </View>
        ) : (
          <FlatList
            data={searchQuery ? filteredUserData : userData}
            renderItem={({ item }) => (
              <RenderItem item={item} navigation={RootNavigation} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Empty />}
          />
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3'
  },
  cardViewTopStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardViewBottomStyle: {
    marginVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardStyle: {
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderRadius: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginVertical: 8,
    marginHorizontal: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    paddingLeft: 5
  }
})

export default User
