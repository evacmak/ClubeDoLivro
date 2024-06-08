import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "../components/AddTask";

const ProjectDetail = () => {
const [project, setProject] = useState(null);
    const {projectId} = useParams();
    console.log(projectId);

  const navigate = useNavigate();

    const getSingleProject = async (id) => {
      try {
        const response = await axios.get(`https://project-management-api-4641927fee65.herokuapp.com/projects/${id}?_embed=tasks`);
        setProject(response.data)
      } catch (error) {
        console.log('error fetching the project', error)
      }
    }

useEffect (() => {
  getSingleProject(projectId)
}, [projectId]);

const deleteProject = async (id) =>  {
  try {
    await axios.delete(`https://project-management-api-4641927fee65.herokuapp.com/projects/${id}`);
    navigate('/projects');
  } catch (error) {
    console.log('error deleting the project');
  }
}

    return (
      <div>
        <h1>Project Details</h1>
        {!project && <h3>No project found</h3>}

        {project && (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <Link to={`/projects/${project.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteProject(project.id)}>Delete</button>

          {project.tasks.map(task => {
            return (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            );
          })}

          <AddTask projectId={projectId} refreshPage={getSingleProject} />
        </div>
      )}

            <Link to='/projects'>Back to Projects</Link>

      </div>
    );
  };
  
  export default ProjectDetail;