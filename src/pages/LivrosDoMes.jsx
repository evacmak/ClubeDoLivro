import ImageCard from '../components/ImageCard';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import serpent from '../images/serpent.jpg';


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
          "https://www.googleapis.com/books/v1/volumes?q=%20wildfire%hannah%grace"
        );
        const tenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20it%stephen%king"
        );
  
        const elevenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20one%20dark%20window"
        );
        const twelveBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=%20Normal%20People"
        );
        const thirteenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=maria%francisca%gama"
        );
        const fourteenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=angie%kim"
        );

        console.log('book', sixthBook)
  
        setBooks([firstBook.data, secondBook.data, thirdBook.data, fourthBook.data, 
          fifthBook.data, sixthBook.data, seventhBook.data, eighthBook.data, ninthBook.data, 
          tenBook.data, elevenBook.data, twelveBook.data, thirteenBook.data, fourteenBook.data]);
      } catch (error) {
        console.log("Error fetching the books", error);
      }
    };
  
    useEffect(() => {
      getBooks();
    }, []);

    const formatTitle = (title) => {
      return title.toLowerCase().replace(' ', '-')
    }
  
    return (
      <div>

        <h1 style={{ textAlign: 'center', marginTop: '2rem', fontSize: '55px', fontFamily: 'Bebas, sans-serif'}}>Livros 2024</h1>
  
        {books.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', margin: '3rem', marginTop: '90px'}}>
          <Link to={`/livro/${formatTitle(books[12].items[0].volumeInfo?.title)+'-'+formatTitle(books[12].items[0].volumeInfo?.authors?.join(', '))}`}>
          {books[12]?.items[0] && (
              <ImageCard
                src={books[12].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[12].items[0].volumeInfo?.title || 'No title available'}
                meta={books[12].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Julho'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[13].items[0].volumeInfo?.title)+'-'+formatTitle(books[13].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[13]?.items[0] && (
              <ImageCard
                src={books[13].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[13].items[0].volumeInfo?.title || 'No title available'}
                meta={books[13].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Julho'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[0].items[0].volumeInfo?.title)+'-'+formatTitle(books[0].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[0]?.items[0] && (
              <ImageCard
                src={books[0].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[0].items[0].volumeInfo?.title || 'No title available'}
                meta={books[0].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Junho'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[1].items[0].volumeInfo?.title)+'-'+formatTitle(books[1].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[1]?.items[0] && (
              <ImageCard
                src={books[1].items[1].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[1].items[0].volumeInfo?.title || 'No title available'}
                meta={books[1].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Junho'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[2].items[0].volumeInfo?.title)+'-'+formatTitle(books[2].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[2]?.items[0] && (
              <ImageCard
                src={books[2].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[2].items[0].volumeInfo?.title || 'No title available'}
                meta={books[2].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Maio'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[3].items[0].volumeInfo?.title)+'-'+formatTitle(books[3].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[3]?.items[0] && (
              <ImageCard
                src={books[3].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[3].items[0].volumeInfo?.title || 'No title available'}
                meta={books[3].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Maio'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[4].items[0].volumeInfo?.title)+'-'+formatTitle(books[4].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[4]?.items[0] && (
              <ImageCard
                src={books[4].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[4].items[0].volumeInfo?.title || 'No title available'}
                meta={books[4].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Abril'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[5].items[0].volumeInfo?.title)+'-'+formatTitle(books[5].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[5]?.items[0] && (
              <ImageCard
                src={ serpent || ''}
                header={books[5].items[0].volumeInfo?.title || 'No title available'}
                meta={books[5].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Abril'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[6].items[0].volumeInfo?.title)+'-'+formatTitle(books[6].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[6]?.items[0] && (
              <ImageCard
                src={books[6].items[1].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[6].items[1].volumeInfo?.title || 'No title available'}
                meta={books[6].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Março'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[7].items[0].volumeInfo?.title)}-${books[7].items[0].volumeInfo?.authors?.join(', ')}`}>
            {books[7]?.items[0] && (
              <ImageCard
                src={books[7].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[7].items[0].volumeInfo?.title || 'No title available'}
                meta={books[7].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Março'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[8].items[0].volumeInfo?.title)+'-'+formatTitle(books[8].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[8]?.items[0] && (
              <ImageCard
                src={books[8].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[8].items[0].volumeInfo?.title || 'No title available'}
                meta={books[8].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Fevereiro'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[9].items[0].volumeInfo?.title)+'-'+formatTitle(books[9].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[9]?.items[0] && (
              <ImageCard
                src={books[9].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[9].items[0].volumeInfo?.title || 'No title available'}
                meta={books[9].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Fevereiro'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[10].items[0].volumeInfo?.title)+'-'+formatTitle(books[10].items[0].volumeInfo?.authors?.join(', '))}`}>
            {books[10]?.items[0] && (
              <ImageCard
                src={books[10].items[0].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[10].items[0].volumeInfo?.title || 'No title available'}
                meta={books[10].items[0].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Janeiro'
              />
            )}
            </Link>
            <Link to={`/livro/${formatTitle(books[11].items[2].volumeInfo?.title)+'-'+formatTitle(books[11].items[2].volumeInfo?.authors?.join(', '))}`}>
            {books[11]?.items[2] && (
              <ImageCard
                src={books[11].items[2].volumeInfo?.imageLinks?.thumbnail || ''}
                header={books[11].items[2].volumeInfo?.title || 'No title available'}
                meta={books[11].items[2].volumeInfo?.authors?.join(', ') || 'No authors available'}
                extra='Janeiro'
              />
            )}
            </Link>

            
          </div>
        )}
          </div>
        )}
  
export default Livros;