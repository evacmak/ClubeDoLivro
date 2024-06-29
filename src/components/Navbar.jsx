import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme.context";
import { useContext } from "react";
import logo from "../images/Clube Eva&Marta.png";

const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <nav className={`Navbar ${theme}`}>
            <NavLink to="/">
                <img src={logo} alt="Clube Logo" className="nav-logo" style={{width: "120px", height: "auto", marginLeft: "15px" }} />
            </NavLink>
            <ul>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="/" style={{fontFamily: 'Bebas, sans-serif', color: '#333333', fontSize:'25px', fontWeight:'600'}}>Home</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="/livros" style={{fontFamily: 'Bebas, sans-serif', color: '#333333', fontSize:'25px', fontWeight:'600'}}>Livros</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="https://chat.whatsapp.com/H8MdpjbRn795Y2M6pMBhBA" target="_blank" style={{fontFamily: 'Bebas, sans-serif', fontSize:'25px', fontWeight:'500', backgroundColor: '#3526DE', padding: '5px 13px', color: 'white'}}>Aderir</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;
