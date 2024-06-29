import { useState, useEffect } from "react";
import axios from "axios";
import { Box, FormControl, FormLabel, FormHelperText, Input, Button, Center, Radio, RadioGroup, HStack, Stack, Avatar, CardBody, Text, Card, CardFooter} from '@chakra-ui/react';
import { Link, useParams } from "react-router-dom";
import itImage from '../images/it-book.jpg';
import serpentImage from '../images/serpent.jpg';
import wildfireImage from '../images/wildfire.jpeg';
import normalPeopleImage from '../images/normal people.jpg';
import ensaioImage from '../images/ensaio.webp';

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
  const { title } = useParams();

  const handleName = (event) => setName(event.target.value);
  const handleComment = (event) => setComment(event.target.value);
  const handleEmoji = (value) => setEmoji(value);
  const handleRating = (value) => setRating(value);

  const getBooks = async () => {
    try {
      const updatedTitle = title.replaceAll(' ', '%20');
      const updatedTitle2 = updatedTitle.replaceAll('-', '%20');
      const updatedTitle3 = updatedTitle2.replace('(edição%20especial)', '');
      
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${updatedTitle3}`);
      console.log('agora',response)
      const bookData = response.data;

      if (bookData && bookData.items.length > 0) {
        setBook(bookData);
        await getReviews(bookData);
        getMonth(bookData.items[0].id);
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
      const reviewsResponse = await axios.get("https://book-club-server-ten.vercel.app/reviews");
      const bookReviews = reviewsResponse.data.filter(reviewedBook => reviewedBook.apiId === bookData.items[0].id);
      setReviews(bookReviews);
    } catch (error) {
      console.log('error', error);
    }
  }

  const getMonth = async (id) => {
    try {
      const response = await axios.get("https://book-club-server-ten.vercel.app/books");
      const thisBook = response.data.find(book => book.apiId === id);
      setMonth(thisBook.month);
    } catch (error) {
      console.log('error getting the month', error);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  const deleteReview = async (id) => {
    try {
      await axios.delete(`https://book-club-server-ten.vercel.app/reviews/${id}`);
      getReviews(book);
    } catch (error) {
      console.log('error deleting the project');
    }
  }

  const getBiggerImage = (url) => {
    return url.split('&zoom=1')[0].replace('http', 'https');
  };

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

      await axios.post('https://book-club-server-ten.vercel.app/reviews', review);
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
    return <h1 style={{marginTop: '50px', fontFamily: 'Lato, sans-serif'}}>A carregar...</h1>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!book || !book.items || book.items.length === 0) {
    return <p className="no-books">No books found</p>;
  }

  let bookData = book.items[0].volumeInfo;
  let buyBook = book.items[0].saleInfo.buyLink;
  if(bookData.title.toLowerCase() === "the serpent and the wings of night" && bookData.authors?.includes("Carissa Broadbent")) {
    bookData = book.items[1].volumeInfo
    buyBook = "https://www.wook.pt/livro/the-serpent-and-the-wings-of-night-carissa-broadbent/29218613?gad_source=1&gclid=CjwKCAjw4f6zBhBVEiwATEHFVomBzhAhLdDG5o2qNpXTrqHS7fu2dlHS9nl9tu-mwXpzcP126fbdthoC-q8QAvD_BwE";
    } else if(bookData.title.toLowerCase() === "normal people" && bookData.authors?.includes("Sally Rooney")) {
      bookData = book.items[2].volumeInfo
      buyBook = book.items[2].saleInfo.buyLink;
      }
      else if(bookData.title.toLowerCase() === "powerful" && bookData.authors?.includes("Lauren Roberts")) {
        buyBook = book.items[1].saleInfo.buyLink;
        console.log(buyBook)
      bookData = book.items[1].volumeInfo
    }
      else if(bookData.title.toLowerCase() === "caixa trilogia caraval" && bookData.authors?.includes("Stephanie Garber")) {
        buyBook = book.items[1].saleInfo.buyLink;
      bookData = book.items[1].volumeInfo
    }
      else if(bookData.title.toLowerCase() === "ensaio sobre a cegueira" && bookData.authors?.includes("José Saramago")) {
        buyBook = "https://www.wook.pt/livro/ensaio-sobre-a-cegueira-jose-saramago/15825486?gad_source=1&gclid=CjwKCAjw4f6zBhBVEiwATEHFVos4XzeGHhJ5kIKRwXA6xELqt8BaFNPYMU_Ym-oKDe8tWD35PMd3_BoCIDQQAvD_BwE"
    }
      else if(bookData.title.toLowerCase() === "it") {
        buyBook = "https://play.google.com/store/books/details/Stephen_King_It?id=-rUACwAAQBAJ"
    }
      else if(bookData.title.toLowerCase() === "wildfire") {
        buyBook = "https://play.google.com/store/books/details/Hannah_Grace_Wildfire?id=8NOsEAAAQBAJ"
    }
      else if(bookData.title.toLowerCase() === "assistant to the villain") {
        buyBook = "https://play.google.com/store/books/details/Hannah_Nicole_Maehrer_Assistant_to_the_Villain?id=-5W7EAAAQBAJ"
    }

  // Determine the image to use
