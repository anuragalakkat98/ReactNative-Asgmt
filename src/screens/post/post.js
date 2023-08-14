import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator
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

const RenderItem = ({ item }) => (
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
    <Box>
      <Stack p="1" ml="1.5">
        <View style={styles.cardViewTopStyle} mr="4" ml="2" mt="3">
          <Text
            style={{ fontWeight: 'bold' }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Title : {item.title}
          </Text>
        </View>
      </Stack>
      <Stack mb="1">
        <Divider my="2" bg="#D3D3D3" mb="1" />
        <View style={styles.cardViewBottomStyle}>
          <Box>
            <Text style={{ fontSize: 13 }}> {item.body}</Text>
          </Box>
        </View>
      </Stack>
    </Box>
  </Box>
)

const BackToUsers = () => {
  RootNavigation.navigate('User')
}

const Post = ({ route }) => {
  const { userId } = route.params
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${config.api.baseUrl}/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
        setLoading(false)
      })
  }, [userId])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#363636" />
      </View>
    )
  }

  return (
    <>
      <Header title="Posts" goBack={BackToUsers} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={posts}
          renderItem={RenderItem}
          ListEmptyComponent={<Empty />}
          keyExtractor={(item) => item.id.toString()}
        />
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
  }
})

export default Post
