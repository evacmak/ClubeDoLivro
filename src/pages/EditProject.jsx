import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EditProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const {projectId} = useParams();

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
            //put edits something that is already there
            await axios.put(`https://project-management-api-4641927fee65.herokuapp.com/projects/${projectId}`, project)

            //once the project is created redirect the user to the list of projects (webpage)
            navigate(`/projects/${projectId}`);

        } catch (error) {
            console.log('error creating the project', error)
        }
    };

    const getSingleProject = async (id) => {
        try {
          const response = await axios.get(`https://project-management-api-4641927fee65.herokuapp.com/projects/${id}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
        } catch (error) {
          console.log('error fetching the project', error)
        }
      }
  
  useEffect (() => {
    getSingleProject(projectId)
  }, [projectId]);


    return (
        <div>
            <h2>Edit Project</h2>

            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={handleTitle} />

                <label>Description</label>
                <textarea itemType="text" name="description" value={description} onChange={handleDescription}></textarea>

                <button type="submit">Edit Project</button>
            </form>
        </div>
    )
}

export default EditProject;