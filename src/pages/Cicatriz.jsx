import { useState, useEffect } from "react";
import axios from "axios";
import cicatrizImage from '../images/cicatriz.webp';
import { Box, FormControl, FormLabel, FormHelperText, Input, Button, Center, Radio, RadioGroup, HStack, Stack, Avatar, CardBody, Text, Card, CardFooter} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Cicatriz = () => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [emoji, setEmoji] = useState('');
  const [rating, setRating] = useState('');

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

  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=maria%20francisca%20gama"
      );
      const bookData = response.data;

      if (bookData && bookData.items.length > 0) {
        setBook(bookData);

        const reviewsResponse = await axios.get("http://localhost:5005/reviews");
        const bookReviews = reviewsResponse.data.filter(
          reviewedBook => reviewedBook.apiId === bookData.items[0].id
        );
        setReviews(bookReviews);
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

  useEffect(() => {
    getBooks();
  }, []);

  const deleteProject = async (id) =>  {
    try {
      await axios.delete(`http://localhost:5005/reviews/${id}`);
      navigate('/cicatriz');
    } catch (error) {
      console.log('error deleting the project');
    }
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
            src={cicatrizImage}
            alt={bookData.title}
            style={{ width: '300px' }}
          />
          <div className="details">
            <h1 className="book-title">{bookData.title || 'No title available'}</h1>
            <h2 className="month-book">Mês: Julho</h2>
            <h2 className="book-authors">{bookData.authors?.join(', ') || 'Não disponível'}</h2>
            <p className="book-meta">{bookData.categories?.join(', ') || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado por:</strong> {bookData.publisher || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado em:</strong> {bookData.publishedDate || 'Não disponível'}</p>
            <p className="book-description">{bookData.description || 'Não disponível'}</p>
            <Button className="comprar-livro" href={bookData.infoLink} target="_blank" rel="noopener noreferrer" colorScheme="gray"
            sx={{ fontFamily: "Lato, sans-serif", fontSize: '20px'}} height={'50px'}>
              Comprar o livro
            </Button>
          </div>
        </div>
      </div>
      <Box bg='#E53E3E' w='100%' p={4} color='white'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={{ fontFamily: 'Lato, sans-serif', fontSize: '25px', fontWeight: 'bold'}} marginLeft={'200px'}>Adiciona a tua review deste livro</FormLabel>
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
            <Button type="submit" colorScheme="gray" mt={4} className="botao-review" style={{fontfamily: 'Lato, sans-serif'}}>Adicionar Review</Button>
          </FormControl>
        </form>
      </Box>
      {reviews.length > 0 && (
        <Center>
    <Box bg='white' w='67%' p={4} color='black'>
      <h2 style={{ color: 'black', fontFamily: 'Lato, sans-serif', fontSize: '30px' }}>Reviews:</h2>
      {reviews.map((review, index) => (

        <Card key={index}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>

  <Avatar bg='red.500' color='white' name={review.name} size='md' mr={4} marginLeft='30px' marginTop='20px'/>
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
      <Button variant='solid' colorScheme='blue' >
        Editar
      </Button>
      <Button variant='solid' colorScheme='blue' marginLeft='10px' onClick={() => deleteProject(review.id)}>
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
