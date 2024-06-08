import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        try {
            const response = await axios.get('https://project-management-api-4641927fee65.herokuapp.com/projects');
            console.log(response.data)
            setProjects(response.data)
        } catch (error) {
            console.log('error fetching the projects', error)
        }
    }

    useEffect (() => {
        getProjects();
    }, []);
return (
    <div>
        <h1>Projects</h1>
        <Link to='/projects/new'>
        <button>Add a new project</button>
        </Link>
        {projects.map(project => {
            return (
                <div key={project.id}>
                <Link to={`/projects/${project.id}`}>
                    <h2>{project.title}</h2>
                </Link>
                    <p>{project.description}</p>
                </div>
            )
        })}
    </div>
)
}

export default Projects;