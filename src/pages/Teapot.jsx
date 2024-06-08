import { Link } from "react-router-dom"

const imgURL = 'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-routing/404.gif'

const Teapot = () => {
    return (
        <div>
            <h1>I'm a teapot</h1>
            <Link to='/'>
                <p>Back to Homepage</p>
            </Link>
            <img src={imgURL} alt="404" className="page-img" />
        </div>
    )
}

export default Teapot