/*   const bookImage = (bookData.title.toLowerCase() === "it" && bookData.authors?.includes("Stephen King"))
    ? itImage
    : getBiggerImage(bookData.imageLinks.thumbnail); */

    let bookImage;

      if (bookData.title.toLowerCase() === "it" && bookData.authors?.includes("Stephen King")) {
          bookImage = itImage;
      } else if (bookData.title.toLowerCase() === "wildfire" && bookData.authors?.includes("Hannah Grace")) {
          bookImage = wildfireImage;
      } else if (bookData.title.toLowerCase() === "the serpent & the wings of night" && bookData.authors?.includes("Carissa Broadbent")) {
          bookImage = serpentImage;
      } else if (bookData.title.toLowerCase() === "normal people" && bookData.authors?.includes("Sally Rooney")) {
          bookImage = normalPeopleImage 
      } else if (bookData.title.toLowerCase() === "ensaio sobre a cegueira" && bookData.authors?.includes("José Saramago")) {
          bookImage = ensaioImage;
      } else {
          bookImage = getBiggerImage(bookData.imageLinks.thumbnail);
      }


  return (
    <>
      <div className="container">
        <div className="book-content"
        style={{alignItems: 'flex-start'}}
          >
        <img
          className="book-image"
          src={bookImage}
          alt={bookData.title}
          style={{ width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '0'}}
        />
          <div className="details">
            <h1 className="book-title">{bookData.title || 'No title available'}</h1>
            <h2 className="month-book">Mês: {month}</h2>
            <h2 className="book-authors">{bookData.authors?.join(', ') || 'Não disponível'}</h2>
            <p className="book-meta">{bookData.categories?.join(', ') || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado por:</strong> {bookData.publisher || 'Não disponível'}</p>
            <p className="book-meta"><strong>Publicado em:</strong> {bookData.publishedDate || 'Não disponível'}</p>
            <p className="book-description">{bookData.description || 'Não disponível'}</p>
            <Button className="comprar-livro" bg='#3526DE' color='#FFFAF3'
              sx={{ fontFamily: "Lato, sans-serif", fontSize: '20px' }} height={'50px'}>
              <Link to={buyBook} target="_blank" rel="noopener noreferrer">
              Comprar o livro
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Box bg='#FFFAF3 ' w='100%' p={4} color='white'>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={{ fontFamily: 'Lato, sans-serif', fontSize: '25px', fontWeight: 'bold', color: '#333333' }} marginLeft={'200px'}>Adiciona a tua review deste livro</FormLabel>
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
                      <Radio value='😭'><p style={{ fontSize: '20px' }}>😭</p></Radio>
                      <Radio value='😱'><p style={{ fontSize: '20px' }}>😱</p></Radio>
                      <Radio value='🤡'><p style={{ fontSize: '20px' }}>🤡</p></Radio>
                      <Radio value='🥰'><p style={{ fontSize: '20px' }}>🥰</p></Radio>
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
                      <Radio value='⭐️'><p style={{ fontSize: '20px' }}>⭐️</p></Radio>
                      <Radio value='⭐️⭐️'><p style={{ fontSize: '20px' }}>⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️'><p style={{ fontSize: '20px' }}>⭐️⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️⭐️'><p style={{ fontSize: '20px' }}>⭐️⭐️⭐️⭐️</p></Radio>
                      <Radio value='⭐️⭐️⭐️⭐️⭐️'><p style={{ fontSize: '20px' }}>⭐️⭐️⭐️⭐️⭐️</p></Radio>
                    </HStack>
                  </RadioGroup>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Box>
            </Center>

            <Input
              variant='filled'
              color='black'
              bg='white'
              type='text'
              name='comment'
              placeholder='Se escreveres spoilers, adiciona *SPOILER ALERT* no início da review'
              width='800px'
              height='200px'
              fontFamily="Lato, sans-serif"
              value={comment}
              onChange={handleComment}
            />
            <FormHelperText></FormHelperText>
            <Button type="submit" bg='#3526DE' color='#FFFAF3' mt={4} className="botao-review" style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}>Adicionar Review</Button>
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
                <Avatar bg='#DF7F7F' color='#FFFFFF' name={review.name} size='md' mr={4} marginLeft='30px' marginTop='20px' />
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
                    <Button variant='solid' bg='#3526DE' color='#FFFAF3' style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }} >
                      <Link to={`/review/${review.id}/edit?title=${title}`}>
                        Editar
                      </Link>
                    </Button>
                    <Button variant='solid' bg='#333333' color='#FFFAF3' marginLeft='10px' style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }} onClick={() => deleteReview(review.id)}>
                    <Link to={`/review/${review.id}/edit?title=${title}`}>
                      Apagar
                      </Link>
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
