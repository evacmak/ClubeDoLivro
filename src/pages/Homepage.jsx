import ImageCard from "../components/ImageCard";
import Hero from "../components/Hero";
import ThreeColumns from "../components/ThreeColumns";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import livroHarry from "../images/livro-harry.jpeg";
import cookiesFoto from "../images/cookies.jpeg";
import evaFoto from "../images/evaBookshop.jpeg";
import martaFoto from "../images/marta.jpeg";

const Homepage = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const firstBook = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=assistant%20to%20the%20villain"
      );
      const secondBook = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=love%20redesigned"
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
      <ThreeColumns />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Escolhas deste mês</h1>

      <div>
        {books.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '3rem', marginBottom: '3rem'}}>
            {books[0]?.items[0] && (
              <a href="https://clube-eva-marta.netlify.app/livro/assistant-to%20the%20villain-hannah-nicole%20maehrer" style={{ textDecoration: 'none' }}>
                <ImageCard
                  key={books[0].items[0].id} 
                  src={books[0].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                  header={books[0].items[0].volumeInfo?.title || 'No title available'}
                  meta={books[0].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                  extra='Romantasy 🔪❤️'
                  style={{ width: '300px', height: '300px' }}
                />
              </a>
            )}
            {books[1]?.items[0] && (
              <a href="https://clube-eva-marta.netlify.app/livro/love-redesigned-lauren-asher" style={{ textDecoration: 'none' }}>
                <ImageCard
                  key={books[1].items[0].id} 
                  src={books[1].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                  header={books[1].items[0].volumeInfo?.title || 'No title available'}
                  meta={books[1].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                  extra='Romance 👩‍❤️‍👨'
                  style={{ width: '300px', height: '300px' }}
                />
              </a>
            )}
          </div>
        )}
      </div>


      <div style={{ height: '100px' }}></div>
    </div>
  );
};

export default Homepage;
