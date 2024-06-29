import { Box, SimpleGrid, Icon, Text, Stack} from '@chakra-ui/react'
import {MdAccountCircle, MdBook, MdChat } from 'react-icons/md';


const Feature = ({ title, text, icon }) => {
  return (
    <Stack align='center' p={2}>
      <Icon as={icon} w={10} h={10} color='#DF7F7F' />
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'} textAlign='center'>{text}</Text>
    </Stack>
  );
};

export default function ThreeColumns() {
  return (
   
      <Box p={5} marginBottom={'30px'}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
          <Feature
            icon={MdAccountCircle}
            title={'1º Passo'}
            text={'Entra no clube'}
          />
          <Feature
            icon={MdBook}
            title={'2º Passo'}
            text={'Lê os livros com a comunidade'}
          />
          <Feature
            icon={MdChat}
            title={'3º Passo'}
            text={'Partilha as tuas opiniões sobre o que leste'}
          />
        </SimpleGrid>
      </Box>
  )
}
