'use client'


import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react'
//import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc'
/* 
interface FeatureProps {
    title: string
    text: string
    icon: ReactElement
  } */

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      {/* <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex> */}
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

export default function ThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          title={'1º Passo'}
          text={
            'Entra no clube'
          }
        />
        <Feature
          title={'2º Passo'}
          text={
            'Lê os livros com a comunidade'
          }
        />
        <Feature
          title={'3º Passo'}
          text={
            'Partilha as tuas opiniões sobre o que leste'
          }
        />
      </SimpleGrid>
    </Box>
  )
}