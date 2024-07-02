import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import {Button, Center, Box, Radio, RadioGroup, FormControl, FormLabel, HStack, FormHelperText, Input, VStack } from '@chakra-ui/react';

const EditReview = () => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [emoji, setEmoji] = useState("");
    const [rating, setRating] = useState("");
    const [apiId, setApiId] = useState("");
    const [searchParams, setSearchParams] = useSearchParams("");
    const navigate = useNavigate();
    const { reviewId } = useParams();

    // Debugging: Log the reviewId
    useEffect(() => {
        console.log('reviewId:', reviewId);
    }, [reviewId]);

    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleComment = (event) => {
        setComment(event.target.value);
    };
    const handleEmoji = (event) => {
        setEmoji(event.target.value);
    };
    const handleRating = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Debugging: Log the form data before submitting
        console.log('Form data before submitting:', { name, comment, emoji, rating, apiId });

        try {
            const review = { name, comment, emoji, rating, apiId };
            await axios.put(`https://book-club-server-ten.vercel.app/reviews/${reviewId}`, review);
            const title = searchParams.get("title")
            navigate(`/livro/${title}`);
        } catch (error) {
            console.log('Error updating the review:', error);
        }
    };

    const getSingleReview = async (id) => {
        try {
            const response = await axios.get(`https://book-club-server-ten.vercel.app/reviews/${id}`);
            // Debugging: Log the API response
            console.log('API response:', response.data);

            setName(response.data.name || '');
            setComment(response.data.comment || '');
            setEmoji(response.data.emoji || '');
            setRating(response.data.rating || '');
            setApiId(response.data.apiId || '');
        } catch (error) {
            console.log('Error fetching the review:', error);
        }
    };

    useEffect(() => {
        if (reviewId) getSingleReview(reviewId);
    }, [reviewId]);

    return (
        <Center>
            <Box w="60%" p={4}>
                <VStack spacing={4}>
                    <h2>Edit Review</h2>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Input
                            variant='filled'
                            color='black'
                            bg='white'
                            type='text'
                            name='name'
                            placeholder='Nome'
                            width='100%'
                            height='50px'
                            marginBottom={'20px'}
                            value={name}
                            onChange={handleName}
                        />
                        <Box name='emojis' bg='white' w='100%' p={4} color='black' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4}>
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
                        <Box name='rating' bg='white' w='100%' p={4} color='black' borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4}>
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
                        <Input
                            variant='filled'
                            color='black'
                            bg='white'
                            type='text'
                            name='comment'
                            placeholder='Se escreveres spoilers, adiciona *SPOILER ALERT* no início da review'
                            width='100%'
                            height='200px'
                            fontFamily= "Lato, sans-serif"
                            value={comment}
                            onChange={handleComment}
                        />
                        <Button type="submit" variant='solid' bg='#3526DE' color='#FFFAF3' style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px', marginTop: '20px' }}>
                            Editar
                        </Button>
                    </form>
                </VStack>
            </Box>
        </Center>
    );
};

export default EditReview;
