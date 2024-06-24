import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme.context";
import { useContext } from "react";

const Navbar = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return <nav className={`Navbar ${theme}`}>

{/* ADICIONAR LOGO
        <img src={logo} alt="Logo" className="nav-logo" /> */}

        <ul>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/">Home</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/livros">Livros</NavLink>
        </ul>
        
       {/*  <button onClick={toggleTheme}>
        {theme === 'light' ? 'dark' : 'light'}
        </button> */}
    </nav>
};

export default Navbar;
