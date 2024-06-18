import { useState, useEffect } from "react";
import axios from "axios";

const Cicatriz = () => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=maria%20francisca%20gama"
      );
      console.log(response.data);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching the books", error);
      setError("Error fetching the books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!book || !book.items || book.items.length === 0) {
    return <p>No books found</p>;
  }

  const bookData = book.items[0].volumeInfo;

  return (
    <div>
      <img
        src={bookData.imageLinks?.thumbnail || 'https://via.placeholder.com/200'}
        alt={bookData.title || 'No title available'}
        style={{ width: '200px', height: 'auto' }}
      />
      <h1>{bookData.title || 'No title available'}</h1>
      <h2>{bookData.authors?.join(', ') || 'No authors available'}</h2>
    </div>
  );
};

export default Cicatriz;
