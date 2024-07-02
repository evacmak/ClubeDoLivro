import ImageCard from "../components/ImageCard";
import Hero from "../components/Hero";
import ThreeColumns from "../components/ThreeColumns";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Center, Image, Text, Divider } from "@chakra-ui/react";
import livroHarry from "../images/livro-harry.jpeg";
import cookiesFoto from "../images/cookies.jpeg";
import evaFoto from "../images/evaBookshop.jpeg";
import martaFoto from "../images/marta.jpeg";

const Homepage = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const firstBook = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=maria%francisca%gama"
      );
      const secondBook = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=angie%kim"
      );

      setBooks([firstBook.data, secondBook.data]);
    } catch (error) {
      console.log("Error fetching the books", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
 
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem', fontSize: '100px', fontFamily: 'Bebas, sans-serif', color: '#333333' }}>Clube do Livro</h1>
        <h1 style={{ textAlign: 'center', marginTop: '5px', fontSize: '30px', fontFamily: "Permanent Marker, cursive", color: "#3526DE", fontWeight: '1' }}>Eva & Marta</h1>
      </div>
      
      <Center>
        <Box display='flex' justifyContent='center' alignItems='center' marginTop='40px'>
          <Box
            maxW='400px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            m={2}
            position='relative'
            boxShadow='lg'
            textAlign='center'
          >
            <Image src={cookiesFoto} maxH='400px' />
            <Text
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              fontSize='xl'
              fontWeight='bold'
              color='white'
              zIndex='1'
              p={0}
              borderRadius='md'
              fontFamily={"Lato, sans-serif"}
              textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
            >
              Snacks & Books
            </Text>
          </Box>
          
          <Box
            maxW='400px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            m={2}
            position='relative'
            boxShadow='lg'
            textAlign='center'
            textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
          >
            <Image src={martaFoto} maxH='400px' />
            <Text
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              fontSize='xl'
              fontWeight='bold'
              color='white'
              zIndex='1'
              p={0}
              borderRadius='md'
              fontFamily={"Lato, sans-serif"}
              textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
            >
              Marta Santos
            </Text>
          </Box>

          <Box
            maxW='400px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            m={2}
            position='relative'
            boxShadow='lg'
            textAlign='center'
          >
            <Image src={evaFoto} maxH='400px' />
            <Text
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              fontSize='xl'
              fontWeight='bold'
              color='white'
              zIndex='1'
              p={0}
              borderRadius='md'
              fontFamily={"Lato, sans-serif"}
              textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
            >
              Eva Cmak
            </Text>
          </Box>

          <Box
            maxW='400px'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            m={2}
            position='relative'
            boxShadow='lg'
            textAlign='center'
          >
            <Image src={livroHarry} maxH='400px' />
            <Text
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              fontSize='xl'
              fontWeight='bold'
              color='white'
              zIndex='1'
              p={0}
              borderRadius='md'
              fontFamily={"Lato, sans-serif"}
              textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
            >
              Marcadores do Clube
            </Text>
          </Box>
        </Box>
      </Center>

      <Hero />
      <Center>
      <Divider w={'75%'}/>
      </Center>
      <ThreeColumns />
      <Center>
      <Divider w={'75%'}/>
      </Center>
      <Box w='100%'>
      <Center>
      <h1 style={{ textAlign: 'center', marginTop: '6rem' }}>Escolhas deste mês</h1>
      
      </Center>
      
      <div>
        {books.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '3rem', marginBottom: '3rem'}}>
            {books[0]?.items[0] && (
              <a href="https://clube-eva-marta.netlify.app/livro/a-cicatriz-maria-francisca%20gama" style={{ textDecoration: 'none' }}>
                <ImageCard
                  key={books[0].items[0].id} 
                  src={books[0].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                  header={books[0].items[0].volumeInfo?.title || 'No title available'}
                  meta={books[0].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                  extra='Ficção'
                  style={{ width: '300px', height: '300px' }}
                />
              </a>
            )}
            {books[1]?.items[0] && (
              <a href="https://clube-eva-marta.netlify.app/livro/quociente-de%20felicidade-angie-kim" style={{ textDecoration: 'none' }}>
                <ImageCard
                  key={books[1].items[0].id} 
                  src={books[1].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                  header={books[1].items[0].volumeInfo?.title || 'No title available'}
                  meta={books[1].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                  extra='Thriller'
                  style={{ width: '300px', height: '300px' }}
                />
              </a>
            )}
          </div>
        )}
      </div>
          </Box>
          <Center>
      <Divider w={'75%'}/>
      </Center>
          <Center>
      <Box w='75%'>
      <div>
      <p style={{textAlign:'justify', fontWeight: 'bold', marginTop:'60px' }}>Queridos leitores,</p>
      <p style={{textAlign:'justify'}}>Estes livros foram cuidadosamente selecionados para enriquecer as discussões e proporcionar momentos inesquecíveis de leitura e aprendizagem. Preparem-se para mergulhar em histórias que irão inspirar e conectar-nos ainda mais como comunidade literária.

Junta-te a nós neste mês especial da Penguin, onde vamos explorar juntos o poder transformador das palavras.</p>
<p style={{fontSize: '20px', fontFamily: "Permanent Marker, cursive", color: "#3526DE", marginTop:'50px'}} >Boas leituras!</p>

</div>
      </Box>
      </Center>
    </div>
  );
};

export default Homepage;
