import React from 'react'
import { Heading, HStack, ArrowBackIcon } from 'native-base'

const Header = (props) => {
  const { title, goBack } = props

  return (
    <HStack
      bg="#363636"
      p="2"
      px="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <HStack>
        {goBack ? (
          <ArrowBackIcon my="2px" size="6" color="#FFFFFF" onPress={goBack} />
        ) : null}
        <Heading style={{ color: 'white', textAlign: 'center', flex: 1 }}>
          {title}
        </Heading>
      </HStack>
    </HStack>
  )
}

export default Header
