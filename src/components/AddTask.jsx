import { useState } from "react";
import axios from "axios";

const AddTask = ({projectId, refreshPage}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const task = {
                title,
                description,
                projectId: Number(projectId)
            }
            await axios.post('https://project-management-api-4641927fee65.herokuapp.com/tasks', task)

            // clearing the form inputs
            setTitle('');
            setDescription('');

            //refreshing the page
            refreshPage(projectId);

        } catch (error) {
            console.log('error creating the task', error)
        }
    }

    return (
        <div>
            <h2>Add Task</h2>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={handleTitle} />

                <label>Description</label>
                <textarea itemType="text" name="description" value={description} onChange={handleDescription}></textarea>

                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default AddTask;