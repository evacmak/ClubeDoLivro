import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EditReview = () => {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [emoji, setEmoji] = useState("");
    const [rating, setRating] = useState("");
    const [apiId, setApiId] = useState("");
    const navigate = useNavigate();
    const {reviewId} = useParams();

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleComment = (event) => {
        setComment(event.target.value)
    };
    const handleEmoji = (event) => {
        setEmoji(event.target.value)
    };
    const handleRating = (event) => {
        setRating(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const review = {
                name, comment, emoji, rating, apiId
            }
            //put edits something that is already there
            await axios.put(`https://book-club-server.onrender.com/reviews/${reviewId}`, review)

            //once the project is created redirect the user to the list of projects (webpage)
            navigate(`/cicatriz`);

        } catch (error) {
            console.log('error creating the project', error)
        }
    };

    const getSingleReview = async (id) => {
        try {
          const response = await axios.get(`https://book-club-server.onrender.com/reviews/${id}`);
          setName(response.data.name);
          setComment(response.data.comment);
          setEmoji(response.data.emoji);
          setRating(response.data.rating);
        setApiId(response.data.apiId)
        } catch (error) {
          console.log('error fetching the review', error)
        }
      }
  
  useEffect (() => {
    getSingleReview(reviewId)
  }, [reviewId]);


    return (
        <div>
            <h2>Edit Review</h2>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={name} onChange={handleName} />

                <label>Description</label>
                <textarea itemType="text" name="description" value={comment} onChange={handleComment}></textarea>

                <button type="submit">Edit Review</button>
            </form>
        </div>
    )
}

export default EditReview;