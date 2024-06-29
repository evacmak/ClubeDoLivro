import { Box, Icon, Text, Stack, SimpleGrid, Center, VStack } from '@chakra-ui/react';
import { MdAccountCircle, MdBook, MdChat } from 'react-icons/md';
import { Container } from 'semantic-ui-react';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align='center'>
      <Icon as={icon} w={10} h={10} color='#DF7F7F' />
      <Text fontWeight={600} m={0}>{title}</Text>
      <Text color={'gray.600'} textAlign='center' m={0}>{text}</Text>
    </Stack>
  );
};

export default function ThreeColumns() {
  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Passos a seguir:</h1>
      <VStack minHeight="15vh" justifyContent="center">
        <Center width="100%">
          <Container style={{ maxWidth: '100%' }}>
            <Box borderRadius='lg'>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
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
          </Container>
        </Center>
      </VStack>
    </>
  );
}
