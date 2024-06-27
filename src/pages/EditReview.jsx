import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardBody, Text, Button, Input, Textarea } from '@chakra-ui/react';

const EditReview = () => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [emoji, setEmoji] = useState("");
    const [rating, setRating] = useState("");
    const [apiId, setApiId] = useState("");
    const navigate = useNavigate();
    const { reviewId } = useParams();

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

        try {
            const review = { name, comment, emoji, rating, apiId };
            // Put edits an existing review
            await axios.put(`https://book-club-server.onrender.com/reviews/${reviewId}`, review);
            // Redirect after submission
            navigate(`/cicatriz`);
        } catch (error) {
            console.log('Error updating the review', error);
        }
    };

    const getSingleReview = async (id) => {
        try {
            const response = await axios.get(`https://book-club-server.onrender.com/reviews/${id}`);
            setName(response.data.name);
            setComment(response.data.comment);
            setEmoji(response.data.emoji);
            setRating(response.data.rating);
            setApiId(response.data.apiId);
        } catch (error) {
            console.log('Error fetching the review', error);
        }
    };

    useEffect(() => {
        if (reviewId) getSingleReview(reviewId);
    }, [reviewId]);

    return (
        <div>
            <h2>Edit Review</h2>
            <form onSubmit={handleSubmit}>
                <CardBody>
                    <Text py='2' textAlign="justify">
                        <p><strong>Nome:</strong></p>
                        <Input type="text" value={name} onChange={handleName} />
                        <p><strong>Como me senti:</strong></p>
                        <Textarea value={comment} onChange={handleComment} />
                        <p><strong>Emoji:</strong></p>
                        <Input type="text" value={emoji} onChange={handleEmoji} />
                        <p><strong>Rating:</strong></p>
                        <Input type="number" value={rating} onChange={handleRating} />
                    </Text>
                </CardBody>
                <Button type="submit" variant='solid' bg='#3526DE' color='#FFFAF3' style={{ fontFamily: 'Lato, sans-serif', fontSize: '14px' }}>
                    Editar
                </Button>
            </form>
        </div>
    );
};

export default EditReview;
