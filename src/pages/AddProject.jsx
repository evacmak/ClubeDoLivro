import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleDescription = (event) => {
        setDescription(event.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const project = {
                title, description
            }
            await axios.post('https://project-management-api-4641927fee65.herokuapp.com/projects', project)

            //once the project is created redirect the user to the list of projects (webpage)
            navigate("/projects")

        } catch (error) {
            console.log('error creating the project', error)
        }
    }

    return (
        <div>
            <h2>Add Project</h2>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={handleTitle} />

                <label>Description</label>
                <textarea itemType="text" name="description" value={description} onChange={handleDescription}></textarea>

                <button type="submit">Add Project</button>
            </form>
        </div>
    )
}

export default AddProject;