import ImageCard from "../components/ImageCard";
import Hero from "../components/Hero";
import ThreeColumns from "../components/ThreeColumns";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="https://chat.whatsapp.com/H8MdpjbRn795Y2M6pMBhBA" target="_blank" style={{ backgroundColor: '#3526DE', padding: '8px 20px', color: 'white', fontWeight: '1000', fontSize: '20px' }}>
          Aderir
        </NavLink>
      </div>
    </div>
    <Center>
    <Box bg='tomato' w='80%' p={4} color='white'  style={{marginTop: '80px'}} borderRadius='lg' overflow='hidden'>
  
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
