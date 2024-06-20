import { useState, useEffect } from "react";
import axios from "axios";
import { px } from "framer-motion";


const Cicatriz = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=maria%20francisca%20gama"
      );
      setBook(response.data);
    } catch (error) {
      setError("Error fetching the books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!book || !book.items || book.items.length === 0) {
    return <p className="no-books">No books found</p>;
  }

  const bookData = book.items[0].volumeInfo;

  return (
    <div className="container">
      <div className="book-content">
      <div className="book-image">
        <img
          src={bookData.imageLinks?.thumbnail}
          alt={bookData.title}
          width={'1000px'}
        />
          <a href={bookData.infoLink} className="button" target="_blank">
            Comprar o livro
          </a>
      </div>
        <div className="details">
          <h1 className="book-title">{bookData.title || 'No title available'}</h1>
          <h2 className="book-authors">{bookData.authors?.join(', ') || 'Não disponível'}</h2>
          <p className="book-meta">{bookData.categories?.join(', ') || 'Não disponível'}</p>
          <p className="book-meta">Publicado por: {bookData.publisher || 'Não disponível'}</p>
          <p className="book-meta">Publicado em: {bookData.publishedDate || 'Não disponível'}</p>
          <p className="book-description">{bookData.description || 'Não disponível'}</p>
        </div>
        
        
      </div>
    </div>
  );
};

export default Cicatriz;
