import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme.context";
import { useContext } from "react";
import logo from "../images/Clube Eva&Marta.png";

const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <nav className={`Navbar ${theme}`}>
            <NavLink to="/">
                <img src={logo} alt="Clube Logo" className="nav-logo" style={{ width: "120px", height: "auto", marginLeft: "15px" }} />
            </NavLink>
            <ul>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="/livros">Livros</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'selected' : '')} to="/livros" style={{ backgroundColor: '#3526DE', padding: '5px 13px', color: 'white', fontWeight: '1000' }}>Aderir</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;
