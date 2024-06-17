import ImageCard from '../components/ImageCard';
import axios from "axios";
import { useState, useEffect } from "react";


const Livros = () => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
      try {
        const firstBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=assistant%20to%20the%20villain"
        );
        const secondBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=love%20redesigned"
        );
        const thirdBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=the%20seven%20year%20slip"
        );
        const fourthBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=the%20caraval"
        );
        const fifthBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=the%20throne%20of%20glass"
        );
        const sixthBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=the%20the%20serpent%20and%20the%20wings%20of%20night"
        );
        const seventhBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20ensaio%20sobre%20a%20cegueira"
        );
        const eighthBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20powerless"
        );
        const ninthBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20wildfire"
        );
        const tenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20it"
        );
  
        setBooks([firstBook.data, secondBook.data, thirdBook.data, fourthBook.data, fifthBook.data, sixthBook.data, seventhBook.data, eighthBook.data, ninthBook.data, tenBook.data]);
      } catch (error) {
        console.log("Error fetching the books", error);
      }
    };
  
    useEffect(() => {
      getBooks();
    }, []);
  
    return (
      <div>

        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Livros 2024</h1>
  
        {books.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', margin: '3rem'}}>
            {books[0]?.items[0] && (
              <ImageCard
                src={books[0].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[0].items[0].volumeInfo?.title || 'No title available'}
                meta={books[0].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[0].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romantasy 🔪❤️'
              />
            )}
            {books[1]?.items[0] && (
              <ImageCard
                src={books[1].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[1].items[0].volumeInfo?.title || 'No title available'}
                meta={books[1].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[1].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[2]?.items[0] && (
              <ImageCard
                src={books[2].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[2].items[0].volumeInfo?.title || 'No title available'}
                meta={books[2].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[2].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[3]?.items[0] && (
              <ImageCard
                src={books[3].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[3].items[0].volumeInfo?.title || 'No title available'}
                meta={books[3].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[3].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[4]?.items[0] && (
              <ImageCard
                src={books[4].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[4].items[0].volumeInfo?.title || 'No title available'}
                meta={books[4].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[4].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}

            {books[5]?.items[0] && (
              <ImageCard
                src={books[5].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[5].items[0].volumeInfo?.title || 'No title available'}
                meta={books[5].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[5].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[6]?.items[0] && (
              <ImageCard
                src={books[6].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[6].items[0].volumeInfo?.title || 'No title available'}
                meta={books[6].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[6].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[7]?.items[0] && (
              <ImageCard
                src={books[7].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[7].items[0].volumeInfo?.title || 'No title available'}
                meta={books[7].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[7].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[8]?.items[0] && (
              <ImageCard
                src={books[8].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[8].items[0].volumeInfo?.title || 'No title available'}
                meta={books[8].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[8].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            {books[9]?.items[0] && (
              <ImageCard
                src={books[9].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[9].items[0].volumeInfo?.title || 'No title available'}
                meta={books[9].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                description={books[9].items[0].volumeInfo?.subtitle || 'No subtitle available'}
                extra='Romance 👩‍❤️‍👨'
              />
            )}
            
          </div>
        )}
          </div>
        )}
  
export default Livros;