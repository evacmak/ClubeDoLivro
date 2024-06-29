import ImageCard from "../components/ImageCard";
import Hero from "../components/Hero";
import ThreeColumns from "../components/ThreeColumns";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, CardBody, Center, Image, Card, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
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
    <h1 style={{ textAlign: 'center', marginTop: '2rem', fontSize: '80px', fontFamily: 'Bebas, sans-serif', color: '#333333' }}>Clube do Livro</h1>
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
          position='relative' // Set position to relative for absolute positioning inside
          boxShadow='lg' // Add boxShadow here to apply a large shadow
          textAlign='center' // Center align the text
        >
          <Image src={cookiesFoto} maxH='400px' />

          <Text
            position='absolute'
            top='50%' // Center vertically
            left='50%' // Center horizontally
            transform='translate(-50%, -50%)' // Move text back by 50% of its width and height to center it
            fontSize='xl' // Adjust font size as needed
            fontWeight='bold' // Adjust font weight as needed
            color='white' // Adjust text color as needed
            zIndex='1' // Ensure text appears above the image
            p={0} // Padding around the text
            borderRadius='md' // Rounded corners for the background
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
          position='relative' // Set position to relative for absolute positioning inside
          boxShadow='lg' // Add boxShadow here to apply a large shadow
          textAlign='center' // Center align the text
          textShadow='2px 2px 8px rgba(0, 0, 0, 0.8)'
        >
          <Image src={martaFoto} maxH='400px' />

          <Text
            position='absolute'
            top='50%' // Center vertically
            left='50%' // Center horizontally
            transform='translate(-50%, -50%)' // Move text back by 50% of its width and height to center it
            fontSize='xl' // Adjust font size as needed
            fontWeight='bold' // Adjust font weight as needed
            color='white' // Adjust text color as needed
            zIndex='1' // Ensure text appears above the image
            p={0} // Padding around the text
            borderRadius='md' // Rounded corners for the background
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
          position='relative' // Set position to relative for absolute positioning inside
          boxShadow='lg' // Add boxShadow here to apply a large shadow
          textAlign='center' // Center align the text
        >
          <Image src={evaFoto} maxH='400px' />

          <Text
            position='absolute'
            top='50%' // Center vertically
            left='50%' // Center horizontally
            transform='translate(-50%, -50%)' // Move text back by 50% of its width and height to center it
            fontSize='xl' // Adjust font size as needed
            fontWeight='bold' // Adjust font weight as needed
            color='white' // Adjust text color as needed
            zIndex='1' // Ensure text appears above the image
            p={0} // Padding around the text
            borderRadius='md' // Rounded corners for the background
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
          position='relative' // Set position to relative for absolute positioning inside
          boxShadow='lg' // Add boxShadow here to apply a large shadow
          textAlign='center' // Center align the text
        >
          <Image src={livroHarry} maxH='400px' />

          <Text
            position='absolute'
            top='50%' // Center vertically
            left='50%' // Center horizontally
            transform='translate(-50%, -50%)' // Move text back by 50% of its width and height to center it
            fontSize='xl' // Adjust font size as needed
            fontWeight='bold' // Adjust font weight as needed
            color='white' // Adjust text color as needed
            zIndex='1' // Ensure text appears above the image
            p={0} // Padding around the text
            borderRadius='md' // Rounded corners for the background
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

      {books.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '3rem', marginBottom: '3rem'}}>
          {books[0]?.items[0] && (
            <ImageCard
              src={books[0].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
              header={books[0].items[0].volumeInfo?.title || 'No title available'}
              meta={books[0].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
              extra='Romantasy 🔪❤️'
            />
          )}
          {books[1]?.items[0] && (
            <ImageCard
              src={books[1].items[1].volumeInfo?.imageLinks?.thumbnail || ''}
              header={books[1].items[0].volumeInfo?.title || 'No title available'}
              meta={books[1].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
              extra='Romance 👩‍❤️‍👨'
            />
          )}
        </div>
      )}

    </div>
  );
  };

export default Homepage;
