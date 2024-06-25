import { useState, useEffect } from "react";
import axios from "axios";
import cicatrizImage from '../images/cicatriz.webp';
import { Box, FormControl, FormLabel, FormHelperText, Input, Button, Center, Radio, RadioGroup, HStack, Stack, Avatar, CardBody, Text, Card, CardFooter} from '@chakra-ui/react';
import { Link, useNavigate, useParams } from "react-router-dom";

const Cicatriz = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [emoji, setEmoji] = useState('');
  const [rating, setRating] = useState('');
  const [month, setMonth] = useState('');
  const {title} = useParams()

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleEmoji = (value) => {
    setEmoji(value);
  };

  const handleRating = (value) => {
    setRating(value);
  };


  const getBooks = async () => {
    try {
      const updatedTitle = title.replace('-', '%')
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${updatedTitle}`
      );
      const bookData = response.data;
      console.log(bookData)

      if (bookData && bookData.items.length > 0) {
        setBook(bookData);

        await getReviews(bookData)
        getMonth(bookData.items[0].id)



      } else {
        setBook(null);
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching the books");
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async (bookData) => {
    try {
      
      const reviewsResponse = await axios.get("http://localhost:5005/reviews");
      const bookReviews = reviewsResponse.data.filter(
        reviewedBook => reviewedBook.apiId === bookData.items[0].id
      );
      setReviews(bookReviews);
    } catch (error) {
      console.log('error', error)
    }
  }

  const getMonth = async(id) => {

    try {
      const response = await axios.get("http://localhost:5005/books")

      const thisBook = response.data.find(book => book.apiId === id)
      setMonth(thisBook.month)
    } catch (error) {
      console.log('error getting the month',error)
    }

  }

  useEffect(() => {
    getBooks();
  }, []);

  const deleteReview = async (id) =>  {
    try {
      await axios.delete(`http://localhost:5005/reviews/${id}`);
      getReviews(book)
    } catch (error) {
      console.log('error deleting the project');
    }
  }

  const getBiggerImage = (url) => {
    return url.split('&zoom=1')[0].replace('http', 'https')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const review = {
        name,
        emoji,
        rating, 
        comment,
        apiId: book.items[0].id
      };

      await axios.post('http://localhost:5005/reviews', review);

      // Update the reviews state directly with the new review
      setReviews(prevReviews => [...prevReviews, review]);

      // Clear the form fields
      setName('');
      setComment('');
      setEmoji('');
      setRating('');

    } catch (error) {
      console.log('error creating the review', error);
    }
  };

  if (loading) {
    return <p className="loading">A carregar...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!book || !book.items || book.items.length === 0) {
    return <p className="no-books">No books found</p>;
  }

  const bookData = book.items[0].volumeInfo;

  return (
    <>
      <div className="container">
        <div className="book-content">
          <img
            className="book-image"
            src={getBiggerImage(bookData.imageLinks.thumbnail)}
            alt={bookData.title}
            style={{ width: '300px' }}
          />
          <div className="details">
            <h1 className="book-title">{bookData.title || 'No title available'}</h1>
            <h2 className="month-book">Mês: {month}</h2>
            <h2 className="book-authors">{bookData.authors?.join(', ') || 'Não disponível'}</h2>
            <p className="book-meta">{bookData.categories?.join(', ') || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado por:</strong> {bookData.publisher || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado em:</strong> {bookData.publishedDate || 'Não disponível'}</p>
            <p className="book-description">{bookData.description || 'Não disponível'}</p>
            <Button className="comprar-livro" href={bookData.infoLink} target="_blank" rel="noopener noreferrer" bg='#3526DE' color='#FFFAF3'
            sx={{ fontFamily: "Lato, sans-serif", fontSize: '20px'}} height={'50px'}>
              Comprar o livro
            </Button>
          </div>
        </div>
      </div>
      <Box bg='#FFFAF3 ' w='100%' p={4} color='white'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={{ fontFamily: 'Lato, sans-serif', fontSize: '25px', fontWeight: 'bold', color: '#333333'}} marginLeft={'200px'}>Adiciona a tua review deste livro</FormLabel>
            <Input
              variant='filled'
              color='black'
              bg='white'
              type='text'
              name='name'
              placeholder='Nome'
              width='800px'
              height='50px'
              marginBottom={'20px'}
              value={name}
              onChange={handleName}
            />

            <Center>
              <Box name='emojis' bg='white' w='67%' p={4} color='black' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4}>
                <FormControl as='fieldset'>
                  <FormLabel as='legend'>Como te sentiste ao ler o livro?</FormLabel>
                  <RadioGroup value={emoji} onChange={handleEmoji}>
                    <HStack spacing='24px'>
                      <Radio value='😭'><p style={{fontSize: '20px'}}>😭</p></Radio>
                      <Radio value='😱'><p style={{fontSize: '20px'}}>😱</p></Radio>
                      <Radio value='🤡'><p style={{fontSize: '20px'}}>🤡</p></Radio>
                      <Radio value='🥰'><p style={{fontSize: '20px'}}>🥰</p></Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Box>
            </Center>
            <Center>
              <Box name='rating' bg='white' w='67%' p={4} color='black' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4}>
                <FormControl as='fieldset'>
                  <FormLabel as='legend'>Quantas estrelas dás ao livro?</FormLabel>
                  <RadioGroup value={rating} onChange={handleRating}>
                    <HStack spacing='24px'>
                      <Radio value='⭐️'><p style={{fontSize: '20px'}}>⭐️</p></Radio>
                      <Radio value='⭐️⭐️'><p style={{fontSize: '20px'}}>⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️'><p style={{fontSize: '20px'}}>⭐️⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️⭐️'><p style={{fontSize: '20px'}}>⭐️⭐️⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️⭐️⭐️'><p style={{fontSize: '20px'}}>⭐️⭐️⭐️⭐️⭐️</p></Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Box>
            </Center>

            <Input
              variant='filled'
              color='black'
              bg= 'white'
              type='text'
              name='comment'
              placeholder='Se escreveres spoilers, adiciona *SPOILER ALERT* no início da review'
              width='800px'
              height='200px'
              fontFamily= "Lato, sans-serif"
              value={comment}
              onChange={handleComment}
            />
            <FormHelperText></FormHelperText>
            <Button type="submit" bg='#3526DE' color='#FFFAF3' mt={4} className="botao-review" style={{fontfamily: 'Lato, sans-serif', fontSize: '14px'}}>Adicionar Review</Button>
          </FormControl>
        </form>
      </Box>
      {reviews.length > 0 && (
        <Center>
    <Box bg='#FFFAF3' w='67%' p={4} color='black'>
      <h2 style={{ color: 'black', fontFamily: 'Lato, sans-serif', fontSize: '30px', marginTop: '20px' }}>Reviews:</h2>
      {reviews.map((review, index) => (

        <Card key={index}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  marginBottom={'10px'}
>

  <Avatar bg='#DF7F7F' color='#333333' name={review.name} size='md' mr={4} marginLeft='30px' marginTop='20px'/>
  <Stack>
    <CardBody>

      <Text py='2' textAlign={"justify"}>
      <p><strong>Nome: </strong>{review.name}</p>
              <p><strong>Como me senti: </strong>{review.emoji}</p>
              <p><strong>Rating: </strong>{review.rating}</p>
              <p><strong>Review: </strong>{review.comment}</p>
      </Text>
    </CardBody>
<CardFooter>
      <Button variant='solid' bg='#3526DE' color='#FFFAF3' style={{fontFamily: 'Lato, sans-serif', fontSize: '14px'}} >
      <Link to={`/review/${review.id}/edit`}>
        Editar
      </Link>
      </Button>
      <Button variant='solid' bg='#333333' color='#FFFAF3' marginLeft='10px' style={{fontFamily: 'Lato, sans-serif', fontSize: '14px'}} onClick={() => deleteReview(review.id)}>
        Apagar
      </Button>
    </CardFooter> 
  </Stack>
</Card>



    
      ))}
    </Box>
        </Center>
      )}
    </>
  );
};

export default Cicatriz;
