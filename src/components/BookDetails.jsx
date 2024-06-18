const BookDetails = () => {

    const [book, setBook] = useState(null);

    const getBooks = async () => {
      try {
        const thirteenBook = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=maria%francisca%gama"
        );
        console.log(thirteenBook.data)
  
        setBook(thirteenBook.data);
      } catch (error) {
        console.log("Error fetching the books", error);
      }
    };
  
    useEffect(() => {
      getBooks();
    }, []);

return (
    <div>
        {book && (<img src={book.items[0].volumeInfo?.imageLinks?.thumbnail} alt="A Cicatriz" />)}
    </div>

);

}

export default BookDetails;