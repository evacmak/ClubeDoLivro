import { Link } from "react-router-dom";
import errorImage from "../images/error.jpg";

const Teapot = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh'
        }}>
            <h1 style={{ textAlign: 'center', marginTop: '2rem', fontSize: '30px', fontFamily: 'Bebas, sans-serif', color: '#333333' }}>Upsi, ERRO</h1>
            <img 
                src={errorImage} 
                alt="404" 
                style={{ 
                    width: '50%', // Adjust the width as needed
                    maxWidth: '400px', // Optionally set a maximum width
                    marginBottom: '30px',
                    marginTop: '20px'
                }} 
            />
            <Link to='/'>
                <p >Voltar à Homepage</p>
            </Link>
        </div>
    );
}

export default Teapot;
